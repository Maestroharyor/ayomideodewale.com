<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import { getSegmentContext } from './segment-context';

	type Props = {
		value: T;
		label: string;
		children?: Snippet;
	};

	let { value, label, children }: Props = $props();

	const segment = getSegmentContext<T>();
	const selected = $derived(segment.value === value);
</script>

<label
	class="flex flex-1 cursor-pointer items-center justify-center rounded-full px-3 py-2 transition-colors duration-200 ease-in-out has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-white"
	class:bg-white={selected}
	title={label}
>
	<input
		type="radio"
		class="sr-only"
		name={segment.name}
		checked={selected}
		aria-label={label}
		onchange={() => segment.select(value)}
	/>
	{#if children}
		{@render children()}
	{:else}
		<span class="text-sm">{label}</span>
	{/if}
</label>
