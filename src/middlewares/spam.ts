import type { RequestEvent } from '@sveltejs/kit';
import { SITE_URL } from '../data/site.js';
import { HONEYPOT_FIELD, MAX_FILL_MS, MIN_FILL_MS } from '../lib/contact-rules.js';

/**
 * Cheap, dependency-free checks for automated submissions.
 *
 * None of these is strong on its own; together they stop the scripted traffic
 * that makes up almost all of it. The two that matter most are the origin check,
 * which closes a real hole, and the honeypot, which costs a bot nothing to fail
 * and a person nothing to pass.
 */

/**
 * SvelteKit's own CSRF guard does not cover this endpoint.
 * `csrf_check_origin` is gated on `is_form_content_type()`, which lists only the
 * three form encodings — `application/json` is not among them, so any origin can
 * POST here today. This restores the check for the content type we actually use.
 *
 * Same-origin browser requests always send `Origin` on POST. A missing header
 * therefore means something that is not a browser form, which is exactly what we
 * are declining.
 */
export function hasTrustedOrigin(event: RequestEvent): boolean {
	const origin = event.request.headers.get('origin');
	if (!origin) return false;

	// event.url.origin covers dev, preview deploys and any future domain without
	// needing each one listed; SITE_URL pins the canonical production host.
	return origin === SITE_URL || origin === event.url.origin;
}

/**
 * What a submission looks like.
 *
 * - `bot`     something no person does. Accept and discard: an error would tell
 *             a bot which field gave it away, and it would come back without it.
 * - `stale`   a real submission from a page that has been open too long. This
 *             must NOT be discarded — see below.
 * - `ok`      send it.
 *
 * The distinction matters. Treating `stale` as `bot` meant someone who opened
 * the contact page, got distracted, came back the next day and wrote a genuine
 * enquiry was told "Message sent successfully" while the message was thrown
 * away. A person is far more likely to leave a tab open overnight than a bot is
 * to forge a day-old timestamp, so staleness is a prompt to refresh, not a
 * reason to drop.
 */
export type SubmissionVerdict = 'ok' | 'bot' | 'stale';

export function classifySubmission(body: Record<string, unknown>): SubmissionVerdict {
	// Hidden in CSS and off the tab order, so only something reading the DOM fills it.
	const honeypot = body[HONEYPOT_FIELD];
	if (typeof honeypot === 'string' && honeypot.trim() !== '') return 'bot';

	const startedAt = Number(body.startedAt);

	// No usable timestamp means the payload was not built by our form. Absent is
	// not the same as too fast, but neither is a person filling in the page.
	if (!Number.isFinite(startedAt) || startedAt <= 0) return 'bot';

	const elapsed = Date.now() - startedAt;

	// Negative means a clock ahead of ours, which a real browser can produce, so
	// only a substantial skew counts against the sender.
	if (elapsed < MIN_FILL_MS && elapsed > -MIN_FILL_MS) return 'bot';

	return elapsed > MAX_FILL_MS ? 'stale' : 'ok';
}

const URL_RE = /https?:\/\/|www\./gi;
const MAX_LINKS = 4;

/**
 * Flags likely spam without discarding it.
 *
 * A genuine enquiry can legitimately carry several links — a portfolio, a repo,
 * a job posting — so this only prefixes the subject. Dropping a real message
 * because it was link-heavy is a far worse outcome than an odd subject line.
 */
export function looksLikeSpam(message: string): boolean {
	return (message.match(URL_RE) ?? []).length > MAX_LINKS;
}
