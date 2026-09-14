import { describe, expect, it } from 'vitest';
import { confirmationEmail, displayName, notificationEmail } from './index';

/**
 * Exercises the real generated templates through the real builders.
 *
 * This suite exists because its absence let a 500 reach production. The unit
 * tests in render.test.ts passed hand-written templates whose tokens matched
 * the values supplied, so they never met the case that actually occurs:
 * `{{origin}}` appears fourteen times in the HTML part, as the `src` of each
 * social icon, and zero times in the plaintext part, because react-email's
 * plaintext renderer drops images. The per-part "supplied but never used" guard
 * therefore threw on every single send.
 *
 * Locally it was invisible for a second reason — `EMAIL_ADDRESS` is unset in
 * development, so the endpoint returned early at the configuration check and
 * never reached the template layer at all.
 *
 * The lesson these tests encode: assert against the artefact that ships, not a
 * fixture shaped like it.
 */
const sender = {
	name: 'Grace Hopper',
	email: 'grace@example.com',
	message: 'I would like to discuss a backend role.',
	origin: 'https://www.ayomideodewale.com'
};

describe('notificationEmail', () => {
	it('builds without throwing on the real template', () => {
		expect(() => notificationEmail(sender)).not.toThrow();
	});

	it('leaves no unfilled placeholders in either part', () => {
		const mail = notificationEmail(sender);
		expect(mail.html).not.toMatch(/\{\{\w+\}\}/);
		expect(mail.text).not.toMatch(/\{\{\w+\}\}/);
	});

	it('names the site in the subject, so a crowded inbox stays sortable', () => {
		expect(notificationEmail(sender).subject).toBe('New message from ayomideodewale.com');
	});

	it('carries both parts and a subject', () => {
		const mail = notificationEmail(sender);
		expect(mail.subject).toBeTruthy();
		expect(mail.html.length).toBeGreaterThan(0);
		expect(mail.text.length).toBeGreaterThan(0);
	});

	it('resolves the icon URLs against the given origin', () => {
		const mail = notificationEmail(sender);
		expect(mail.html).toContain(`${sender.origin}/email/`);
	});

	it('includes the sender so the enquiry is readable', () => {
		const mail = notificationEmail(sender);
		expect(mail.html).toContain('Grace Hopper');
		expect(mail.text).toContain('Grace Hopper');
		expect(mail.html).toContain('grace@example.com');
	});

	it('escapes a hostile name in the HTML part', () => {
		const mail = notificationEmail({ ...sender, name: '<script>alert(1)</script>' });
		expect(mail.html).not.toContain('<script>alert(1)</script>');
		expect(mail.html).toContain('&lt;script&gt;');
	});
});

describe('confirmationEmail', () => {
	it('builds without throwing on the real template', () => {
		expect(() => confirmationEmail({ name: sender.name, origin: sender.origin })).not.toThrow();
	});

	it('leaves no unfilled placeholders in either part', () => {
		const mail = confirmationEmail({ name: sender.name, origin: sender.origin });
		expect(mail.html).not.toMatch(/\{\{\w+\}\}/);
		expect(mail.text).not.toMatch(/\{\{\w+\}\}/);
	});

	it('addresses the sender by name in the subject', () => {
		expect(confirmationEmail({ name: 'Grace Hopper', origin: sender.origin }).subject).toBe(
			'Thanks for getting in touch, Grace Hopper'
		);
	});

	/**
	 * The subject is an email header, and headers are newline-delimited. A name
	 * carrying CR or LF would end the Subject field and let everything after it
	 * be read as further headers — `Bcc:` among them. validateContact checks the
	 * name's length but not its characters, so the stripping in renderSubject is
	 * the only thing standing between a pasted name and an injected header.
	 */
	it('strips control characters out of the subject', () => {
		const mail = confirmationEmail({
			name: 'Grace\r\nBcc: victim@evil.com',
			origin: sender.origin
		});
		expect(mail.subject).not.toMatch(/[\r\n]/);
		// displayName capitalises the lowercase words, payload included; what
		// matters is that the newlines are gone and it is one inert line.
		expect(mail.subject).toBe('Thanks for getting in touch, Grace Bcc: Victim@evil.com');
	});

	it('collapses a multi-line name into one readable line', () => {
		const mail = confirmationEmail({ name: 'Grace\n\n   Hopper', origin: sender.origin });
		expect(mail.subject).toBe('Thanks for getting in touch, Grace Hopper');
	});

	it('greets the sender by name', () => {
		const mail = confirmationEmail({ name: sender.name, origin: sender.origin });
		expect(mail.html).toContain('Grace Hopper');
		expect(mail.text).toContain('Grace Hopper');
	});

	/**
	 * The links were hardcoded in the template this replaced, which is how it
	 * ended up pointing at twitter.com and the wrong Instagram handle long after
	 * both were corrected on the site.
	 */
	it('carries the corrected social links from menu.ts', () => {
		const mail = confirmationEmail({ name: sender.name, origin: sender.origin });
		expect(mail.html).toContain('x.com/maestroharyor');
		expect(mail.html).toContain('instagram.com/maestroharyor');
		expect(mail.html).not.toContain('twitter.com');
		expect(mail.html).not.toContain('maestroharyorjoshua');
	});

	/**
	 * Outlook renders through Word and supports none of these.
	 */
	it('is built for the clients that matter', () => {
		const mail = confirmationEmail({ name: sender.name, origin: sender.origin });
		expect(mail.html).toContain('<table');
		expect(mail.html).not.toMatch(/display:\s*flex/);
		expect(mail.html).not.toMatch(/\d(\.\d+)?rem/);
	});
});

describe('displayName', () => {
	it('capitalises a name typed in lowercase', () => {
		expect(displayName('ben smith')).toBe('Ben Smith');
	});

	it('treats hyphens and apostrophes as word boundaries', () => {
		expect(displayName('mary-jane watson')).toBe('Mary-Jane Watson');
		expect(displayName("o'brien")).toBe("O'Brien");
	});

	/**
	 * The reason this is conservative rather than a blanket first-letter
	 * uppercase: that turns "McDonald" into "Mcdonald" and "IBM" into "Ibm".
	 * A name someone capitalised deliberately is left exactly as typed.
	 */
	it('leaves any word already carrying a capital alone', () => {
		for (const name of ['McDonald', "O'Brien", 'IBM', 'Ayomide Odewale', 'LaTeX']) {
			expect(displayName(name), name).toBe(name);
		}
	});

	/**
	 * A known limitation, recorded rather than worked around. The rule is
	 * per-word, so the lowercase particles in "van der Berg" are capitalised
	 * too. Detecting nobiliary particles reliably means a list that is wrong for
	 * somebody either way, and this is a contact email rather than a registry.
	 */
	it('capitalises lowercase particles, which is the accepted trade-off', () => {
		expect(displayName('van der berg')).toBe('Van Der Berg');
	});

	it('capitalises only the lowercase words in a mixed name', () => {
		expect(displayName('ben McDonald')).toBe('Ben McDonald');
	});

	it('preserves the spacing it was given', () => {
		expect(displayName('  ben   smith ')).toBe('  Ben   Smith ');
	});

	it('reaches the subject and both body parts', () => {
		const mail = confirmationEmail({ name: 'ben smith', origin: sender.origin });
		expect(mail.subject).toBe('Thanks for getting in touch, Ben Smith');
		expect(mail.html).toContain('Ben Smith');
		expect(mail.text).toContain('Ben Smith');

		const notice = notificationEmail({ ...sender, name: 'ben smith' });
		expect(notice.html).toContain('Ben Smith');
	});
});
