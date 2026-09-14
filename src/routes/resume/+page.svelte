<script lang="ts">
	import ResumeDocument from '../../components/partials/resume/ResumeDocument.svelte';
	import SeoMeta from '../../components/elements/SEOMeta.svelte';
	import type { PageData } from './$types';
	import { graph, personNode, webPageNode, webSiteNode } from '../../lib/schema';
	import { resumeRoles } from '../../data/resume/roles';
	import { resumeEducation } from '../../data/resume/shared';
	import { absoluteUrl } from '../../data/site';

	let { data }: { data: PageData } = $props();

	// Person in full here too, not a bare @id reference: Google resolves @id
	// within a document reliably and across documents inconsistently, so a
	// ProfilePage whose mainEntity lived only on / could dangle.
	const schema = $derived(
		graph([
			personNode(resumeRoles, resumeEducation),
			webSiteNode(),
			webPageNode({
				path: '/resume',
				title: 'Resume',
				description: data.doc.meta.description,
				isProfile: true
			})
		])
	);
</script>

<SeoMeta
	title="Resume"
	metadescription={data.doc.meta.description}
	path="/resume"
	ogType="profile"
	image={absoluteUrl('/og/resume.png')}
	imageAlt="Ayomide Odewale — resume"
	{schema}
/>

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
