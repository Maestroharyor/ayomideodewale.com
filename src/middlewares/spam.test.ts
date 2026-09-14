import { describe, expect, it } from 'vitest';
import { classifySubmission, looksLikeSpam } from './spam';
import { HONEYPOT_FIELD, MAX_FILL_MS, MIN_FILL_MS } from '../lib/contact-rules';

/** A payload the form would produce, with the timestamp far enough back to pass. */
const submission = (overrides: Record<string, unknown> = {}) => ({
	name: 'Grace Hopper',
	email: 'grace@example.com',
	message: 'I would like to discuss a backend role.',
	startedAt: Date.now() - MIN_FILL_MS * 3,
	...overrides
});

describe('classifySubmission', () => {
	it('accepts a normal submission', () => {
		expect(classifySubmission(submission())).toBe('ok');
	});

	it('flags a filled honeypot as a bot', () => {
		expect(classifySubmission(submission({ [HONEYPOT_FIELD]: 'http://spam' }))).toBe('bot');
	});

	it('ignores a honeypot that only contains whitespace', () => {
		// Some password managers and autofill quirks leave a stray space behind;
		// that is not evidence of a bot.
		expect(classifySubmission(submission({ [HONEYPOT_FIELD]: '   ' }))).toBe('ok');
	});

	it('flags a submission sent faster than a person could type', () => {
		expect(classifySubmission(submission({ startedAt: Date.now() }))).toBe('bot');
	});

	it('flags a missing or unusable timestamp as a bot', () => {
		expect(classifySubmission(submission({ startedAt: undefined }))).toBe('bot');
		expect(classifySubmission(submission({ startedAt: 'soon' }))).toBe('bot');
		expect(classifySubmission(submission({ startedAt: 0 }))).toBe('bot');
		expect(classifySubmission(submission({ startedAt: -1 }))).toBe('bot');
	});

	it('tolerates a client clock running ahead of the server', () => {
		// A real browser can be minutes ahead. That must not be read as "too fast".
		expect(classifySubmission(submission({ startedAt: Date.now() + 60_000 }))).toBe('ok');
	});

	/**
	 * The regression this suite exists for.
	 *
	 * A stale timestamp used to be classified alongside bots, and the endpoint
	 * discards bots silently. Someone who opened the contact page, got
	 * distracted, came back the next day and wrote a genuine enquiry was told
	 * "Message sent successfully" while the message was thrown away. Stale must
	 * stay distinguishable from bot so the endpoint can return an error the
	 * visitor can act on.
	 */
	it('separates a stale page from a bot', () => {
		const stale = classifySubmission(submission({ startedAt: Date.now() - MAX_FILL_MS - 60_000 }));
		expect(stale).toBe('stale');
		expect(stale).not.toBe('bot');
	});

	it('still accepts a submission just inside the staleness window', () => {
		expect(classifySubmission(submission({ startedAt: Date.now() - MAX_FILL_MS + 60_000 }))).toBe(
			'ok'
		);
	});
});

describe('looksLikeSpam', () => {
	it('leaves an ordinary enquiry alone', () => {
		expect(looksLikeSpam('Hello, I saw your work and would like to talk.')).toBe(false);
	});

	it('tolerates the handful of links a real enquiry carries', () => {
		// A portfolio, a repo, a job posting and a company page is four, and is a
		// perfectly normal message to receive.
		expect(
			looksLikeSpam('See https://a.com and https://b.com plus www.c.com and https://d.com')
		).toBe(false);
	});

	it('flags a message that is mostly links', () => {
		expect(
			looksLikeSpam(
				'https://a.com https://b.com https://c.com https://d.com https://e.com www.f.com'
			)
		).toBe(true);
	});

	it('counts links case-insensitively', () => {
		expect(looksLikeSpam('HTTP://A.COM HTTPS://B.COM WWW.C.COM Https://d.com WWW.e.com')).toBe(
			true
		);
	});
});
