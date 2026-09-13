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

	let el = $state<HTMLLabelElement | null>(null);

	$effect(() => {
		if (!el) return;
		return segment.register(value, el);
	});
</script>

<!-- z-10 and no background of its own: the white pill is a single element in the
     parent that slides between items, so the label only has to sit above it. -->
<label
	bind:this={el}
	class="relative z-10 flex flex-1 cursor-pointer items-center justify-center rounded-full px-3 py-2 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-white"
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
