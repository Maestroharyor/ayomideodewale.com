import { describe, expect, it } from 'vitest';
import { displayName, obfuscate } from './index';

/**
 * Lives here rather than in the email suite because the function formats a
 * string and knows nothing about mail. The tests that prove the formatted name
 * actually reaches a rendered subject and body stay in
 * src/lib/server/email/index.test.ts.
 */
describe('displayName', () => {
	it('capitalises a name typed in lowercase', () => {
		expect(displayName('ben smith')).toBe('Ben Smith');
	});

	/**
	 * An ASCII [a-z] class produced "élodie Dupont" — surname capitalised, given
	 * name not — which reads as a bug rather than a style. The site is aimed at
	 * recruiters abroad, so this is the common case, not an exotic one.
	 */
	it('capitalises names in any script, not just ASCII', () => {
		expect(displayName('élodie dupont')).toBe('Élodie Dupont');
		expect(displayName('ørjan dahl')).toBe('Ørjan Dahl');
		expect(displayName('łukasz nowak')).toBe('Łukasz Nowak');
		expect(displayName('çağla yıldız')).toBe('Çağla Yıldız');
	});

	it('leaves a name already capitalised in another script alone', () => {
		expect(displayName('ÉLODIE')).toBe('ÉLODIE');
		expect(displayName('Ørjan')).toBe('Ørjan');
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

	/**
	 * Normalised rather than preserved, so the subject and the body agree. The
	 * subject collapses whitespace as a side effect of stripping header
	 * characters; without this the same name arrived two ways in one email.
	 */
	it('normalises stray whitespace', () => {
		expect(displayName('  ben   smith ')).toBe('Ben Smith');
	});

	/**
	 * `String.trim()` removes only the five characters it counts as whitespace, so
	 * these survived into the rendered email: the body carried the raw bytes and
	 * the subject ended in a dangling comma.
	 */
	it('removes control characters that trim leaves behind', () => {
		const ctrl = String.fromCharCode(1, 2, 3);
		expect(displayName(`ben${ctrl}smith`)).toBe('Ben Smith');
		expect(displayName(String.fromCharCode(1, 2, 3, 4, 5))).toBe('');
	});
});

describe('obfuscate', () => {
	it('leaves no plain-text run of the original in the output', () => {
		const email = 'ayomide.odewale1@gmail.com';
		const encoded = obfuscate(email);
		expect(encoded).not.toContain('@');
		expect(encoded).not.toContain('gmail');
		expect(encoded).not.toContain('ayomide');
	});

	it('decodes back to exactly the input', () => {
		for (const value of ['ayomide.odewale1@gmail.com', '+234 903 245 4463', 'a+b@c.dev']) {
			const decoded = obfuscate(value).replace(/&#(\d+);/g, (_, code) =>
				String.fromCodePoint(Number(code))
			);
			expect(decoded).toBe(value);
		}
	});

	it('encodes the characters a harvester keys on', () => {
		// '@' is 64 and '+' is 43; a regex looking for either finds neither.
		expect(obfuscate('@')).toBe('&#64;');
		expect(obfuscate('+')).toBe('&#43;');
	});

	it('handles an empty string', () => {
		expect(obfuscate('')).toBe('');
	});
});
