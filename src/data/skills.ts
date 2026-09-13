import type { Skill } from '../types';

/**
 * The short list shown by default. These are the tools currently in use, in
 * roughly the order they matter to the roles being targeted — TypeScript and Go
 * first, then the platform tooling. The longer list below keeps the full
 * history, including things no longer reached for every day.
 */
export const skillsSummary: Skill[] = [
	{ skill: 'TypeScript', src: '/svgs/typescript.svg' },
	{ skill: 'React', src: '/svgs/react.svg' },
	{ skill: 'NextJS', src: '/svgs/nextjs.svg' },
	{ skill: 'Vue', src: '/svgs/vue.svg' },
	{ skill: 'Svelte', src: '/svgs/svelte.svg' },
	{ skill: 'NodeJS', src: '/svgs/nodejs.svg' },
	{ skill: 'Bun', src: '/svgs/bun.svg' },
	{ skill: 'Go', src: '/svgs/go.svg' },
	{ skill: 'Terraform', src: '/svgs/terraform.svg' },
	{ skill: 'Docker', src: '/svgs/docker.svg' },
	{ skill: 'React Native', src: '/svgs/react_native.svg' },
	{ skill: 'Flutter', src: '/svgs/flutter.svg' },
	{ skill: 'Python', src: '/svgs/python.svg' },
	{ skill: 'Django', src: '/svgs/django.svg' },
	{ skill: 'Figma', src: '/svgs/figma.svg' }
];

export const skillsFull: Skill[] = [
	{
		skill: 'HTML',
		src: '/svgs/html.svg'
	},
	{
		skill: 'CSS',
		src: '/svgs/css.svg'
	},
	{
		skill: 'JavaScript',
		src: '/svgs/javascript.svg'
	},
	{
		skill: 'TypeScript',
		src: '/svgs/typescript.svg'
	},
	{
		skill: 'Go',
		src: '/svgs/go.svg'
	},
	{
		skill: 'Python',
		src: '/svgs/python.svg'
	},
	{
		skill: 'Bootstrap',
		src: '/svgs/bootstrap.svg'
	},
	{
		skill: 'TailwindCSS',
		src: '/svgs/tailwindcss.svg'
	},
	{
		skill: 'SASS',
		src: '/svgs/sass.svg'
	},
	{
		skill: 'React',
		src: '/svgs/react.svg'
	},
	{
		skill: 'NextJS',
		src: '/svgs/nextjs.svg'
	},
	{
		skill: 'Vue',
		src: '/svgs/vue.svg'
	},
	{
		skill: 'Svelte',
		src: '/svgs/svelte.svg'
	},
	{
		skill: 'NodeJS',
		src: '/svgs/nodejs.svg'
	},
	{
		skill: 'Bun',
		src: '/svgs/bun.svg'
	},
	{
		skill: 'Django',
		src: '/svgs/django.svg'
	},
	{
		skill: 'Firebase',
		src: '/svgs/firebase.svg'
	},
	{
		skill: 'React Native',
		src: '/svgs/react_native.svg'
	},
	{
		skill: 'Flutter',
		src: '/svgs/flutter.svg'
	},
	{
		skill: 'Dart',
		src: '/svgs/dart.svg'
	},
	{
		skill: 'Terraform',
		src: '/svgs/terraform.svg'
	},
	{
		skill: 'Docker',
		src: '/svgs/docker.svg'
	},
	{
		skill: 'Figma',
		src: '/svgs/figma.svg'
	}
	// AWS is out of both lists on purpose: it is a cloud provider, not a tech
	// stack, and this section names stacks. It appears in the resume skills,
	// on /cloud and in project tags, which is where it belongs.
	//
	// Solidity is deliberately out: no current or recent work backs it, and it
	// pulls against the fullstack/platform read the rest of the site is making.
	// The icon is still at /svgs/solidity.svg if it should come back.
];
