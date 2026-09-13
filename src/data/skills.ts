import type { Skill } from '../types';

/**
 * Both lists are grouped by layer, which is the order the grid reads in:
 * languages, frontend, backend, data, cloud, mobile, design. That grouping is
 * the point of the section. The list used to stop at frontend plus Terraform
 * and named no database at all, which read as a frontend developer who had
 * picked up some infrastructure.
 */

/**
 * The short list shown by default: the pitch, not the record. Everything here
 * is something to be hired for today, and everything here is backed by shipped
 * work in projects.ts or roles.ts.
 */
export const skillsSummary: Skill[] = [
	{ skill: 'TypeScript', src: '/svgs/typescript.svg' },
	{ skill: 'Go', src: '/svgs/go.svg' },
	{ skill: 'Python', src: '/svgs/python.svg' },

	{ skill: 'React', src: '/svgs/react.svg' },
	{ skill: 'NextJS', src: '/svgs/nextjs.svg' },
	{ skill: 'Svelte', src: '/svgs/svelte.svg' },
	{ skill: 'TailwindCSS', src: '/svgs/tailwindcss.svg' },

	{ skill: 'NodeJS', src: '/svgs/nodejs.svg' },
	{ skill: 'ExpressJS', src: '/svgs/express.svg' },
	{ skill: 'Bun', src: '/svgs/bun.svg' },
	{ skill: 'Django', src: '/svgs/django.svg' },

	{ skill: 'Postgres', src: '/svgs/postgres.svg' },
	{ skill: 'MongoDB', src: '/svgs/mongodb.svg' },

	{ skill: 'AWS', src: '/svgs/aws.svg' },
	{ skill: 'Terraform', src: '/svgs/terraform.svg' },
	{ skill: 'Docker', src: '/svgs/docker.svg' },

	{ skill: 'React Native', src: '/svgs/react_native.svg' },
	{ skill: 'Flutter', src: '/svgs/flutter.svg' },

	{ skill: 'Figma', src: '/svgs/figma.svg' }
];

/**
 * The full list: the summary plus the tools that are real but not what to lead
 * with. Vue and Firebase sit here rather than above because neither is current.
 *
 * Deliberately absent: HTML and CSS, which are assumed at this point and were
 * taking the first two slots; Dart, which is redundant beside Flutter; and the
 * PHP, Laravel, Angular, Ionic and WordPress work, which the resumes carry with
 * the role context that explains it.
 */
export const skillsFull: Skill[] = [
	{ skill: 'JavaScript', src: '/svgs/javascript.svg' },
	{ skill: 'TypeScript', src: '/svgs/typescript.svg' },
	{ skill: 'Go', src: '/svgs/go.svg' },
	{ skill: 'Python', src: '/svgs/python.svg' },

	{ skill: 'React', src: '/svgs/react.svg' },
	{ skill: 'NextJS', src: '/svgs/nextjs.svg' },
	{ skill: 'Vue', src: '/svgs/vue.svg' },
	{ skill: 'Svelte', src: '/svgs/svelte.svg' },
	{ skill: 'TailwindCSS', src: '/svgs/tailwindcss.svg' },

	{ skill: 'NodeJS', src: '/svgs/nodejs.svg' },
	{ skill: 'ExpressJS', src: '/svgs/express.svg' },
	{ skill: 'Bun', src: '/svgs/bun.svg' },
	{ skill: 'Django', src: '/svgs/django.svg' },

	{ skill: 'Postgres', src: '/svgs/postgres.svg' },
	{ skill: 'MongoDB', src: '/svgs/mongodb.svg' },
	{ skill: 'Redis', src: '/svgs/redis.svg' },
	{ skill: 'Prisma', src: '/svgs/prisma.svg' },
	{ skill: 'Supabase', src: '/svgs/supabase.svg' },
	{ skill: 'Firebase', src: '/svgs/firebase.svg' },

	{ skill: 'AWS', src: '/svgs/aws.svg' },
	{ skill: 'Terraform', src: '/svgs/terraform.svg' },
	{ skill: 'Docker', src: '/svgs/docker.svg' },
	{ skill: 'GitHub Actions', src: '/svgs/github_actions.svg' },

	{ skill: 'React Native', src: '/svgs/react_native.svg' },
	{ skill: 'Flutter', src: '/svgs/flutter.svg' },

	{ skill: 'Figma', src: '/svgs/figma.svg' }
];
