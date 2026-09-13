<script lang="ts">
	import PageHeading from '../../../../components/elements/PageHeading.svelte';
	import ProjectsSection from '../../../../components/partials/projects/ProjectsSection.svelte';

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<PageHeading
	title={`Some of my ${data.title} Projects`}
	description="Here are some of the cool and amazing projects I've built with {data.title}"
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
