import { SITE_URL } from '../../data/site';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => {
	/**
	 * `Disallow: /r/` alone, with no X-Robots-Tag alongside it. Pairing the two
	 * is self-defeating: a disallowed path is never crawled, so a noindex header
	 * on it is never read, and the URL can still surface with no way to suppress
	 * it. Nothing links to these files, so Disallow is the right single control.
	 */
	const body = `User-agent: *
Allow: /
Disallow: /r/

Sitemap: ${SITE_URL}/sitemap.xml
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain' }
	});
};
