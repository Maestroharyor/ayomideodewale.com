import { describe, expect, it } from 'vitest';
import { EMAIL_RE, isContactValid, MAX_LENGTH, validateContact } from './contact-rules';

const valid = { name: 'Grace Hopper', email: 'grace@example.com', message: 'Hello there, friend.' };

describe('validateContact', () => {
	it('passes a well-formed submission', () => {
		expect(isContactValid(validateContact(valid))).toBe(true);
	});

	it('requires every field', () => {
		const errors = validateContact({ name: '', email: '', message: '' });
		expect(errors.name).toMatch(/required/i);
		expect(errors.email).toMatch(/required/i);
		expect(errors.message).toMatch(/required/i);
	});

	it('enforces minimum lengths', () => {
		expect(validateContact({ ...valid, name: 'Ada' }).name).toMatch(/at least/i);
		expect(validateContact({ ...valid, message: 'hi' }).message).toMatch(/at least/i);
	});

	it('enforces maximum lengths', () => {
		expect(validateContact({ ...valid, name: 'a'.repeat(MAX_LENGTH.name + 1) }).name).toMatch(
			/too long/i
		);
		expect(
			validateContact({ ...valid, message: 'a'.repeat(MAX_LENGTH.message + 1) }).message
		).toMatch(/too long/i);
	});

	it('rejects an address that is not an address', () => {
		for (const email of ['not-an-email', 'a@b', 'a b@c.co', '@b.co', 'a@.co']) {
			expect(validateContact({ ...valid, email }).email, email).toMatch(/not valid/i);
		}
	});
});

/**
 * The address is used as the `Reply-To` header on the notification email, so a
 * value containing CR or LF would be an SMTP header injection: an attacker could
 * append `Bcc:` and use the contact form as a relay.
 *
 * `EMAIL_RE` happens to prevent that, because `[^\s@]+` cannot match a newline.
 * It is worth a test of its own, because the protection is a side effect of the
 * character class rather than an obvious intent — someone loosening the regex to
 * accept an unusual address could remove it without noticing.
 *
 * Note the specific trap: in JavaScript `$` matches before a trailing newline
 * even without the `m` flag, so `"a@b.co\n"` would pass a regex whose final atom
 * could consume it.
 */
describe('EMAIL_RE and header injection', () => {
	it('accepts ordinary addresses', () => {
		for (const email of ['a@b.co', 'first.last+tag@sub.example.com', "o'brien@example.org"]) {
			expect(EMAIL_RE.test(email), email).toBe(true);
		}
	});

	it('rejects anything carrying CR or LF', () => {
		for (const email of [
			'a@b.co\n',
			'a@b.co\r',
			'a@b.co\r\n',
			'a@b.co\nBcc: victim@evil.com',
			'a@b.co\r\nBcc: victim@evil.com',
			'a@b.co\r\nSubject: hijacked'
		]) {
			expect(EMAIL_RE.test(email), JSON.stringify(email)).toBe(false);
		}
	});

	it('rejects other whitespace that could confuse a header', () => {
		for (const email of ['a@b.co ', ' a@b.co', 'a@b\t.co']) {
			expect(EMAIL_RE.test(email), JSON.stringify(email)).toBe(false);
		}
	});
});

/**
 * The minimums measured `value.length`, which counts padding and invisible
 * characters as content. A name of five C0 control bytes passed both the
 * presence check and the five-character minimum.
 */
describe('minimum length ignores padding and control characters', () => {
	const ok = { name: 'Grace Hopper', email: 'grace@example.com', message: 'A real enquiry here.' };

	it('rejects a name that is only control characters', () => {
		const errors = validateContact({ ...ok, name: String.fromCharCode(1, 2, 3, 4, 5) });
		expect(errors.name).toMatch(/at least/i);
	});

	it('rejects a name padded out to the minimum with spaces', () => {
		expect(validateContact({ ...ok, name: 'ben  ' }).name).toMatch(/at least/i);
	});

	it('rejects a message padded out to the minimum', () => {
		expect(validateContact({ ...ok, message: 'hi        ' }).message).toMatch(/at least/i);
	});

	it('still accepts a genuine name and message', () => {
		expect(isContactValid(validateContact(ok))).toBe(true);
	});
});
