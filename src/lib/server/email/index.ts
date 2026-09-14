import { confirmation, notification } from './templates.js';
import {
	assertAllTokensUsed,
	renderHtml,
	renderSubject,
	renderText,
	type Tokens
} from './render.js';

export type EmailBody = { subject: string; html: string; text: string };

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
	return build(confirmation, { name, origin });
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
	return build(notification, { name, email, message, origin });
}
