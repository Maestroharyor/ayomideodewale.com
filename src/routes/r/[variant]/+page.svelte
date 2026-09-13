<script lang="ts">
	import ResumeDocument from '../../../components/partials/resume/ResumeDocument.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.doc.meta.title}</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main class="resume-shell bg-white py-8">
	<ResumeDocument doc={data.doc} />
</main>
