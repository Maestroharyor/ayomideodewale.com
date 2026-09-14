import { caseStudies } from '../../data/case-studies';
import { LAST_MODIFIED, SITE_URL } from '../../data/site';
import type { RequestHandler } from './$types';

export const prerender = true;

/**
 * Listed routes only. Tag pages are noindex thin content and the resume
 * variants exist solely as PDFs, so neither appears here.
 */
const staticRoutes = ['/', '/projects', '/designs', '/cloud', '/resume', '/contact'];

export const GET: RequestHandler = () => {
	/**
	 * `lastmod` comes from the hand-set `updated` field on a case study, falling
	 * back to a build-time constant. Deliberately not `new Date()`: a sitemap that
	 * claims every URL changed on every crawl is telling the crawler its own dates
	 * are worthless, and it stops reading them.
	 */
	const urls = [
		...staticRoutes.map((path) => ({ path, lastmod: LAST_MODIFIED })),
		...caseStudies.map((study) => ({
			path: `/projects/${study.slug}`,
			lastmod: study.updated ?? LAST_MODIFIED
		}))
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		({ path, lastmod }) => `	<url>
		<loc>${SITE_URL}${path === '/' ? '/' : path}</loc>
		<lastmod>${lastmod}</lastmod>
		<changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq>
		<priority>${path === '/' ? '1.0' : '0.7'}</priority>
	</url>`
	)
	.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
};
