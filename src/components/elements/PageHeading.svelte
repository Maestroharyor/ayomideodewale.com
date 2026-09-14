<script lang="ts">
	let {
		title,
		description,
		highlight
	}: { title: string; description: string; highlight?: string } = $props();

	/**
	 * Split on the highlighted term so it can be wrapped in its own element.
	 * Done by splitting rather than with {@html} because the term comes from a
	 * URL parameter and must never be interpolated into markup.
	 */
	const split = (text: string) => {
		if (!highlight) return [{ text, match: false }];
		return text
			.split(highlight)
			.flatMap((part, i) =>
				i === 0
					? [{ text: part, match: false }]
					: [
							{ text: highlight, match: true },
							{ text: part, match: false }
						]
			)
			.filter((part) => part.text.length > 0);
	};

	const titleParts = $derived(split(title));
	const descriptionParts = $derived(split(description));

	/**
	 * The accent marks one thing per heading. On a tag page that is the tag, so
	 * the heading around it stays neutral and the term carries the colour. With
	 * no term to mark, the heading takes the accent itself, the way every other
	 * heading on the site does.
	 */
	const titleClass = $derived(
		highlight ? 'text-primary-900 dark:text-gray-100' : 'text-primary-500 dark:text-warning-500'
	);
</script>

<div class="max-w-[700px] mx-auto py-20 flex flex-col gap-10 items-center justify-center px-5">
	<h1
		class="relative mx-auto max-w-full text-balance pt-4 text-center text-3xl font-bold sm:text-4xl md:pt-0 lg:text-5xl {titleClass}"
	>
		{#each titleParts as part, i (i)}{#if part.match}<span
					class="text-primary-500 dark:text-warning-500">{part.text}</span
				>{:else}{part.text}{/if}{/each}
	</h1>
	<p class="text-balance text-center text-2xl">
		{#each descriptionParts as part, i (i)}{#if part.match}<span
					class="font-semibold text-primary-500 dark:text-warning-500">{part.text}</span
				>{:else}{part.text}{/if}{/each}
	</p>
</div>
