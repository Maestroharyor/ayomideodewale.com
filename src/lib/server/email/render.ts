import { escapeHtml, stripControlChars } from '../../../utils/index.js';

export type Tokens = Record<string, string>;

/** `g` so `matchAll` works; `replace` resets lastIndex itself, so it is safe to share. */
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
 *  - **Unknown placeholders throw.** A token the caller did not supply fails on
 *    the first send instead of shipping a literal `{{name}}` to a recipient. The
 *    matching "supplied but never used" check lives in `assertAllTokensUsed`,
 *    which spans the whole email rather than one part of it.
 */
function fill(template: string, tokens: Tokens, transform: (value: string) => string): string {
	return template.replace(TOKEN_RE, (_match, key: string) => {
		if (!(key in tokens)) {
			throw new Error(`Email template referenced an unknown placeholder: {{${key}}}`);
		}
		return transform(tokens[key]);
	});
}

/**
 * Fails if a supplied token is never used by the HTML part.
 *
 * Asserted against the HTML part alone, because that is the complete email: the
 * plaintext part is a lossy projection of it (react-email's plaintext renderer
 * drops images, which is why `origin` is legitimately absent from it) and the
 * subject is a single line of it. Checking every part separately is what broke
 * production: `origin` appears fourteen times in the HTML as the `src` of each
 * social icon and zero times in the text, so every send threw "Email template
 * never used: {{origin}}" before any mail went out.
 *
 * A union across all three parts would also have fixed that, and was the first
 * attempt, but it is weaker than what this replaced: a token used only in the
 * subject would satisfy it even after both body parts lost the placeholder, so
 * `{{name}}` could vanish from the greeting without a sound. Asserting against
 * the HTML catches that and still permits the text part to be a subset.
 *
 * The assumption this rests on: no token belongs to the subject alone. If one
 * ever does, it needs declaring here rather than silently passing.
 */
export function assertAllTokensUsed(htmlTemplate: string, tokens: Tokens): void {
	const used = new Set([...htmlTemplate.matchAll(TOKEN_RE)].map(([, key]) => key));

	const unused = Object.keys(tokens).filter((key) => !used.has(key));
	if (unused.length > 0) {
		throw new Error(`Email template never used: ${unused.map((k) => `{{${k}}}`).join(', ')}`);
	}
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

/**
 * Fills a subject line.
 *
 * Separate from the body renderers because a subject is an email *header*, and
 * headers are newline-delimited.
 *
 * This is the second layer, not the only one: nodemailer's `_encodeHeaderValue`
 * already runs `.replace(/\r?\n|\r/g, ' ')` over any header it does not treat
 * as structured, Subject included, so a CR or LF in a name cannot end the field
 * and start a `Bcc:` of someone else's choosing. What it does not do is remove
 * the other control characters, which survive into the encoded word. Those go
 * here, along with collapsing runs of whitespace so a pasted multi-line name
 * still reads as one line.
 */
export function renderSubject(template: string, tokens: Tokens): string {
	return fill(template, tokens, (value) => stripControlChars(value).replace(/\s+/g, ' ').trim());
}
