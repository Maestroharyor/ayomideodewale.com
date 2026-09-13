import { caseStudies } from '../../data/case-studies';
import { SITE_URL } from '../../data/site';
import type { RequestHandler } from './$types';

export const prerender = true;

/**
 * Listed routes only. Tag pages are noindex thin content and the resume
 * variants exist solely as PDFs, so neither appears here.
 */
const staticRoutes = ['/', '/projects', '/designs', '/cloud', '/resume', '/contact'];

export const GET: RequestHandler = () => {
	const urls = [...staticRoutes, ...caseStudies.map((study) => `/projects/${study.slug}`)];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(path) => `	<url>
		<loc>${SITE_URL}${path === '/' ? '/' : path}</loc>
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
