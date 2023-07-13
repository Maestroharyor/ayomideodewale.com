<script lang="ts">
	import type { Project } from '../../types';
	import FaExternalLinkAlt from 'svelte-icons-pack/fa/FaSolidExternalLinkAlt';
	import FaGithub from 'svelte-icons-pack/fa/FaBrandsGithub';

	import Icon from 'svelte-icons-pack/Icon.svelte';

	export let project: Project;
</script>

<div
	class=" mx-auto flex flex-col md:flex-row items-start gap-5 group project_card px-5 py-5 h-full rounded-[16px] hover:bg-[rgba(0,0,0,0.02)] hover:dark:bg-[rgba(0,0,0,0.15)] hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.15)] hover:drop-shadow-md hover:backdrop-blur-[3.2px] hover:-translate-y-[2px] transition-all duration-300 cursor-pointer w-full"
>
	<div
		class=" w-[200px] relative rounded-xl border-gray-400 dark:border-gray-600 border-2 p-2 transition group-hover:border-primary-hov dark:group-hover:border-warning-500"
	>
		<img
			class="w-full h-auto hover:opacity-75 transition rounded-md"
			src={project.img}
			alt={project.title || ''}
			loading="lazy"
			width="300"
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

	<div class="w-full mt-5 flex-1">
		<div class="flex projects-center justify-between mb-1">
			{#if project.inDevelopment}
				<h3 class="text-primary-500 dark:text-warning-500 text-xl font-bold">{project.title}</h3>
			{:else}
				<a
					href={project.link || project.github}
					target="_blank"
					rel="noreferrer"
					aria-label="Project link"
				>
					<h3 class="text-primary-500 dark:text-warning-500 text-xl font-bold">{project.title}</h3>
				</a>
			{/if}

			<div
				class="inline-flex items-center gap-3 group-hover:translate-x-1 group-hover:-translate-y-1 duration-300 ease-in-out"
			>
				{#if project.link}
					<a href={project.link} target="_blank" rel="noreferrer" aria-label="open link">
						<!-- <Icon
							src={FaExternalLinkAlt}
							size={'10'}
							className="text-gray-500 dark:text-gray-100"
						/> -->
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
					</a>
				{/if}
				{#if project.github}
					<a href={project.github} target="_blank" rel="noreferrer" aria-label="Github link">
						<Icon src={FaGithub} size={'10'} className="text-gray-500 dark:text-gray-100" />
					</a>
				{/if}
			</div>
		</div>
		<p class="text-fun-gray text-left text-sm">{project.desc}</p>
		<ul class="flex flex-wrap items-center mt-4 list-none gap-3">
			{#each project.tags as tag}
				<li>
					<a
						href={`/projects/tag/${tag.toLowerCase()}`}
						class="rounded-lg text-sm bg-primary-500 text-white dark:bg-primary-hov hover:text-white py-1 px-2 cursor-pointer hover:opacity-75 block"
						aria-label="Project Category link"
					>
						{tag}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
