<script lang="ts">
	import type { Design } from '../../../types';
	import DesignCard from '../../elements/DesignCard.svelte';

	export let designs: Design[];
</script>

<div class="flex flex-col text-left justify-between pb-20 px-5 relative max-w-[1000px] mx-auto">
	<div class="grid grid-cols-1 gap-x-5 gap-y-10 md:gap-10 items-start">
		{#each designs as design}
			<DesignCard {design} />
		{/each}
	</div>
	<div class="relative w-full mt-16 flex items-center justify-center">
		<slot />
	</div>
</div>
