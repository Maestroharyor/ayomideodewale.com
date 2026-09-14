/**
 * The email templates read from the site's own source of truth at build time.
 *
 * This is the whole point of generating them rather than hand-writing HTML: the
 * previous template hardcoded its links, so it went on pointing at twitter.com
 * and the wrong Instagram handle long after both were corrected on the site.
 */
import { socialMenu } from '../src/data/menu.js';
import { SITE_NAME, SITE_URL } from '../src/data/site.js';

export { socialMenu, SITE_NAME, SITE_URL };

/**
 * The bare domain, for the notification subject and its matching heading.
 *
 * Derived rather than typed out, and exported from here rather than computed in
 * the build script, because the subject and the heading inside the email have to
 * agree. They did not: the subject was updated to name the site and the heading
 * went on saying "New message from the site".
 */
export const SITE_HOST = new URL(SITE_URL).host.replace(/^www\./, '');

/** Mirrors the --color-* tokens in src/app.css. */
export const colors = {
	primary: '#42489e',
	primaryDark: '#20234d',
	accent: '#0c56d0',
	ink: '#1f2330',
	muted: '#5b6072',
	line: '#e3e4f0',
	page: '#f4f4f7',
	card: '#ffffff'
} as const;

/** Icon filenames in static/email, keyed by the social title in menu.ts. */
export const socialIconFile: Record<string, string> = {
	Braandly: 'braandly.png',
	GitHub: 'github.png',
	LinkedIn: 'linkedin.png',
	X: 'x.png',
	Instagram: 'instagram.png',
	TikTok: 'tiktok.png',
	Facebook: 'facebook.png'
};

/**
 * Placeholders the runtime fills. Written as constants so a rename is a compile
 * error in the templates rather than a literal "{{name}}" in someone's inbox.
 */
export const TOKEN = {
	name: '{{name}}',
	email: '{{email}}',
	message: '{{message}}',
	origin: '{{origin}}'
} as const;
