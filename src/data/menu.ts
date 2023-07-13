import type { Menus } from '../types';

export const homeMenuData: Menus[] = [
	{
		title: 'Home',
		link: '/',
		hasSubmenu: false
	},
	{
		title: 'About',
		link: '#about',
		hasSubmenu: false,
		isHomeLink: true
	},
	{
		title: 'Experience',
		link: '#experience',
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
		title: 'Experience',
		link: '#experience',
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
		link: '/designs',
		hasSubmenu: false
	},
	{
		title: 'Get in Touch',
		link: '/contact',
		hasSubmenu: false
	},
	{
		title: 'My Blog',
		link: 'https://thelifetechfacts.com',
		hasSubmenu: false,
		external: true
	}
];
export const socialMenu: Menus[] = [
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
		title: 'Twitter',
		link: 'https://twitter.com/MaestroHaryor',
		hasSubmenu: false,
		external: true
	},
	{
		title: 'Facebook',
		link: 'https://web.facebook.com/ayomide.odewale.125',
		hasSubmenu: false,
		external: true
	},
	{
		title: 'Instagram',
		link: 'https://instagram.com/maestroharyorjoshua',
		hasSubmenu: false,
		external: true
	},
	{
		title: 'Blog',
		link: 'https://thelifetechfacts.com',
		hasSubmenu: false,
		external: true
	}
];
