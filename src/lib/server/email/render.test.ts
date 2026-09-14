import { describe, expect, it } from 'vitest';
import { renderHtml, renderText } from './render';

/**
 * This is the function standing between the contact form and the HTML that
 * lands in someone's inbox. Both `name` and `message` come straight from the
 * request body, and the generated templates do no escaping of their own, so
 * every guarantee below is load-bearing rather than decorative.
 */
describe('renderHtml', () => {
	it('escapes markup so a name cannot inject elements', () => {
		expect(renderHtml('<p>Hi {{name}}</p>', { name: '<script>alert(1)</script>' })).toBe(
			'<p>Hi &lt;script&gt;alert(1)&lt;/script&gt;</p>'
		);
	});

	it('escapes quotes so a value cannot break out of an attribute', () => {
		expect(renderHtml('<a title="{{name}}">x</a>', { name: '" onmouseover="evil()' })).toBe(
			'<a title="&quot; onmouseover=&quot;evil()">x</a>'
		);
	});

	/**
	 * The subtle one. `String.replace` reads `$&`, `` $` ``, `$'` and `$1` in a
	 * replacement *string* as patterns, so passing the value directly would let a
	 * visitor whose message contained `$&` splice the template's own text into
	 * their email. Passing a function disables that entirely, and this test is
	 * what stops someone "simplifying" it back.
	 */
	it('treats replacement-pattern characters as literal text', () => {
		// The apostrophe is HTML-escaped, as it should be. What matters is that
		// none of these expanded: `$&` would have spliced in the matched token and
		// `$'` the text following it.
		expect(renderHtml('<p>{{message}}</p>', { message: "$& $` $' $1" })).toBe(
			'<p>$&amp; $` $&#39; $1</p>'
		);
		expect(renderHtml('<p>{{message}}</p>', { message: '$&' })).not.toContain('{{message}}');
	});

	it('keeps a multi-line message readable as HTML', () => {
		expect(renderHtml('<p>{{message}}</p>', { message: 'one\ntwo\r\nthree' })).toBe(
			'<p>one<br />two<br />three</p>'
		);
	});

	it('fills a placeholder used more than once', () => {
		expect(renderHtml('{{name}} / {{name}}', { name: 'Ada' })).toBe('Ada / Ada');
	});

	it('handles an empty value without leaving the token behind', () => {
		expect(renderHtml('<p>[{{name}}]</p>', { name: '' })).toBe('<p>[]</p>');
	});

	/**
	 * A renamed placeholder should fail on the first send rather than ship a
	 * literal "{{name}}" to a recipient.
	 */
	it('throws when the template references a token that was not supplied', () => {
		expect(() => renderHtml('<p>{{nope}}</p>', {})).toThrow(/unknown placeholder/i);
	});

	it('throws when a supplied token is never used', () => {
		expect(() => renderHtml('<p>static</p>', { name: 'Ada' })).toThrow(/never used/i);
	});
});

describe('renderText', () => {
	/**
	 * The text part is `text/plain`. Escaping into it would show the reader
	 * `&amp;` and `&#039;`, which is why this is a separate function rather than
	 * a flag on the HTML one.
	 */
	it('inserts values raw', () => {
		expect(renderText('Hi {{name}}', { name: 'Ada & Co <3' })).toBe('Hi Ada & Co <3');
	});

	it('preserves real newlines rather than converting them', () => {
		expect(renderText('{{message}}', { message: 'one\ntwo' })).toBe('one\ntwo');
	});

	it('is equally literal about replacement patterns', () => {
		expect(renderText('{{message}}', { message: '$& $1' })).toBe('$& $1');
	});

	it('applies the same drift guards as the HTML path', () => {
		expect(() => renderText('{{nope}}', {})).toThrow(/unknown placeholder/i);
		expect(() => renderText('static', { name: 'Ada' })).toThrow(/never used/i);
	});
});
