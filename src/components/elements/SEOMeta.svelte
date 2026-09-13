<script lang="ts">
	import {
		DEFAULT_DESCRIPTION,
		DEFAULT_TITLE,
		OG_IMAGE,
		SITE_NAME,
		SITE_URL,
		SOCIAL_PROFILES,
		absoluteUrl
	} from '../../data/site';

	let {
		title,
		metadescription = '',
		path = '/',
		noindex = false
	}: { title?: string; metadescription?: string; path?: string; noindex?: boolean } = $props();

	const titleView = $derived(title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE);
	const description = $derived(metadescription || DEFAULT_DESCRIPTION);
	const canonical = $derived(absoluteUrl(path));

	// Only on the home page: repeating the Person on every route gives crawlers
	// several competing definitions of the same entity.
	const personSchema = $derived(
		path === '/'
			? JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'Person',
					name: SITE_NAME,
					url: SITE_URL,
					image: OG_IMAGE,
					jobTitle: 'Fullstack Engineer',
					description: DEFAULT_DESCRIPTION,
					address: {
						'@type': 'PostalAddress',
						addressLocality: 'Lagos',
						addressCountry: 'NG'
					},
					sameAs: SOCIAL_PROFILES
				})
			: ''
	);
</script>

<svelte:head>
	<title>{titleView}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={titleView} />
	<meta property="og:description" content={description} />
	<!-- Absolute, not relative: Open Graph ignores relative URLs outright. -->
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:alt" content="Ayomide Odewale — Fullstack Engineer" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@MaestroHaryor" />
	<meta name="twitter:title" content={titleView} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={OG_IMAGE} />

	{#if personSchema}
		<!-- personSchema is JSON.stringify of static site data, never user input. -->
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html `<script type="application/ld+json">${personSchema}</script` + `>`}
	{/if}
</svelte:head>
