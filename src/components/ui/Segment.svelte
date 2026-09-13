<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import { setSegmentContext } from './segment-context';

	type Props = {
		value?: T;
		name: string;
		labelledby?: string;
		children: Snippet;
	};

	let { value = $bindable(), name, labelledby, children }: Props = $props();

	setSegmentContext<T>({
		get name() {
			return name;
		},
		get value() {
			return value;
		},
		select: (next: T) => (value = next)
	});
</script>

<div
	role="radiogroup"
	aria-labelledby={labelledby}
	class="flex w-full items-center justify-between gap-1 rounded-full bg-primary-500 p-1 dark:bg-dark-background"
>
	{@render children()}
</div>
