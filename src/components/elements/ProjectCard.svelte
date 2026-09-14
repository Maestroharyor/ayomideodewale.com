<script lang="ts">
	import type { Project } from '../../types';
	import { tagSlug } from '../../utils';

	// The cards above the fold are told to load eagerly. Lazy-loading them left a
	// bordered empty box where the thumbnail should be on a cold load.
	//
	// `wide` is the lead card on the home grid: at lg it puts the thumbnail beside
	// the text instead of above it, so spanning two columns does not just produce
	// one very tall card.
	let {
		project,
		eager = false,
		wide = false
	}: { project: Project; eager?: boolean; wide?: boolean } = $props();
</script>

<div
	class="relative mx-auto flex {wide
		? 'flex-col lg:flex-row lg:items-center lg:gap-8'
		: 'flex-col'} items-start gap-4 group project_card px-5 py-5 h-full rounded-[16px] hover:bg-[rgba(0,0,0,0.02)] hover:dark:bg-[rgba(0,0,0,0.15)] hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.15)] hover:drop-shadow-md hover:backdrop-blur-[3.2px] hover:-translate-y-[2px] transition-all duration-300 cursor-pointer w-full"
>
	<div
		class="{wide
			? 'lg:w-[58%]'
			: ''} w-full relative rounded-xl border-gray-400 dark:border-gray-600 border-2 p-2 transition group-hover:border-primary-hov dark:group-hover:border-warning-500"
	>
		<img
			class="w-full h-auto aspect-[1000/508] object-cover object-top hover:opacity-75 transition rounded-md"
			src={project.img}
			alt={project.title || ''}
			loading={eager ? 'eager' : 'lazy'}
			fetchpriority={eager ? 'high' : 'auto'}
			width="1000"
			height="508"
		/>
	</div>
	<!-- {#if project.inDevelopment}
		<div
			class="w-full relative rounded-xl border-gray-400 dark:border-gray-600 border-2 p-2 transition hover:scale-95 hover:rotate-6 hover:-translate-y-2 hover:border-primary-hov dark:hover:border-warning-500"
		>
			<img
				class="w-[300px] h-auto hover:opacity-75 transition rounded-md"
				src={project.img}
				alt={project.title || ''}
				width={500}
				height={300}
			/>
		</div>
	{:else}
		<a
			href={project.link || project.github}
			target="_blank"
			class="w-full relative rounded-xl border-gray-400 dark:border-gray-600 border-2 p-2 transition hover:scale-95 hover:rotate-6 hover:-translate-y-2 hover:border-primary-hov dark:hover:border-warning-500"
			rel="noreferrer"
			aria-label="project link"
		>
			<img
				class="w-[300px] h-auto hover:opacity-75 transition rounded-md"
				src={project.img}
				alt={project.title || ''}
			/>
		</a>
	{/if} -->

	<div class="w-full flex-1">
		<div class="flex projects-center justify-between mb-1">
			<a
				href={project.caseStudy ? `/projects/${project.caseStudy}` : project.link || project.github}
				target={project.caseStudy ? undefined : '_blank'}
				rel={project.caseStudy ? undefined : 'noreferrer'}
				aria-label={project.caseStudy ? `Read the ${project.title} case study` : 'Project link'}
				class="after:absolute after:inset-0 after:rounded-[16px] after:content-['']"
			>
				<h3 class="text-primary-500 dark:text-warning-500 text-xl font-bold">{project.title}</h3>
			</a>

			<div
				class="inline-flex items-center gap-3 group-hover:translate-x-1 group-hover:-translate-y-1 duration-300 ease-in-out"
			>
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none"
						aria-hidden="true"
						><path
							fill-rule="evenodd"
							d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
							clip-rule="evenodd"
						/></svg
					>
				</div>
			</div>
		</div>
		<p class="text-left text-[16px] text-gray-600 dark:text-gray-300">{project.desc}</p>
		<ul class="flex flex-wrap items-center mt-4 list-none gap-3">
			{#each project.tags as tag (tag)}
				<li>
					<a
						href={`/projects/tag/${tagSlug(tag)}`}
						class="relative z-10 block cursor-pointer rounded-lg bg-primary-500 px-2 py-1 text-sm text-white hover:text-white hover:opacity-75 dark:bg-primary-hov"
						aria-label="Project Category link"
					>
						{tag}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
