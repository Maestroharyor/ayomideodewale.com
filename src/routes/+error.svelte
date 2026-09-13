<script lang="ts">
	import { page } from '$app/state';
	import SeoMeta from '../components/elements/SEOMeta.svelte';
	import { projects } from '../data/projects';

	const status = $derived(page.status);
	const isNotFound = $derived(status === 404);

	const heading = $derived(isNotFound ? 'This page does not exist' : 'Something went wrong');
	const body = $derived(
		isNotFound
			? 'The link is either wrong, or it pointed at something I have since moved or removed. Nothing here is lost, it just is not at this address.'
			: (page.error?.message ??
					'An unexpected error occurred. Trying again in a moment usually sorts it out.')
	);

	// Somewhere to go rather than a dead end: the three projects worth landing on.
	const suggestions = $derived(
		projects
			.filter((project) => project.featured && project.caseStudy)
			.slice(0, 3)
			.map((project) => ({ title: project.title, href: `/projects/${project.caseStudy}` }))
	);
</script>

<!-- noindex: an error page should never be a search result. -->
<SeoMeta
	title={isNotFound ? 'Page not found' : 'Something went wrong'}
	metadescription="That page could not be found. Head back to the homepage or browse the projects."
	path={page.url.pathname}
	noindex
/>

<main class="mx-auto flex max-w-[760px] flex-col items-center px-5 py-24 text-center md:py-32">
	<p
		class="text-[88px] leading-none font-bold tracking-tighter text-primary-500 md:text-[120px] dark:text-warning-500"
	>
		{status}
	</p>

	<h1 class="mt-4 text-3xl font-bold text-primary-900 md:text-4xl dark:text-gray-100">
		{heading}
	</h1>

	<p class="mt-5 max-w-[52ch] text-lg leading-relaxed text-gray-600 dark:text-gray-300">
		{body}
	</p>

	<div class="mt-10 flex flex-wrap items-center justify-center gap-4">
		<a
			href="/"
			class="rounded-full bg-primary-500 px-7 py-3 text-base font-semibold text-white transition duration-300 hover:bg-primary-600 dark:bg-warning-500 dark:text-primary-900 dark:hover:bg-warning-hov"
		>
			Back to the homepage
		</a>
		<a
			href="/projects"
			class="rounded-full border-2 border-primary-500 px-7 py-3 text-base font-semibold text-primary-500 transition duration-300 hover:border-dark-theme hover:text-dark-theme dark:border-gray-300 dark:text-gray-200 dark:hover:border-warning-500 dark:hover:text-warning-500"
		>
			Browse the projects
		</a>
	</div>

	{#if isNotFound && suggestions.length}
		<div class="mt-14 w-full border-t border-gray-200 pt-8 dark:border-primary-600">
			<h2 class="text-sm font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400">
				Or start with one of these
			</h2>
			<ul class="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
				{#each suggestions as item (item.href)}
					<li>
						<a
							href={item.href}
							class="text-lg text-primary-500 underline underline-offset-4 transition duration-300 hover:text-dark-theme dark:text-warning-500 dark:hover:text-white"
						>
							{item.title}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</main>
