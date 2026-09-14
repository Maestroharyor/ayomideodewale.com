import type { Menus } from '../types';

export const homeMenuData: Menus[] = [
	{
		title: 'Home',
		link: '/',
		hasSubmenu: false
	},
	{
		// Root-relative, so the href stays correct even if the entry is ever
		// rendered off the home page. `isHomeLink` currently hides it there.
		title: 'About',
		link: '/#about',
		hasSubmenu: false,
		isHomeLink: true
	},
	{
		title: 'Experience',
		link: '/#experience',
		hasSubmenu: false,
		isHomeLink: true
	},
	{
		title: 'Projects',
		link: '/projects',
		hasSubmenu: false
	},
	{
		title: 'Designs',
		link: '/designs',
		hasSubmenu: false
	},
	{
		title: 'My Resume',
		link: '/resume',
		hasSubmenu: false
	}
];

export const footerMenu: Menus[] = [
	{
		title: 'Home',
		link: '/',
		hasSubmenu: false
	},
	{
		// Root-relative on purpose: the footer renders on every route, so a bare
		// '#experience' resolved to /projects#experience and went nowhere.
		title: 'Experience',
		link: '/#experience',
		hasSubmenu: false
	},
	{
		title: 'Projects',
		link: '/projects',
		hasSubmenu: false
	},
	{
		title: 'Designs',
		link: '/designs',
		hasSubmenu: false
	},
	{
		title: 'My Resume',
		link: '/resume',
		hasSubmenu: false
	},
	{
		/**
		 * Footer only, deliberately. /cloud was in the sitemap but linked from
		 * nowhere, which is how a page gets crawled last and ranked lowest. It
		 * stays out of the header so the primary nav keeps reading as fullstack
		 * rather than leading with an infrastructure specialism.
		 */
		title: 'Cloud & Platform',
		link: '/cloud',
		hasSubmenu: false
	},
	{
		title: 'Get in Touch',
		link: '/contact',
		hasSubmenu: false
	}
];

/**
 * The single source of truth for every profile this site claims as mine.
 * `SOCIAL_PROFILES` in site.ts is derived from it, so the footer links and the
 * `sameAs` array in the Person schema cannot disagree — they did, and Facebook
 * was linked from every page while being absent from the structured data.
 *
 * Facebook is deliberately absent from both now: it is a personal profile, and
 * `sameAs` is the property recruiters and Google's entity pipeline follow.
 */
export const socialMenu: Menus[] = [
	{
		title: 'Braandly',
		link: 'https://www.braandly.bio/ayomideodewale',
		hasSubmenu: false,
		external: true
	},
	{
		title: 'GitHub',
		link: 'https://github.com/MaestroHaryor',
		hasSubmenu: false,
		external: true
	},
	{
		title: 'LinkedIn',
		link: 'https://www.linkedin.com/in/ayomide-odewale',
		hasSubmenu: false,
		external: true
	},
	{
		// x.com, not twitter.com: the handle is @maestroharyor on every platform
		// and the old domain only survives as a redirect.
		title: 'X',
		link: 'https://x.com/maestroharyor',
		hasSubmenu: false,
		external: true
	},
	{
		title: 'Instagram',
		link: 'https://instagram.com/maestroharyor',
		hasSubmenu: false,
		external: true
	},
	{
		title: 'TikTok',
		link: 'https://www.tiktok.com/@maestroharyor',
		hasSubmenu: false,
		external: true
	}
];
