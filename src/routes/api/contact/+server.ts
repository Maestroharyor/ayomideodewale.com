import { sendEmail } from '../../../middlewares/mail.js';
import { toJSONString } from '../../../utils/index.js';
import { createRateLimiter } from '../../../middlewares/rate-limit.js';
import { clientKey } from '../../../middlewares/client-key.js';
import { classifySubmission, hasTrustedOrigin, looksLikeSpam } from '../../../middlewares/spam.js';
import { isContactValid, validateContact } from '../../../lib/contact-rules.js';
import { confirmationEmail, notificationEmail } from '../../../lib/server/email/index.js';
import type { ContactErrorResponse } from '../../../types/index.js';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

/** Extra recipient kept alongside EMAIL_ADDRESS; usually the same mailbox. */
const EXTRA_RECIPIENT = 'ayomide.odewale1@gmail.com';

/**
 * Strict per-visitor allowance, charged only once a submission has passed
 * validation. Counting rejected payloads here would let five mistyped attempts
 * lock a legitimate visitor out for an hour; raw flooding is handled separately
 * by the guard in hooks.server.ts.
 */
const submitLimiter = createRateLimiter({ max: 5, windowMs: 60 * 60 * 1000 });

/**
 * The body a caller gets when the submission is discarded as automated.
 *
 * Byte-identical to a real success. A bot that can tell the difference learns
 * which check caught it and comes back without that field.
 */
const SILENT_SUCCESS = { success: true, message: 'Message sent successfully' } as const;

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
	// First, and before the body is read: this is the check that closes a real
	// hole rather than a heuristic, and it costs nothing.
	if (!hasTrustedOrigin(event)) {
		return json({ success: false, message: 'Request origin not allowed' }, 403);
	}

	let raw: unknown;
	try {
		raw = await event.request.json();
	} catch {
		return json({ success: false, message: 'Invalid request body' }, 400);
	}

	const body = isRecord(raw) ? raw : {};
	const { name, email, message } = body;

	const verdict = classifySubmission(body);

	// Only the bot verdict is dropped silently. A stale page belongs to a person
	// who left a tab open, and telling them it sent while binning the message is
	// the worst outcome available — so they get an error they can act on.
	if (verdict === 'bot') {
		return json(SILENT_SUCCESS);
	}

	if (verdict === 'stale') {
		return json(
			{
				success: false,
				message: 'This page has been open a while. Please refresh and send again.'
			},
			409
		);
	}

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

	// The same rules the form applies, from the same module. Length, format and
	// minimums used to be enforced only in the browser, so anything not using the
	// form could send an unvalidated address straight to nodemailer's `to:`.
	const errors = validateContact({ name, email, message });
	if (!isContactValid(errors)) {
		const error: ContactErrorResponse = {};
		if (errors.name) error.name = errors.name;
		if (errors.email) error.email = errors.email;
		if (errors.message) error.message = errors.message;

		return json({ success: false, message: 'Please check the form and try again', error }, 400);
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

	// Flagged in the subject rather than discarded. A real enquiry can carry
	// several links, and losing one of those is far worse than an odd subject.
	const subjectPrefix = looksLikeSpam(message) ? '[likely spam] ' : '';
	const notification = notificationEmail({ name, email, message, origin });

	// The enquiry reaching a mailbox we own is what defines success, so those go
	// first. Sending the visitor's confirmation only afterwards means we can never
	// thank someone for a message that never arrived.
	//
	// replyTo is the sender, so replying from the inbox reaches them directly
	// rather than looping back to our own address.
	const enquiry = {
		subject: `${subjectPrefix}${notification.subject}`,
		text: notification.text,
		html: notification.html,
		replyTo: email
	};

	const delivery = await Promise.allSettled([
		sendEmail({ to: inbox, ...enquiry }),
		sendEmail({ to: EXTRA_RECIPIENT, ...enquiry })
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
		const confirmation = confirmationEmail({ name, origin });
		await sendEmail({
			to: email,
			subject: confirmation.subject,
			text: confirmation.text,
			html: confirmation.html
		});
	} catch (err) {
		console.error('Error sending confirmation:', err);
	}

	return json({ success: true, message: 'Message sent successfully' });
};
