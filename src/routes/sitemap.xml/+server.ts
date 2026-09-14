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
	/**
	 * `lastmod` is emitted only where a real date exists — the hand-set `updated`
	 * on a case study. No fallback constant, and deliberately not `new Date()`.
	 *
	 * Both of those would put the same date on all 24 URLs, which tells a crawler
	 * the field is not tracking anything real; once it concludes that, it ignores
	 * lastmod for the whole sitemap. Omitting it is strictly better than filling
	 * it in with a number nobody maintains, so a URL with no recorded date simply
	 * carries changefreq and priority as before.
	 */
	const urls = [
		...staticRoutes.map((path) => ({ path, lastmod: undefined as string | undefined })),
		...caseStudies.map((study) => ({
			path: `/projects/${study.slug}`,
			lastmod: study.updated
		}))
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		({ path, lastmod }) => `	<url>
		<loc>${SITE_URL}${path === '/' ? '/' : path}</loc>${
			lastmod
				? `
		<lastmod>${lastmod}</lastmod>`
				: ''
		}
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
