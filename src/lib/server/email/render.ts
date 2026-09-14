import { escapeHtml } from '../../../utils/index.js';

export type Tokens = Record<string, string>;

const TOKEN_RE = /\{\{(\w+)\}\}/g;

/**
 * Fills `{{token}}` placeholders in a generated template.
 *
 * Three things this has to get right, because `name` and `message` come
 * straight from the request body:
 *
 *  - **Values are escaped here.** The generated HTML does no escaping of its own,
 *    so a name of `<script>` would otherwise execute in whatever client renders
 *    the mail. `transform` is what makes that the default rather than a thing
 *    each call site must remember.
 *
 *  - **The replacement is a function, not a string.** `String.replace` reads `$&`,
 *    `` $` `` and `$1` in a replacement *string* as patterns. A visitor whose
 *    message contained `$&` would otherwise get the template's own text spliced
 *    into their email. Passing a function disables that entirely.
 *
 *  - **Unknown placeholders throw.** A renamed token then fails on the first send
 *    instead of shipping a literal `{{name}}` to a recipient.
 */
function fill(template: string, tokens: Tokens, transform: (value: string) => string): string {
	const seen = new Set<string>();

	const output = template.replace(TOKEN_RE, (_match, key: string) => {
		if (!(key in tokens)) {
			throw new Error(`Email template referenced an unknown placeholder: {{${key}}}`);
		}
		seen.add(key);
		return transform(tokens[key]);
	});

	// An unused token means the template and its caller have drifted: either the
	// placeholder was renamed or a value is being computed for nothing. Both are
	// worth failing the send over, since the alternative is an email quietly
	// missing the thing it was supposed to say.
	const unused = Object.keys(tokens).filter((key) => !seen.has(key));
	if (unused.length > 0) {
		throw new Error(`Email template never used: ${unused.map((k) => `{{${k}}}`).join(', ')}`);
	}

	return output;
}

/** Escapes, and turns newlines into `<br>` so a multi-line message keeps its shape. */
export function renderHtml(template: string, tokens: Tokens): string {
	return fill(template, tokens, (value) => escapeHtml(value).replace(/\r?\n/g, '<br />'));
}

/**
 * Inserts values raw.
 *
 * Escaping into a `text/plain` part would show the reader `&amp;` and `&#039;`,
 * which is why this is a separate function rather than a flag on the one above.
 */
export function renderText(template: string, tokens: Tokens): string {
	return fill(template, tokens, (value) => value);
}
