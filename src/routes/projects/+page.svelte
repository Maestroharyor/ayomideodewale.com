<script>
	import PageHeading from '../../components/elements/PageHeading.svelte';
	import ProjectCard from '../../components/elements/ProjectCard.svelte';
	import SeoMeta from '../../components/elements/SEOMeta.svelte';
	import ProjectsSection from '../../components/partials/projects/ProjectsSection.svelte';
	import { projects } from '../../data/projects';

	const metadescription =
		'I am a Fullstack Software and Web Developer specialized in building TopNotch JavaScript Powered Software with extensive knowledge in other relevant skills and tech stacks. Here are some of my dev projects.';
</script>

<SeoMeta title="My Dev Projects" {metadescription} />

<main>
	<PageHeading
		title="My Dev Projects"
		description="Here are some of the cool and amazing projects, apps and software I've built with various tech stacks."
	/>
	<ProjectsSection {projects}>
		<p class="text-2xl text-center">
			Check out more on my{' '}
			<a
				href="https://github.com/maestroharyor"
				target={'_blank'}
				rel="noreferrer"
				class="text-dark-theme underline dark:text-warning font-bold italic"
			>
				GitHub Repo
			</a>{' '}
			.
		</p>
	</ProjectsSection>
</main>
