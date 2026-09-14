<script lang="ts">
	import ProjectCard from '../../elements/ProjectCard.svelte';
	import type { Project } from '../../../types';

	import type { Snippet } from 'svelte';

	let { projects, children }: { projects: Project[]; children?: Snippet } = $props();
</script>

<div class="flex flex-col text-left justify-between pb-20 px-5 relative max-w-[1200px] mx-auto">
	<div class="grid grid-cols-1 gap-x-5 gap-y-10 md:gap-10 lg:grid-cols-2 items-start pt-10">
		{#each projects as item, i (item.title)}
			<!-- Directly under the page <h1>, so these are h2 rather than the default h3. -->
			<ProjectCard project={item} eager={i < 2} headingLevel={2} />
		{/each}
	</div>
	<div class="relative w-full mt-16 flex items-center justify-center">
		{@render children?.()}
	</div>
</div>
