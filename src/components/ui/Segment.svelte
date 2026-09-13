<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import { setSegmentContext } from './segment-context';

	type Props = {
		value?: T;
		name: string;
		labelledby?: string;
		children: Snippet;
	};

	let { value = $bindable(), name, labelledby, children }: Props = $props();

	let group = $state<HTMLDivElement | null>(null);
	let thumb = $state({ left: 0, width: 0 });
	let measured = $state(false);

	// Reactive, so the measuring effect re-runs as each item registers on mount.
	// It only reads the map and writes `thumb`, so there is no cycle.
	const elements = new SvelteMap<T, HTMLElement>();

	setSegmentContext<T>({
		get name() {
			return name;
		},
		get value() {
			return value;
		},
		select: (next: T) => (value = next),
		register: (itemValue: T, el: HTMLElement) => {
			elements.set(itemValue, el);
			return () => elements.delete(itemValue);
		}
	});

	const measure = () => {
		const el = value === undefined ? undefined : elements.get(value);
		if (!el || !group) return;
		// Both offsetLeft and the thumb's `left: 0` are resolved against the group's
		// padding box, so the item's own offset is the whole translation. Measured
		// rather than derived: subtracting the group's padding here put the thumb
		// 4px to the left of every item.
		thumb = { left: el.offsetLeft, width: el.offsetWidth };
		measured = true;
	};

	$effect(() => {
		measure();
	});

	$effect(() => {
		if (!group) return;
		// The group is fluid, so the thumb has to follow it, not just the selection.
		const observer = new ResizeObserver(measure);
		observer.observe(group);
		return () => observer.disconnect();
	});
</script>

<div
	bind:this={group}
	role="radiogroup"
	aria-labelledby={labelledby}
	class="relative flex w-full items-center justify-between gap-1 rounded-full bg-primary-500 p-1 dark:bg-dark-background"
>
	<!-- One thumb that slides, rather than a background toggled on each item. The
	     old version popped between positions because nothing moved: the colour
	     simply moved from one element to another. -->
	{#if measured}
		<span
			aria-hidden="true"
			class="pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-white transition-[transform,width] duration-300 ease-out motion-reduce:transition-none"
			style={`width: ${thumb.width}px; transform: translateX(${thumb.left}px);`}
		></span>
	{/if}

	{@render children()}
</div>
