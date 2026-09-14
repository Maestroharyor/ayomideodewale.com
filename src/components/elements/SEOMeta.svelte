<script lang="ts">
	import {
		DEFAULT_DESCRIPTION,
		DEFAULT_TITLE,
		OG_IMAGE,
		OG_IMAGE_HEIGHT,
		OG_IMAGE_TYPE,
		OG_IMAGE_WIDTH,
		SITE_LOCALE,
		SITE_NAME,
		TWITTER_HANDLE,
		absoluteUrl
	} from '../../data/site';
	import type { SchemaGraph } from '../../types/schema';

	let {
		title,
		metadescription = '',
		path = '/',
		noindex = false,
		ogType = 'website',
		image,
		imageAlt,
		publishedTime,
		modifiedTime,
		schema
	}: {
		title?: string;
		metadescription?: string;
		path?: string;
		noindex?: boolean;
		/** `article` on case studies, `profile` on pages that are about the person. */
		ogType?: 'website' | 'article' | 'profile';
		/** Absolute URL of a per-page 1200x630 card. Falls back to the default. */
		image?: string;
		imageAlt?: string;
		publishedTime?: string;
		modifiedTime?: string;
		/** Pre-built JSON-LD from src/lib/schema.ts. */
		schema?: SchemaGraph;
	} = $props();

	const titleView = $derived(title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE);
	const description = $derived(metadescription || DEFAULT_DESCRIPTION);
	const canonical = $derived(absoluteUrl(path));
	const cardImage = $derived(image ?? OG_IMAGE);
	const cardImageAlt = $derived(imageAlt ?? DEFAULT_TITLE);

	/**
	 * Without `max-image-preview:large` Google shows a thumbnail rather than a
	 * full-width image in Discover and image-rich results, and the per-page OG
	 * cards are wasted there. The defaults are otherwise what `index, follow`
	 * already implies, stated explicitly so the intent is readable.
	 */
	const robots = $derived(
		noindex
			? 'noindex, nofollow'
			: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
	);

	/**
	 * `<` is escaped because JSON.stringify does not escape it and this block now
	 * carries every case study title, tagline and description. A single `</script`
	 * anywhere in that prose would close the element early and dump the rest of
	 * the graph into the page body. \u003c is valid JSON and parses back to `<`.
	 */
	const jsonLd = $derived(schema ? JSON.stringify(schema).replace(/</g, '\\u003c') : '');
</script>

<svelte:head>
	<title>{titleView}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta name="robots" content={robots} />

	<meta property="og:type" content={ogType} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content={SITE_LOCALE} />
	<meta property="og:title" content={titleView} />
	<meta property="og:description" content={description} />
	<!-- Absolute, not relative: Open Graph ignores relative URLs outright. -->
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={cardImage} />
	<!-- Older Facebook and WhatsApp scrapers still key off secure_url. -->
	<meta property="og:image:secure_url" content={cardImage} />
	<!-- Declared dimensions let LinkedIn and WhatsApp lay the card out without
	     fetching the image first, so the preview appears on the first paste. -->
	<meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
	<meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
	<meta property="og:image:type" content={OG_IMAGE_TYPE} />
	<meta property="og:image:alt" content={cardImageAlt} />

	{#if ogType === 'article'}
		{#if publishedTime}
			<meta property="article:published_time" content={publishedTime} />
		{/if}
		{#if modifiedTime}
			<meta property="article:modified_time" content={modifiedTime} />
		{/if}
		<meta property="article:author" content={SITE_NAME} />
	{/if}

	<!-- Always emitted. Open Graph alone falls back at best to the small
	     thumbnail `summary` card, never summary_large_image. -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={TWITTER_HANDLE} />
	<meta name="twitter:creator" content={TWITTER_HANDLE} />
	<meta name="twitter:title" content={titleView} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={cardImage} />
	<meta name="twitter:image:alt" content={cardImageAlt} />

	{#if jsonLd}
		<!-- jsonLd is JSON.stringify of static site data, never user input. -->
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html `<script type="application/ld+json">${jsonLd}</script` + `>`}
	{/if}
</svelte:head>
