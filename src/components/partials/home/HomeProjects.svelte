<script lang="ts">
	import { projects } from '../../../data/projects';
	import { reveal } from '../../../lib/actions/reveal';
	import ProjectCard from '../../elements/ProjectCard.svelte';
	import SectionHeading from '../../elements/SectionHeading.svelte';

	/**
	 * Five, not four: the lead card spans both columns, so an even count leaves the
	 * last card alone with a gap beside it. Odd counts fill the grid.
	 */
	const featured = projects.filter((project) => project.featured).slice(0, 5);
</script>

<div class=" pt-20 pb-20 relative bg-dark/[0.02] dark:bg-dark-background/20">
	<div class="flex flex-col text-left justify-between px-5 max-w-[1200px] mx-auto">
		<div>
			<SectionHeading title="Here are some of my favourite projects" />
		</div>
		<!--
			The first card spans both columns. Four equal cards gave the eye nowhere
			to start, and the lead project is the one worth landing on.
		-->
		<div class="grid grid-cols-1 items-start gap-5 pt-10 md:gap-x-10 md:gap-y-16 lg:grid-cols-2">
			{#each featured as item, i (item.title)}
				<div class={i === 0 ? 'lg:col-span-2' : ''} use:reveal={{ delay: i === 0 ? 0 : 60 }}>
					<ProjectCard project={item} eager={i < 2} wide={i === 0} />
				</div>
			{/each}
		</div>
		<div class="relative w-full mt-10 flex items-center justify-center">
			<a
				href="/projects"
				class="border-2 rounded-full px-5 md:px-32 py-2 border-primary-500 dark:border-white text-lg font-medium text-primary-500 hover:text-dark-theme hover:border-dark-theme transition duration-400 ease-in-out dark:text-gray-200 dark:hover:text-warning-500 dark:hover:border-warning-500"
				aria-label="see more projects"
			>
				See More Awesome Projects
			</a>
		</div>
	</div>
</div>
