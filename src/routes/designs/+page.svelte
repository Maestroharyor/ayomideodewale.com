<script lang="ts">
	import PageHeading from '../../components/elements/PageHeading.svelte';
	import SeoMeta from '../../components/elements/SEOMeta.svelte';
	import DesignSection from '../../components/partials/designs/DesignSection.svelte';
	import { designs } from '../../data/designs';

	const metadescription =
		'UI design work by Ayomide Odewale, a fullstack engineer who designs the things he builds. Interface concepts and product screens.';
</script>

<SeoMeta title="My UI Designs" {metadescription} path="/designs" />
<main>
	<!--
		The description used to read "UI Design Projects that screams BEAUTIFUL",
		which over-claimed for three shots and did not parse. It says what the page
		is instead. "A few" sets the expectation that this is a sample.
	-->
	<PageHeading
		title="My UI Designs"
		description="I design the things I build. A few interface concepts and product screens."
	/>
	<DesignSection {designs} />
</main>
