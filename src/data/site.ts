import { socialMenu } from './menu';

/**
 * Canonical origin. The apex 308-redirects to www, so www is the form that
 * should appear in canonical tags, Open Graph URLs and the sitemap.
 *
 * Open Graph requires absolute URLs — relative ones are simply ignored, which
 * is why link previews were broken everywhere the site got pasted.
 */
export const SITE_URL = 'https://www.ayomideodewale.com';

export const SITE_NAME = 'Ayomide Odewale';

export const SITE_LOCALE = 'en_US';

/** Used for twitter:site and twitter:creator. Same handle on every platform. */
export const TWITTER_HANDLE = '@MaestroHaryor';

/**
 * 58 characters, which fits the title slot without truncation. The three
 * technologies deliberately span three bands — TypeScript is fullstack, Go is
 * backend and platform, AWS is infrastructure — rather than three names from
 * one ecosystem, which read as a narrower engineer than the work shows.
 */
export const DEFAULT_TITLE = 'Ayomide Odewale — Fullstack Engineer (TypeScript, Go, AWS)';

/**
 * 154 characters. The previous description ran to 170 and lost its last clause
 * to Google's truncation. The semicolons group the stack into three tiers so it
 * scans as structure rather than one long list.
 */
export const DEFAULT_DESCRIPTION =
	'Fullstack engineer, 7 years in fintech and enterprise platforms. TypeScript, Go and Python; Node, React and Next.js; AWS and Terraform. Remote from Lagos.';

export const JOB_TITLE = 'Fullstack Engineer';

/**
 * Where the breadth actually belongs. The title has room for three technologies
 * and the description for a handful; `knowsAbout` has no length limit and no
 * truncation, and it is the property search engines read for topical range.
 */
export const KNOWS_ABOUT = [
	'TypeScript',
	'JavaScript',
	'Go',
	'Python',
	'Node.js',
	'Express',
	'Django',
	'React',
	'Next.js',
	'Svelte',
	'PostgreSQL',
	'MongoDB',
	'AWS',
	'Terraform',
	'Docker',
	'CI/CD',
	'Flutter'
];

/**
 * 1200x630, which is what LinkedIn, X, Slack and iMessage expect. The previous
 * card was 582x371 and was being upscaled roughly 2x wherever the site got
 * pasted. Regenerate with `node scripts/build-og-image.mjs` after changing the
 * name, the availability line or the portrait.
 */
export const OG_IMAGE = `${SITE_URL}/og/default.png`;

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_TYPE = 'image/png';

/**
 * Square portrait for `Person.image`. Deliberately not og_image.png, which is a
 * 1.91:1 card rather than a portrait, and not profile.webp, which is 1024px and
 * larger than entity imagery needs.
 */
export const PROFILE_IMAGE = `${SITE_URL}/personal/profile-512.webp`;
export const PROFILE_IMAGE_SIZE = 512;

/**
 * Shown as a badge in the hero. The first thing a recruiter landing cold needs
 * to know, and it was nowhere on the page. One constant so the site, and later
 * the resume header, cannot disagree about it.
 */
export const AVAILABILITY = 'Open to roles · Lagos, UTC+1';

export const LOCATION = { locality: 'Lagos', country: 'NG' } as const;

/**
 * Derived from socialMenu rather than maintained alongside it. The two lists had
 * drifted — Facebook was in the footer and missing from `sameAs` — and one of
 * them being computed is what stops that recurring.
 */
export const SOCIAL_PROFILES = socialMenu.map((profile) => profile.link);

/** Absolute URL for a root-relative path. */
export const absoluteUrl = (path: string) => new URL(path, SITE_URL).href;
