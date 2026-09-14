/**
 * URL-safe slug for a project tag. Tags are authored for display ('React
 * Native', 'SvelteKit'), so lowercasing alone left a literal space in
 * /projects/tag/react native and split 'Sveltekit' from 'SvelteKit'.
 */
export function tagSlug(tag: string): string {
	return tag
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

export function capitalizeString(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toJSONString(data: object | unknown[] | string | number): string {
	return JSON.stringify(data);
}

/** Escapes user input before it is interpolated into the confirmation email HTML. */
export function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

/**
 * Capitalises a name for display, conservatively.
 *
 * Only words that are *entirely* lowercase are touched, so "ben smith" becomes
 * "Ben Smith" while "McDonald", "O'Brien" and "IBM" are left exactly as typed.
 * Guessing at a name someone has already capitalised deliberately is worse than
 * leaving a lowercase one alone, and mangling "McDonald" into "Mcdonald" is the
 * usual result of a naive first-letter uppercase.
 *
 * Unicode-aware, which is not a nicety here. With an ASCII `[a-z]` class,
 * "élodie dupont" came out as "élodie Dupont" — the surname capitalised and the
 * given name not — which reads as a bug rather than a style. `\p{Ll}` matches a
 * lowercase letter in any script, and `\S` splits on any whitespace.
 *
 * Hyphens and apostrophes count as word boundaries, so "mary-jane" and
 * "o'brien" come out right.
 *
 * Whitespace is normalised too. A name with a stray double space is a typo
 * either way, and without this the subject and the body disagreed: the subject
 * collapses runs of whitespace as part of stripping header characters, the body
 * does not, so "ben  smith" arrived two different ways in the same email.
 */
export function displayName(name: string): string {
	return name
		.trim()
		.replace(/\s+/gu, ' ')
		.replace(/\S+/gu, (word) =>
			word === word.toLowerCase()
				? word.replace(
						/(^|[-'’])(\p{Ll})/gu,
						(_m, boundary: string, letter: string) => boundary + letter.toUpperCase()
					)
				: word
		);
}
