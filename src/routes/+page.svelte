<script lang="ts">
	import SeoMeta from '../components/elements/SEOMeta.svelte';
	import HomeAbout from '../components/partials/home/HomeAbout.svelte';
	import HomeConnect from '../components/partials/home/HomeConnect.svelte';
	import HomeExperience from '../components/partials/home/HomeExperience.svelte';
	import HomeHero from '../components/partials/home/HomeHero.svelte';
	import HomeProjects from '../components/partials/home/HomeProjects.svelte';
	import HomeSkills from '../components/partials/home/HomeSkills.svelte';
	import { graph, personNode, webPageNode, webSiteNode } from '../lib/schema';
	import { resumeRoles } from '../data/resume/roles';
	import { resumeEducation } from '../data/resume/shared';
	import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, OG_IMAGE } from '../data/site';

	/**
	 * Only the roles this page actually shows.
	 *
	 * `resumeRoles` holds eight; `experiences` filters to the five with
	 * `site.show`, so passing the full list asserted three roles the page never
	 * renders — including one deliberately withheld from the site. Structured
	 * data should describe the page it sits on. /resume lists every role, so it
	 * passes the unfiltered set.
	 */
	const visibleRoles = resumeRoles.filter((role) => role.site?.show);

	// The home page is one of the two places the Person is defined in full
	// rather than referenced; see src/lib/schema.ts for why both.
	const schema = graph([
		personNode(visibleRoles, resumeEducation),
		webSiteNode(),
		webPageNode({
			path: '/',
			title: DEFAULT_TITLE,
			description: DEFAULT_DESCRIPTION,
			image: OG_IMAGE,
			isProfile: true
		})
	]);
</script>

<SeoMeta path="/" ogType="profile" {schema} />
<main id="main" tabindex="-1" class="scroll-smooth">
	<HomeHero />
	<HomeAbout />
	<HomeExperience />
	<HomeProjects />
	<HomeSkills />
	<HomeConnect />
</main>
