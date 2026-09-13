import { sendEmail } from '../../../middlewares/mail.js';
import { confirmHTMLResponse, toJSONString } from '../../../utils/index.js';
import { createRateLimiter } from '../../../middlewares/rate-limit.js';
import { clientKey } from '../../../middlewares/client-key.js';
import type { ContactErrorResponse } from '../../../types/index.js';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

const MAX_LENGTH = { name: 100, email: 254, message: 5000 } as const;

/** Extra recipient kept alongside EMAIL_ADDRESS; usually the same mailbox. */
const EXTRA_RECIPIENT = 'ayomide.odewale1@gmail.com';

/**
 * Strict per-visitor allowance, charged only once a submission has passed
 * validation. Counting rejected payloads here would let five mistyped attempts
 * lock a legitimate visitor out for an hour; raw flooding is handled separately
 * by the guard in hooks.server.ts.
 */
const submitLimiter = createRateLimiter({ max: 5, windowMs: 60 * 60 * 1000 });

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

/** Type predicate so callers narrow to `string` instead of needing a cast. */
function isFilled(value: unknown): value is string {
	return typeof value === 'string' && value.trim() !== '';
}

function json(body: object, status = 200): Response {
	return new Response(toJSONString(body), {
		status,
		headers: { 'content-type': 'application/json' }
	});
}

export const POST: RequestHandler = async (event) => {
	let raw: unknown;
	try {
		raw = await event.request.json();
	} catch {
		return json({ success: false, message: 'Invalid request body' }, 400);
	}

	const body = isRecord(raw) ? raw : {};
	const { name, email, message } = body;

	// Narrow at the boundary. Without this a truthy non-string (say `name: {}`)
	// passes every downstream guard and throws inside the mail template instead of
	// returning a 400. A type predicate rather than a boolean helper, so the checks
	// below actually narrow and no cast is needed afterwards.
	if (!isFilled(name) || !isFilled(email) || !isFilled(message)) {
		const error: ContactErrorResponse = {};
		if (!isFilled(name)) error.name = 'Name is required';
		if (!isFilled(email)) error.email = 'Email is required';
		if (!isFilled(message)) error.message = 'Message is required';

		return json({ success: false, message: 'All fields are required', error }, 400);
	}

	// name / email / message are `string` from here.
	const tooLong = (
		[
			['name', name],
			['email', email],
			['message', message]
		] as const
	).find(([field, value]) => value.length > MAX_LENGTH[field])?.[0];

	if (tooLong) {
		return json({ success: false, message: `The ${tooLong} field is too long` }, 400);
	}

	const inbox = env.EMAIL_ADDRESS;
	if (!inbox) {
		console.error('EMAIL_ADDRESS is not configured');
		return json({ success: false, message: 'Error sending email' }, 500);
	}

	// Charged only once the request is known to be well-formed and serviceable, so a
	// misconfigured deploy cannot burn a visitor's allowance for our own fault.
	if (!submitLimiter.consume(clientKey(event))) {
		return json({ success: false, message: 'Too many requests. Please try again later.' }, 429);
	}

	// Email clients need absolute URLs for the social icons. SITE_URL pins them to
	// the canonical domain; the request origin is a correct fallback per environment.
	const origin = env.SITE_URL || event.url.origin;

	const notification = `You have received a new email from ${name} (${email}).\n\nMessage:\n${message}`;

	// The enquiry reaching a mailbox we own is what defines success, so those go
	// first. Sending the visitor's confirmation only afterwards means we can never
	// thank someone for a message that never arrived.
	const delivery = await Promise.allSettled([
		sendEmail({ to: inbox, subject: 'New Email Received', text: notification }),
		sendEmail({ to: EXTRA_RECIPIENT, subject: 'New Email Received', text: notification })
	]);

	for (const result of delivery) {
		if (result.status === 'rejected') console.error('Error sending enquiry:', result.reason);
	}

	if (!delivery.some((result) => result.status === 'fulfilled')) {
		return json({ success: false, message: 'Error sending email' }, 500);
	}

	// Courtesy confirmation. A failure here must not fail the request: the enquiry
	// has already been delivered.
	try {
		await sendEmail({
			to: email,
			subject: 'Thanks for getting in touch',
			html: confirmHTMLResponse(name, origin)
		});
	} catch (err) {
		console.error('Error sending confirmation:', err);
	}

	return json({ success: true, message: 'Message sent successfully' });
};
