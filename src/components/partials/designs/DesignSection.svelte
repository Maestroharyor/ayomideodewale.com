<script lang="ts">
	import type { Design } from '../../../types';
	import DesignCard from '../../elements/DesignCard.svelte';

	import type { Snippet } from 'svelte';

	let { designs, children }: { designs: Design[]; children?: Snippet } = $props();
</script>

<div class="flex flex-col text-left justify-between pb-20 px-5 relative max-w-[1200px] mx-auto">
	<div class="grid grid-cols-1 gap-x-5 gap-y-10 md:gap-10 items-start">
		{#each designs as design (design.label)}
			<DesignCard {design} />
		{/each}
	</div>
	<div class="relative w-full mt-16 flex items-center justify-center">
		{@render children?.()}
	</div>
</div>
