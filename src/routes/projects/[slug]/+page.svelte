<script lang="ts">
	import { dev } from '$app/environment';
	import SeoMeta from '../../../components/elements/SEOMeta.svelte';
	import { projects } from '../../../data/projects';
	import { tagSlug } from '../../../utils';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const study = $derived(data.study);

	// Only link a chip that actually has a tag page behind it. A one-off tool
	// like TipTap or tsup is named in a study but tags no project, and a chip
	// that looks clickable and 404s is worse than one that never invited the click.
	const tagPages = new Set(projects.flatMap((project) => project.tags).map(tagSlug));

	// A section with no body is unwritten. In production it is omitted entirely
	// rather than shipped as an empty heading.
	const visibleSections = $derived(study.sections.filter((s) => s.body.length > 0 || dev));
</script>

<SeoMeta
	title={study.title}
	metadescription={study.metadescription}
	path={`/projects/${study.slug}`}
/>

<main class="mx-auto max-w-[860px] px-5 pb-28 pt-20">
	<a
		href="/projects"
		class="text-sm font-medium text-primary-500 underline transition-colors duration-300 hover:text-dark-theme dark:text-warning-500 dark:hover:text-warning-700"
	>
		← All projects
	</a>

	<h1 class="mt-6 text-4xl font-bold text-primary-500 md:text-5xl dark:text-warning-500">
		{study.title}
	</h1>
	<p class="mt-3 text-xl">{study.tagline}</p>

	<ul class="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
		{#each study.stacks as stack (stack)}
			<li>
				{#if tagPages.has(tagSlug(stack))}
					<a
						href={`/projects/tag/${tagSlug(stack)}`}
						class="inline-block cursor-pointer rounded-lg bg-primary-500 px-2 py-1 text-sm text-white hover:text-white hover:opacity-75 dark:bg-primary-hov"
					>
						{stack}
					</a>
				{:else}
					<span
						class="inline-block rounded-lg bg-primary-500 px-2 py-1 text-sm text-white dark:bg-primary-hov"
					>
						{stack}
					</span>
				{/if}
			</li>
		{/each}
	</ul>

	{#if study.link || study.github}
		<!-- Tools live in their repository rather than at a URL, so the source link
			 is a first-class action here and not an afterthought. -->
		<p class="mt-5 flex flex-wrap gap-3">
			{#if study.link}
				<a
					href={study.link}
					target="_blank"
					rel="noreferrer"
					class="inline-flex items-center gap-2 rounded-full border-2 border-primary-500 px-6 py-2 font-medium text-primary-500 transition duration-300 hover:border-dark-theme hover:text-dark-theme dark:border-white dark:text-gray-200 dark:hover:border-warning-500 dark:hover:text-warning-500"
				>
					Visit {study.title}
				</a>
			{/if}
			{#if study.github}
				<a
					href={study.github}
					target="_blank"
					rel="noreferrer"
					class="inline-flex items-center gap-2 rounded-full border-2 border-gray-400 px-6 py-2 font-medium text-gray-700 transition duration-300 hover:border-dark-theme hover:text-dark-theme dark:border-gray-500 dark:text-gray-300 dark:hover:border-warning-500 dark:hover:text-warning-500"
				>
					<img src="/svgs/github.svg" alt="" width="18" height="18" class="h-[18px] w-[18px]" />
					View source
				</a>
			{/if}
		</p>
	{/if}

	<img
		src={study.img}
		alt={`${study.title} screenshot`}
		width="1000"
		height="508"
		class="mt-10 w-full rounded-xl border-2 border-gray-300 p-2 dark:border-gray-600"
	/>

	{#if study.stats.length}
		<dl class="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
			{#each study.stats as stat (stat.label)}
				<div>
					<dt class="text-sm text-gray-600 dark:text-gray-300">{stat.label}</dt>
					<dd class="text-3xl font-bold text-primary-500 dark:text-warning-500">{stat.value}</dd>
				</div>
			{/each}
		</dl>
	{/if}

	<div class="mt-12 space-y-10">
		{#each visibleSections as section (section.heading)}
			<section>
				<h2 class="text-2xl font-bold text-primary-500 dark:text-warning-500">
					{section.heading}
				</h2>
				{#each section.body as paragraph (paragraph)}
					<p class="mt-3 text-lg leading-relaxed">{paragraph}</p>
				{/each}

				{#if dev && section.todo?.length}
					<div
						class="mt-3 rounded-lg border-2 border-dashed border-warning-500 bg-warning-50 p-4 text-base text-gray-900"
					>
						<p class="font-bold">Needs your input (dev only — never rendered in production):</p>
						<ul class="mt-2 list-disc space-y-1 pl-5">
							{#each section.todo as item (item)}
								<li>{item}</li>
							{/each}
						</ul>
					</div>
				{/if}
			</section>
		{/each}
	</div>
</main>
