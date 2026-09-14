/**
 * Logo for a technology name, or `undefined` when there is no mark for it.
 *
 * The case studies name 49 distinct technologies and `static/svgs` holds marks
 * for about twenty. Rather than draw thirty more or drop the idea, a chip shows
 * a logo when one exists and reads as text when it does not — which is also the
 * honest outcome, since the ones without marks are mostly libraries and APIs
 * that have no widely recognised logo anyway.
 *
 * Keys are normalised, so 'NextJS', 'Next.js' and 'nextjs' all resolve.
 */
const LOGOS: Record<string, string> = {
	angular: 'angular',
	aws: 'aws',
	bootstrap: 'bootstrap',
	bun: 'bun',
	css: 'css',
	dart: 'dart',
	django: 'django',
	docker: 'docker',
	express: 'express',
	expressjs: 'express',
	figma: 'figma',
	firebase: 'firebase',
	flutter: 'flutter',
	githubactions: 'github_actions',
	go: 'go',
	golang: 'go',
	html: 'html',
	javascript: 'javascript',
	mongodb: 'mongodb',
	next: 'nextjs',
	nextjs: 'nextjs',
	node: 'nodejs',
	nodejs: 'nodejs',
	postgres: 'postgres',
	postgresql: 'postgres',
	prisma: 'prisma',
	python: 'python',
	react: 'react',
	reactjs: 'react',
	reactnative: 'react_native',
	redis: 'redis',
	sass: 'sass',
	scss: 'sass',
	supabase: 'supabase',
	svelte: 'svelte',
	sveltekit: 'svelte',
	tailwindcss: 'tailwindcss',
	terraform: 'terraform',
	typescript: 'typescript',
	vue: 'vue',
	vuejs: 'vue'
};

/** Lowercases and drops dots, spaces and hyphens: 'Next.js' -> 'nextjs'. */
const normalise = (name: string) => name.toLowerCase().replace(/[\s.\-_]/g, '');

export function stackLogo(name: string): string | undefined {
	const file = LOGOS[normalise(name)];
	return file ? `/svgs/${file}.svg` : undefined;
}

/**
 * Marks that are solid black and vanish on a dark background. Same set the
 * skills grid inverts, for the same reason.
 */
const MONOCHROME = new Set(['nextjs', 'next', 'express', 'expressjs', 'prisma']);

export function stackNeedsInvert(name: string): boolean {
	return MONOCHROME.has(normalise(name));
}
