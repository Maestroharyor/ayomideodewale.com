import { confirmation, notification } from './templates.js';
import {
	assertAllTokensUsed,
	renderHtml,
	renderSubject,
	renderText,
	type Tokens
} from './render.js';

export type EmailBody = { subject: string; html: string; text: string };

/**
 * Capitalises a name for display, conservatively.
 *
 * Only words that are *entirely* lowercase are touched, so "ben smith" becomes
 * "Ben Smith" while "McDonald", "O'Brien" and "IBM" are left exactly as typed.
 * Guessing at a name someone has already capitalised deliberately is worse than
 * leaving a lowercase one alone, and mangling "McDonald" into "Mcdonald" is the
 * usual result of a naive first-letter uppercase.
 *
 * Hyphens and apostrophes count as word boundaries, so "mary-jane" and
 * "o'brien" come out right.
 */
export function displayName(name: string): string {
	return name.replace(/[^\s]+/g, (word) =>
		word === word.toLowerCase()
			? word.replace(
					/(^|[-'’])([a-z])/g,
					(_m, boundary: string, letter: string) => boundary + letter.toUpperCase()
				)
			: word
	);
}

function build(
	template: { subject: string; html: string; text: string },
	tokens: Tokens
): EmailBody {
	// Across both parts: a token can belong to only one of them and still be in
	// use. See assertAllTokensUsed.
	assertAllTokensUsed([template.subject, template.html, template.text], tokens);

	return {
		subject: renderSubject(template.subject, tokens),
		html: renderHtml(template.html, tokens),
		text: renderText(template.text, tokens)
	};
}

/** Courtesy reply to whoever used the form. */
export function confirmationEmail({ name, origin }: { name: string; origin: string }): EmailBody {
	return build(confirmation, { name: displayName(name), origin });
}

/** The enquiry itself, to the owner's inbox. */
export function notificationEmail({
	name,
	email,
	message,
	origin
}: {
	name: string;
	email: string;
	message: string;
	origin: string;
}): EmailBody {
	return build(notification, { name: displayName(name), email, message, origin });
}
