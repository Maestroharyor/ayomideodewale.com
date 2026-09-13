import { error } from '@sveltejs/kit';
import { caseStudies, caseStudyBySlug } from '../../../data/case-studies';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

/** Nothing else links every slug, so the crawler needs them declared. */
export const entries: EntryGenerator = () => caseStudies.map((study) => ({ slug: study.slug }));

export const load = (({ params }) => {
	const study = caseStudyBySlug(params.slug);
	if (!study) error(404, 'Case study not found');
	return { study };
}) satisfies PageLoad;
