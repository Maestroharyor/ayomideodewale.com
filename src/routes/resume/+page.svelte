<script lang="ts">
	import ResumeDocument from '../../components/partials/resume/ResumeDocument.svelte';
	import SeoMeta from '../../components/elements/SEOMeta.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SeoMeta title="Resume" metadescription={data.doc.meta.description} path="/resume" />

<main class="resume-shell bg-white py-8">
	<div class="screen-only mx-auto mb-6 flex max-w-[210mm] items-center justify-between px-4">
		<a href="/" class="text-sm font-medium text-primary-500 underline">← Back to site</a>
		<a
			href={data.doc.pdfHref}
			download
			class="rounded-full border-2 border-primary-500 px-6 py-2 text-sm font-medium text-primary-500 transition duration-300 hover:border-dark-theme hover:text-dark-theme"
		>
			Download PDF
		</a>
	</div>

	<ResumeDocument doc={data.doc} />
</main>
