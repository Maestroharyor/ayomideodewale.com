import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import { buildResume, resumeVariants } from '../../../data/resume';
import type { ResumeVariantId } from '../../../types';
import type { PageLoad } from './$types';

/**
 * A render target for scripts/build-resume-pdfs.mjs, not a public page.
 *
 * The non-canonical variants ship as PDFs you attach to applications; only
 * /resume is reachable as HTML. Guarding on `dev` means this never exists in
 * production at all, so there is nothing to keep out of the sitemap.
 */
export const prerender = false;
export const csr = false;

export const load = (({ params }) => {
	if (!dev) error(404, 'Not found');

	const variant = resumeVariants[params.variant as ResumeVariantId];
	if (!variant || variant.canonical) error(404, 'Not found');

	return { doc: buildResume(variant.id) };
}) satisfies PageLoad;
