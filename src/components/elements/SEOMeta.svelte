<script lang="ts">
	export let title: string;
	export let metadescription: string = '';
	let titleView: string, description: string;
	if (title) {
		titleView = `${title} | Ayomide Odewale`;
	} else {
		titleView = `Maestro | Ayomide Odewale`;
	}

	if (metadescription) {
		description = metadescription;
	} else {
		description =
			'I am a Fullstack Software and Web Developer specialized in building TopNotch JavaScript Powered Software with extensive knowledge in other relevant skills and tech stacks.';
	}
</script>

<svelte:head>
	<meta charSet="UTF-8" />

	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="description" content={`${description}`} />
	<title>{titleView}</title>

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content={'maestroharyor'} />

	<meta property="og:url" content={'/'} />
	<meta property="og:image" content={'/personal/og_image.png'} />
	<meta property="og:site_name" content={'Ayomide Odewale'} />
	<meta property="og:title" content={titleView} />
	<meta property="og:description" content={description} />
</svelte:head>
