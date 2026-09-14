<script lang="ts">
	import PageHeading from '../../components/elements/PageHeading.svelte';
	import SeoMeta from '../../components/elements/SEOMeta.svelte';
	import ProjectsSection from '../../components/partials/projects/ProjectsSection.svelte';
	import { projects } from '../../data/projects';
	import { caseStudies } from '../../data/case-studies';
	import { breadcrumbNode, graph, itemListNode, webPageNode, webSiteNode } from '../../lib/schema';
	import { absoluteUrl } from '../../data/site';

	// 155 characters. The previous one ran to 208 and was cut mid-sentence in
	// results, and the half that survived was 'TopNotch JavaScript Powered
	// Software', which claims rather than describes.
	const metadescription =
		'Fullstack projects by Ayomide Odewale, with a written case study behind each one. TypeScript, Go, React, Next.js, Node, Django, AWS and Terraform.';

	const title = 'Some Recent Dev Projects';

	const schema = graph([
		webSiteNode(),
		webPageNode({ path: '/projects', title, description: metadescription }),
		breadcrumbNode([
			{ name: 'Home', path: '/' },
			{ name: 'Projects', path: '/projects' }
		]),
		itemListNode('/projects', caseStudies)
	]);
</script>

<SeoMeta
	{title}
	{metadescription}
	path="/projects"
	image={absoluteUrl('/og/projects.png')}
	imageAlt="Projects by Ayomide Odewale"
	{schema}
/>

<main id="main" tabindex="-1">
	<PageHeading
		title="Some Recent Dev Projects"
		description="Here are some of the cool and amazing projects, apps and software I've built with various tech stacks."
	/>
	<ProjectsSection {projects}>
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
