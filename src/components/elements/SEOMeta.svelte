<script lang="ts">
	const DEFAULT_DESCRIPTION =
		'I am a Fullstack Software and Web Developer specialized in building TopNotch JavaScript Powered Software with extensive knowledge in other relevant skills and tech stacks.';

	let { title, metadescription = '' }: { title?: string; metadescription?: string } = $props();

	const titleView = $derived(title ? `${title} | Ayomide Odewale` : 'Maestro | Ayomide Odewale');
	const description = $derived(metadescription || DEFAULT_DESCRIPTION);
</script>

<svelte:head>
	<meta charset="UTF-8" />

	<meta http-equiv="x-ua-compatible" content="IE=edge" />
	<meta name="description" content={`${description}`} />
	<title>{titleView}</title>

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content="maestroharyor" />

	<meta property="og:url" content="/" />
	<meta property="og:image" content="/personal/og_image.png" />
	<meta property="og:site_name" content="Ayomide Odewale" />
	<meta property="og:title" content={titleView} />
	<meta property="og:description" content={description} />
</svelte:head>
