<script lang="ts">
	import { dev } from '$app/environment';
	import SeoMeta from '../../../components/elements/SEOMeta.svelte';
	import { projects } from '../../../data/projects';
	import { tagSlug } from '../../../utils';
	import { stackLogo, stackNeedsInvert } from '../../../utils/stack-logos';
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

	/**
	 * Neighbours in the order projects.ts defines, which is the order /projects
	 * shows. Someone who finishes a study previously had only a back link; this
	 * gives the next one a route without returning to the index.
	 *
	 * Deliberately not wrapping around: the ends of the list are meaningful, since
	 * the featured work is first.
	 */
	/** Stable ids so the contents rail and the headings agree. */
	const slugifyHeading = (heading: string) =>
		heading
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');

	const withStudies = projects.filter((project) => project.caseStudy);
	const neighbours = $derived.by(() => {
		const index = withStudies.findIndex((project) => project.caseStudy === study.slug);
		if (index === -1) return { previous: undefined, next: undefined };
		return { previous: withStudies[index - 1], next: withStudies[index + 1] };
	});
</script>

<SeoMeta
	title={study.title}
	metadescription={study.metadescription}
	path={`/projects/${study.slug}`}
/>

<!-- Widens at lg to make room for the contents rail; the prose column itself
	 stays at a readable measure rather than growing with the page. -->
<main class="mx-auto max-w-[860px] px-5 pt-20 pb-28 lg:max-w-[1080px]">
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

	<!--
		Chips carry the logo where one exists. About twenty of the forty-nine
		technologies named across the studies have a mark in static/svgs; the rest
		are libraries and APIs with no widely recognised logo, so they read as text
		rather than get a placeholder.
	-->
	<ul class="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
		{#each study.stacks as stack (stack)}
			{@const logo = stackLogo(stack)}
			{@const linked = tagPages.has(tagSlug(stack))}
			<li>
				<svelte:element
					this={linked ? 'a' : 'span'}
					href={linked ? `/projects/tag/${tagSlug(stack)}` : undefined}
					class="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/60 py-1.5 pr-3 text-sm font-medium text-primary-900 transition duration-300 dark:border-primary-600 dark:bg-primary-900/40 dark:text-gray-100 {logo
						? 'pl-2'
						: 'pl-3'} {linked
						? 'cursor-pointer hover:border-primary-500 hover:text-primary-500 dark:hover:border-warning-500 dark:hover:text-warning-500'
						: ''}"
				>
					{#if logo}
						<img
							src={logo}
							alt=""
							width="16"
							height="16"
							class="h-4 w-4 object-contain {stackNeedsInvert(stack) ? 'dark:invert' : ''}"
						/>
					{/if}
					{stack}
				</svelte:element>
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
		<dl
			class="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 md:grid-cols-4 dark:border-primary-600 dark:bg-primary-600"
		>
			{#each study.stats as stat (stat.label)}
				<!-- gap-px over a tinted parent draws the dividers, so the band reads as
					 one object rather than four loose numbers. -->
				<div class="bg-white px-5 py-4 dark:bg-dark-background/60">
					<dd class="text-3xl font-bold text-primary-500 dark:text-warning-500">{stat.value}</dd>
					<dt class="mt-1 text-sm text-gray-600 dark:text-gray-300">{stat.label}</dt>
				</div>
			{/each}
		</dl>
	{/if}

	<div class="mt-14 grid gap-10 lg:grid-cols-[1fr_200px] lg:items-start">
		<div class="space-y-12 lg:order-1">
			{#each visibleSections as section, i (section.heading)}
				{@const id = slugifyHeading(section.heading)}
				<section {id} class="scroll-mt-28">
					<!-- The number gives a long study a sense of position: you can tell
						 you are on the second of five rather than somewhere in a wall. -->
					<div
						class="flex items-baseline gap-3 border-b border-gray-200 pb-3 dark:border-primary-600"
					>
						<span class="font-mono text-sm font-bold text-gray-400 tabular-nums dark:text-gray-500">
							{String(i + 1).padStart(2, '0')}
						</span>
						<h2 class="text-2xl font-bold text-primary-500 dark:text-warning-500">
							{section.heading}
						</h2>
					</div>
					{#each section.body as paragraph (paragraph)}
						<p class="mt-4 text-lg leading-relaxed">{paragraph}</p>
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

		<!--
			Contents rail. These studies run to five or six sections of dense prose,
			and a reader arriving from a tag page or a search result has no way to see
			the shape of one before committing to it. lg and up only: below that it
			would be a list of links above the thing it indexes.
		-->
		{#if visibleSections.length > 2}
			<nav aria-label="On this page" class="hidden lg:sticky lg:top-28 lg:order-2 lg:block">
				<p class="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400">
					On this page
				</p>
				<ul class="mt-3 space-y-2 border-l border-gray-200 dark:border-primary-600">
					{#each visibleSections as section (section.heading)}
						<li>
							<a
								href={`#${slugifyHeading(section.heading)}`}
								class="-ml-px block border-l border-transparent pl-3 text-sm text-gray-600 transition duration-200 hover:border-primary-500 hover:text-primary-500 dark:text-gray-400 dark:hover:border-warning-500 dark:hover:text-warning-500"
							>
								{section.heading}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		{/if}
	</div>

	{#if neighbours.previous || neighbours.next}
		<nav
			aria-label="Other case studies"
			class="mt-16 grid gap-4 border-t border-gray-200 pt-8 sm:grid-cols-2 dark:border-primary-600"
		>
			{#if neighbours.previous}
				<a
					href={`/projects/${neighbours.previous.caseStudy}`}
					class="group flex items-center gap-4 rounded-xl border border-gray-200 px-5 py-4 transition duration-300 hover:border-primary-500 sm:col-start-1 dark:border-primary-600 dark:hover:border-warning-500"
				>
					<!-- Shifts toward its own edge on hover, so the direction is felt as
						 well as read. -->
					<svg
						class="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transition-none dark:text-gray-500"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M19 12H5M12 19l-7-7 7-7" />
					</svg>
					<span class="min-w-0">
						<span
							class="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400"
							>Previous</span
						>
						<span class="mt-1 block text-lg font-bold text-primary-500 dark:text-warning-500"
							>{neighbours.previous.title}</span
						>
					</span>
				</a>
			{/if}

			{#if neighbours.next}
				<!-- col-start-2 so a missing previous does not pull next across. -->
				<a
					href={`/projects/${neighbours.next.caseStudy}`}
					class="group flex items-center justify-end gap-4 rounded-xl border border-gray-200 px-5 py-4 text-right transition duration-300 hover:border-primary-500 sm:col-start-2 dark:border-primary-600 dark:hover:border-warning-500"
				>
					<span class="min-w-0">
						<span
							class="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400"
							>Next</span
						>
						<span class="mt-1 block text-lg font-bold text-primary-500 dark:text-warning-500"
							>{neighbours.next.title}</span
						>
					</span>
					<svg
						class="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none dark:text-gray-500"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M5 12h14M12 5l7 7-7 7" />
					</svg>
				</a>
			{/if}
		</nav>
	{/if}
</main>
