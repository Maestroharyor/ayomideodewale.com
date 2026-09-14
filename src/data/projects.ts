import type { Project } from '../types';

/**
 * Ordered so the four `featured` entries the home page shows are the three live
 * products with real users plus the newest commercial build.
 *
 * Tutorial-tier work (a text editor, a guess-the-number game, a recipe app) is
 * deliberately absent: with 7+ years behind it, that work lowers the perceived
 * ceiling of everything above it.
 */
export const projects: Project[] = [
	{
		id: 20,
		title: 'MosesTab',
		desc: 'Church management software: members, events, attendance, child check-in and online giving, with Stripe Connect payouts per church and SMS text-to-give over Twilio',
		img: '/projects/mosestab.webp',
		link: 'https://mosestab.com',
		caseStudy: 'mosestab',
		featured: true,
		tags: ['ReactJS', 'TypeScript', 'TanStack Router', 'NextJS', 'TailwindCSS', 'Stripe']
	},
	{
		id: 21,
		title: 'BringVan',
		desc: 'A UK moving-company directory built on programmatic SEO: thousands of generated location and company pages, faceted search by area and rating, and contact-click attribution',
		img: '/projects/bringvan.webp',
		link: 'https://bringvan.com',
		caseStudy: 'bringvan',
		featured: true,
		tags: ['NextJS', 'ReactJS', 'TypeScript', 'TailwindCSS', 'SEO']
	},
	{
		id: 1,
		title: 'Braandly',
		desc: 'A multi-tenant brand management platform for teams and agencies. Workspace-scoped brands, guidelines, docs, projects and link-in-bio pages, with a public REST API, a self-built OAuth 2.1 server and an MCP server on top',
		img: '/projects/braandly.webp',
		link: 'https://braandly.com',
		caseStudy: 'braandly',
		featured: true,
		tags: ['ReactJS', 'NextJS', 'TailwindCSS', 'NodeJS', 'ExpressJS', 'MongoDB']
	},
	{
		id: 15,
		title: 'VKT Bougie',
		desc: 'A SvelteKit storefront for premium designer bags: server-side faceted search, variant selection with per-variant stock, Paystack checkout, and state-level Nigerian delivery pricing. Reads the DailyOS catalog and calls its storefront API for orders',
		img: '/projects/vktbougie.webp',
		link: 'https://vktbougie.com',
		featured: true,
		caseStudy: 'vkt-bougie',
		tags: ['Svelte', 'SvelteKit', 'TypeScript', 'TailwindCSS', 'Prisma', 'Supabase', 'Paystack']
	},
	{
		id: 25,
		title: 'Xedla Pay',
		desc: 'A Nigerian payments product: wallets, transfers on bank rails, bill payments, virtual cards and escrow with dispute resolution. I am the primary author of four of the backend services behind it, and wrote the request-encryption layer shared across its clients. Shipped to the App Store and Play Store',
		img: '/projects/xedla.webp',
		link: 'https://www.xedla.com',
		featured: true,
		caseStudy: 'xedla-pay',
		tags: ['TypeScript', 'NodeJS', 'ExpressJS', 'MongoDB', 'Redis', 'Flutter', 'Docker']
	},
	{
		id: 22,
		title: 'DailyOS',
		desc: 'A multi-tenant retail commerce platform, installable as a PWA: POS, inventory, orders and an offline write queue that survives a dropped connection mid-sale, with a personal finance module alongside. Serves the storefront behind VKT Bougie',
		img: '/projects/dailyos.webp',
		link: 'https://dailyos.foverotechnologies.com',
		github: 'https://github.com/Maestroharyor/dailyos',
		caseStudy: 'dailyos',
		tags: ['NextJS', 'ReactJS', 'TypeScript', 'Prisma', 'Postgres', 'Supabase', 'TailwindCSS']
	},
	{
		id: 26,
		title: 'SkillUp',
		desc: 'Registration, attendance and certification for a three-day, 17-track free training programme. Next.js server actions over Postgres with row-level security, per-track reference numbers issued by a database trigger, and a certificate run batched around a free-tier email cap',
		img: '/projects/fgcc.webp',
		link: 'https://fgccement.org.ng/skillup',
		github: 'https://github.com/Maestroharyor/fgcc-app',
		caseStudy: 'skillup',
		tags: ['NextJS', 'ReactJS', 'TypeScript', 'Supabase', 'Postgres', 'TailwindCSS', 'Vitest']
	},
	{
		id: 27,
		title: 'Fovero Technologies',
		desc: 'Agency site whose real substance is four free tools: a technology recommender with a weighted, category-scoped scoring engine that also explains what it rejected, a website auditor scoring SEO, accessibility, security and performance against the fetched page, and a 116-rule stack fingerprinter',
		img: '/projects/fovero.webp',
		link: 'https://foverotechnologies.com',
		caseStudy: 'fovero-tools',
		tags: ['NextJS', 'ReactJS', 'TypeScript', 'Supabase', 'TailwindCSS', 'Resend']
	},
	{
		id: 28,
		title: 'youtube-scheduler',
		desc: 'Command-line tool for batch-editing metadata and scheduling publish times on your own YouTube channel. The update API overwrites every field in any part you name, so it reads current state first, merges into it, sends the minimum set of parts, and logs every write so a run can be rolled back',
		img: '/projects/youtube-scheduler.webp',
		github: 'https://github.com/Maestroharyor/youtube-scheduler-and-updater',
		caseStudy: 'youtube-scheduler',
		tags: ['Python', 'OAuth', 'CLI', 'GitHub Actions']
	},
	{
		id: 23,
		title: 'tailwind-screen-size',
		desc: 'A development overlay showing the active Tailwind breakpoint and live viewport dimensions. Published on npm across ten releases, with separate React and Svelte builds from one source and a GitHub Actions publish pipeline',
		img: '/projects/tailwind-screen-size.webp',
		link: 'https://www.npmjs.com/package/tailwind-screen-size',
		github: 'https://github.com/Maestroharyor/tailwind-screen-size',
		caseStudy: 'tailwind-screen-size',
		tags: ['TypeScript', 'ReactJS', 'Svelte', 'TailwindCSS', 'npm']
	},
	{
		id: 24,
		title: 'MealFlow',
		desc: 'One meal-planning product built from scratch three times in ten weeks to compare runtimes: React Native and Expo, Flutter with Riverpod and Hive, and a Next.js PWA on Firebase. Same spec, three architectures, no shared code',
		img: '/projects/mealflow.webp',
		link: 'https://meaflow-app.vercel.app',
		github: 'https://github.com/Maestroharyor/Mealflow-flutter',
		caseStudy: 'mealflow',
		tags: ['Flutter', 'React Native', 'NextJS', 'TypeScript', 'Firebase', 'Riverpod']
	},
	{
		id: 2,
		title: 'Jornally',
		desc: 'A long-form publishing platform built 2021 to 2023: a TipTap editor with draft recovery, a threaded comment and reply tree, and topic circles readers join. Next.js against a Laravel API. No longer running',
		img: '/projects/jornally.webp',
		// No link: jornally.com now resolves to an unrelated Spanish HR product that
		// took the domain after this shut down in 2023. Linking it sends visitors
		// to another company. The repo is under the client's account, not mine.
		caseStudy: 'jornally',
		tags: ['ReactJS', 'NextJS', 'TailwindCSS', 'Laravel']
	},
	{
		id: 16,
		title: 'healthcheck-service',
		desc: 'A self-hosted uptime monitor in Go. Checks one endpoint on a schedule and alerts to Slack and email. Written because the hosted options cost more than the thing they were watching',
		img: '/projects/healthcheck-service.webp',
		github: 'https://github.com/MaestroHaryor/healthcheck-service',
		caseStudy: 'healthcheck-service',
		tags: ['Go']
	},
	{
		id: 17,
		title: 'supabase-pings',
		desc: 'A single Go binary that keeps free-tier Supabase projects from pausing, via scheduled pings',
		img: '/projects/supabase-pings.webp',
		github: 'https://github.com/MaestroHaryor/supabase-pings',
		caseStudy: 'supabase-pings',
		tags: ['Go']
	},
	{
		id: 5,
		title: 'Lifetechfacts',
		desc: 'A technology blog I built, ran and wrote for, covering software and consumer tech',
		img: '/projects/lifetechfacts.webp',
		caseStudy: 'lifetechfacts',
		tags: ['NextJS', 'ReactJS', 'TypeScript', 'TailwindCSS', 'WordPress', 'PWA']
	},
	{
		id: 8,
		title: 'FoodMood',
		desc: 'A recipe browser built in Vue: search by dish, browse what is popular, and a rotating pick of the moment',
		img: '/projects/foodmood.webp',
		link: 'https://foodmood-final.vercel.app',
		caseStudy: 'foodmood',
		tags: ['VueJS', 'TailwindCSS']
	},
	{
		id: 3,
		title: 'Virem',
		desc: 'A multivendor marketplace on headless WooCommerce and Dokan: catalogue, per-vendor storefronts, cart, customer accounts and order history, with cash-on-delivery checkout and zone-based local delivery pricing. Built out on a commercial React template',
		img: '/projects/virem.webp',
		// Repo deliberately unlinked: it hardcodes WooCommerce API credentials in
		// client-side code. The work is mine; the repo should not be handed out.
		caseStudy: 'virem',
		tags: ['ReactJS', 'NextJS', 'Bootstrap', 'SASS', 'WordPress', 'NodeJS']
	},
	{
		id: 7,
		title: 'Ayomideodewale.com',
		desc: 'This site. SvelteKit and Tailwind on Vercel, with the resume built from a single dataset into five PDF variants by headless Chrome',
		img: '/projects/maestro-website.webp',
		link: 'https://ayomideodewale.com',
		github: 'https://github.com/Maestroharyor/ayomideodewale.com',
		caseStudy: 'ayomideodewale-com',
		tags: ['Svelte', 'SvelteKit', 'TailwindCSS']
	}
];
