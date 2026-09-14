<script lang="ts">
	import { obfuscate } from '../../utils';

	let {
		value,
		scheme,
		target,
		class: className = ''
	}: {
		/** What the reader sees, e.g. the formatted phone number. */
		value: string;
		/** Omit to render plain text rather than a link. */
		scheme?: 'mailto' | 'tel';
		/** Link target when it differs from the display form, e.g. a phone with no spaces. */
		target?: string;
		class?: string;
	} = $props();

	/**
	 * The href and the text are emitted together through one {@html} because
	 * Svelte escapes attribute values: an entity-encoded href written normally
	 * would come out as `&amp;#64;` and the link would break. Same justification
	 * as the JSON-LD block in SEOMeta — every input here is static site data from
	 * src/data/resume/shared.ts, never anything a visitor supplied.
	 */
	const markup = $derived.by(() => {
		const text = obfuscate(value);
		if (!scheme) return `<span class="${className}">${text}</span>`;
		return `<a class="${className}" href="${scheme}:${obfuscate(target ?? value)}">${text}</a>`;
	});
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html markup}
