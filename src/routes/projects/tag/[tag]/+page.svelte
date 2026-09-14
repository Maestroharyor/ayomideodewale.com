<script lang="ts">
	import PageHeading from '../../../../components/elements/PageHeading.svelte';
	import ProjectsSection from '../../../../components/partials/projects/ProjectsSection.svelte';
	import SeoMeta from '../../../../components/elements/SEOMeta.svelte';
	import { page } from '$app/state';

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<!-- noindex: ~25 of these, each holding a handful of projects already listed on
	 /projects. Indexing them dilutes the site with near-duplicate thin pages.
	 No JSON-LD for the same reason: structured data on a page that will never be
	 indexed is markup nothing reads. -->
<SeoMeta
	title={`${data.title} Projects`}
	metadescription={`Projects Ayomide Odewale has built with ${data.title}.`}
	path={page.url.pathname}
	imageAlt={`Projects built with ${data.title}`}
	noindex
/>

<!-- The only route that had no <main>, so the page content sat outside any
	 landmark and the skip link had nothing to target. -->
<main id="main" tabindex="-1">
	<PageHeading
		title={`Some of my ${data.title} Projects`}
		description="Here are some of the cool and amazing projects I've built with {data.title}"
		highlight={data.title}
	/>
	<ProjectsSection projects={data.projects}>
		<p class="text-2xl text-center">
			Check out more on my
			<a
				href="https://github.com/maestroharyor"
				target="_blank"
				rel="noreferrer"
				class="text-dark-theme hover:text-primary-500 underline dark:hover:text-warning-700 dark:text-warning-500 font-bold italic transition-all duration-300 ease-in-out"
			>
				GitHub Repo
			</a>
			.
		</p>
	</ProjectsSection>
</main>
