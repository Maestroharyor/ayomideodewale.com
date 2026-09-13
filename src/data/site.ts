/**
 * Canonical origin. The apex 308-redirects to www, so www is the form that
 * should appear in canonical tags, Open Graph URLs and the sitemap.
 *
 * Open Graph requires absolute URLs — relative ones are simply ignored, which
 * is why link previews were broken everywhere the site got pasted.
 */
export const SITE_URL = 'https://www.ayomideodewale.com';

export const SITE_NAME = 'Ayomide Odewale';

export const DEFAULT_TITLE = 'Ayomide Odewale — Fullstack Engineer (TypeScript, Node, React)';

export const DEFAULT_DESCRIPTION =
	'Fullstack engineer with 7+ years across fintech and enterprise platforms. TypeScript, Node, React, Next.js, Go, AWS. Based in Lagos, working remotely with teams worldwide.';

export const OG_IMAGE = `${SITE_URL}/personal/og_image.png`;

export const SOCIAL_PROFILES = [
	'https://github.com/MaestroHaryor',
	'https://www.linkedin.com/in/ayomide-odewale',
	'https://x.com/maestroharyor',
	'https://instagram.com/maestroharyor',
	'https://www.tiktok.com/@maestroharyor',
	'https://www.braandly.bio/ayomideodewale'
];

/** Absolute URL for a root-relative path. */
export const absoluteUrl = (path: string) => new URL(path, SITE_URL).href;
