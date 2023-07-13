<script lang="ts">
	import PageHeading from '../../components/elements/PageHeading.svelte';
	import SeoMeta from '../../components/elements/SEOMeta.svelte';
	import DesignSection from '../../components/partials/designs/DesignSection.svelte';
	import ProjectsSection from '../../components/partials/projects/ProjectsSection.svelte';
	import { designs } from '../../data/designs';
	const metadescription =
		'While I am a Fullstack Software and Web Developer, I also love UI and UX design. Here are a few of the canon ones.';
</script>

<SeoMeta title="My UI Designs" {metadescription} />
<main>
	<PageHeading
		title="My UI Designs"
		description="Here are some of my UI Design Projects that screams BEAUTIFUL"
	/>
	<DesignSection {designs} />
</main>
