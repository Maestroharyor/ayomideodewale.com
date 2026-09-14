import { escapeHtml } from '../../../utils/index.js';

export type Tokens = Record<string, string>;

/** `g` so `matchAll` works; `replace` resets lastIndex itself, so it is safe to share. */
const TOKEN_RE = /\{\{(\w+)\}\}/g;

/**
 * C0 and C1 control characters, stripped from subject lines. Matching them is
 * the entire point here, so the rule against control characters in a regex is
 * the one thing this must do.
 */
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u001f\u007f-\u009f]+/g;

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
 * Fails if a token is used by none of the given templates.
 *
 * Deliberately across the whole email rather than per part. `origin` only
 * appears in `src` attributes on the social icons, and react-email's plaintext
 * renderer drops images entirely — so it is legitimately absent from the text
 * part while being essential to the HTML one. Asserting per part meant every
 * send threw "Email template never used: {{origin}}" and the endpoint 500'd
 * before any mail went out.
 *
 * The guard still does its job: a renamed placeholder is used by neither part
 * and fails on the first send, rather than shipping a literal "{{name}}".
 */
export function assertAllTokensUsed(templates: string[], tokens: Tokens): void {
	const used = new Set<string>();
	for (const template of templates) {
		for (const [, key] of template.matchAll(TOKEN_RE)) used.add(key);
	}

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
 * headers are newline-delimited. A name containing CR or LF would otherwise end
 * the Subject field and let the rest be read as further headers — `Bcc:` among
 * them — turning the contact form into a relay.
 *
 * `validateContact` does not reject newlines in a name (only the address regex
 * happens to), so this strips them rather than assuming they cannot arrive.
 * Every C0/C1 control character goes, not just CR and LF, and runs of
 * whitespace collapse so a pasted multi-line name still reads as one line.
 */
export function renderSubject(template: string, tokens: Tokens): string {
	return fill(template, tokens, (value) =>
		value.replace(CONTROL_CHARS, ' ').replace(/\s+/g, ' ').trim()
	);
}
