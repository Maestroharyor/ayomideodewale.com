import type { Design } from '../types';

/**
 * Dribbble shots, not shipped product screens. The descriptions say what each
 * one is and stop: the previous copy called Braandly "revolutionary branding
 * software that empowers businesses of all sizes", which is marketing language
 * for a page whose whole job is to show the work.
 */
export const designs: Design[] = [
	{
		label: 'Data Mirror Mobile App',
		image: '/designs/data_mirror.png',
		link: 'https://dribbble.com/shots/21991067-Data-Mirror-Mobile-App-Design',
		desc: 'A mobile app for tracking data usage and connection speed. Concept work: usage breakdowns, a speed test and per-app limits.'
	},
	{
		label: 'Lifetechfacts Blog',
		image: '/designs/lifetechfacts.png',
		link: 'https://dribbble.com/shots/21991051-Lifetechfacts-Blog-UI-Design',
		desc: 'The blog I write and run. Article layout, category browsing and the reading view.'
	},
	{
		label: 'Braandly SaaS',
		image: '/designs/braandly.png',
		link: 'https://dribbble.com/shots/21990981-Braandly-SaaS-UI-Design',
		desc: 'The interface for Braandly, before it was built. Brand workspaces, asset collections and the guideline editor.'
	}
];
