<script>
	import SeoMeta from '../components/elements/SEOMeta.svelte';
	import HomeAbout from '../components/partials/home/HomeAbout.svelte';
	import HomeConnect from '../components/partials/home/HomeConnect.svelte';
	import HomeExperience from '../components/partials/home/HomeExperience.svelte';
	import HomeHero from '../components/partials/home/HomeHero.svelte';
	import HomeProjects from '../components/partials/home/HomeProjects.svelte';
	import HomeSkills from '../components/partials/home/HomeSkills.svelte';
</script>

<SeoMeta title="I am Ayomide Odewale" />
<main class="scroll-smooth">
	<HomeHero />
	<HomeAbout />
	<HomeExperience />
	<HomeProjects />
	<HomeSkills />
	<HomeConnect />
</main>
