import type {
	ResumeCertification,
	ResumeContact,
	ResumeEducation,
	ResumeProject
} from '../../types';

/**
 * Blocks every variant shares. Defined once here and injected by buildResume,
 * so a variant never restates them.
 */

export const resumeContact: ResumeContact = {
	name: 'Ayomide Odewale',
	location: 'Lagos, Nigeria · Open to remote (UTC+1)',
	// Deliberately the Gmail address. ayomideodewale.com has no MX records (last
	// checked 2026-09-13), so ayomide@ayomideodewale.com would silently drop
	// everything sent to it. Switch only once mail is configured on the domain;
	// Cloudflare Email Routing is enough, it just needs the MX records to exist.
	email: 'ayomide.odewale1@gmail.com',
	phone: '+234 903 245 4463',
	website: 'ayomideodewale.com',
	// In the header, not a trailing LINKS block: in all four previous PDFs that
	// heading rendered at the foot of the page while the URLs appeared mid-document.
	links: [
		{
			label: 'GitHub',
			href: 'https://github.com/maestroharyor',
			display: 'github.com/maestroharyor'
		},
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/ayomide-odewale',
			display: 'linkedin.com/in/ayomide-odewale'
		}
	]
};

export const resumeEducation: ResumeEducation[] = [
	{
		institution: 'University of Ilorin, Nigeria',
		credential: 'B.Sc. Physiology',
		year: '2019'
	}
];

/**
 * The four MTA certificates are deliberately absent. Microsoft retired the
 * programme in 2022, so entry-level credentials with nothing since date the
 * section rather than strengthen it.
 */
export const resumeCertifications: ResumeCertification[] = [
	{ name: 'AWS Solutions Architect Associate (SAA-C03)', status: 'In progress' },
	{ name: 'CompTIA Security+', status: 'Planned' },
	{ name: 'AWS Security Specialty', status: 'Planned' }
];

/**
 * Braandly and MosesTab live here rather than in Experience. The facts are the
 * same either way, but a founder role sitting next to a full-time one in
 * Experience reads as two employers; in Projects it reads as an engineer who
 * builds things, which is a positive signal almost everywhere.
 */
export const resumeProjects: ResumeProject[] = [
	{
		name: 'MosesTab',
		summary:
			'Tenant-scoped church management SaaS: members, events, attendance, child check-in and giving. Per-church Stripe Connect accounts and payouts, and SMS text-to-give over Twilio.',
		stacks: ['React', 'TypeScript', 'Next.js', 'Stripe'],
		href: 'https://mosestab.com'
	},
	{
		name: 'Braandly',
		summary:
			'Multi-tenant brand management SaaS. Workspace-scoped data across 85 models, a versioned public REST API, a self-built OAuth 2.1 server and an MCP server exposing 102 tools. Sole author of the backend; I build and operate it end to end.',
		stacks: ['Next.js', 'Express', 'MongoDB', 'Redis'],
		href: 'https://braandly.com'
	},
	{
		name: 'BringVan',
		summary:
			'UK moving-company directory built on programmatic SEO: generated location and company pages, faceted search, and contact-click attribution.',
		stacks: ['Next.js'],
		href: 'https://bringvan.com'
	},
	{
		name: 'healthcheck-service',
		summary:
			'Self-hosted uptime monitor in Go. Checks one endpoint on a schedule and alerts to Slack and email.',
		stacks: ['Go'],
		href: 'https://github.com/MaestroHaryor/healthcheck-service'
	},
	{
		name: 'supabase-pings',
		summary:
			'Single Go binary that keeps free-tier Supabase projects from pausing via scheduled pings.',
		stacks: ['Go'],
		href: 'https://github.com/MaestroHaryor/supabase-pings'
	},
	{
		name: 'DailyOS',
		summary:
			'Personal operations platform: finance tracking, meal planning and a full retail commerce module (POS, inventory, orders), as an installable PWA. Doubles as the commerce backend for VKT Bougie.',
		stacks: ['Next.js', 'React', 'Prisma', 'Postgres'],
		href: 'https://dailyos.foverotechnologies.com'
	},
	{
		name: 'Meal Flow',
		summary:
			'The same product built twice, in React Native and in Flutter, as a direct comparison of the two toolchains.',
		stacks: ['React Native', 'Flutter'],
		href: 'https://github.com/Maestroharyor/Meal-Flow'
	}
];
