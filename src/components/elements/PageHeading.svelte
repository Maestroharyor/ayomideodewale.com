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
</script>

<div class="max-w-[700px] mx-auto py-20 flex flex-col gap-10 items-center justify-center px-5">
	<h1
		class="mx-auto max-w-full text-balance text-center relative text-4xl md:text-5xl font-bold pt-4 md:pt-0 text-primary-900 dark:text-gray-100"
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
