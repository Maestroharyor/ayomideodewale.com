import type { ResumeVariant, ResumeVariantId } from '../../types';

/**
 * A variant carries only what genuinely differs between versions: the title
 * line, the summary, how skills are grouped, which roles appear and in what
 * order, and which projects are worth the space.
 *
 * Per-role bullets are NOT here — they live on the role in roles.ts, because a
 * bullet is a property of the job rather than of the pitch.
 */
export const resumeVariants: Record<ResumeVariantId, ResumeVariant> = {
	fullstack: {
		id: 'fullstack',
		titleLine: 'Fullstack Software Engineer',
		summary:
			'Fullstack engineer with 7+ years building and operating production systems, mostly in fintech. Experience spans multi-tenant SaaS architecture, payment and transaction systems, and the infrastructure that runs them. Currently building the learning platform behind an 11-campus academy in Tokyo, with AWS Solutions Architect Associate in progress.',
		skills: [
			{ label: 'Languages', items: ['TypeScript', 'JavaScript', 'Go', 'Python', 'PHP'] },
			{
				label: 'Frontend',
				items: ['React', 'Next.js', 'Vue', 'Svelte / SvelteKit', 'TailwindCSS']
			},
			{ label: 'Backend', items: ['Node.js', 'Express', 'Django', 'REST', 'GraphQL'] },
			{ label: 'Data', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma'] },
			{
				label: 'Cloud & Infrastructure',
				items: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'Vercel', 'DigitalOcean']
			}
		],
		projectNames: ['MosesTab', 'Braandly', 'BringVan', 'healthcheck-service'],
		pdfName: 'resume',
		meta: {
			title: 'Resume — Ayomide Odewale, Fullstack Engineer',
			description:
				'Resume of Ayomide Odewale, a fullstack engineer with 7+ years across fintech and enterprise platforms. TypeScript, Node, React, Go, AWS.'
		},
		canonical: true
	},

	backend: {
		id: 'backend',
		titleLine: 'Senior Backend Engineer',
		summary:
			'Backend engineer with 7+ years designing and operating server-side systems, mostly in fintech. Experience across REST and GraphQL API design, payment and transaction processing, relational and document data modelling, and the AWS infrastructure underneath. Built platforms serving 10,000+ and 15,000+ active users.',
		skills: [
			{ label: 'Languages', items: ['TypeScript', 'JavaScript', 'Go', 'Python', 'PHP'] },
			{
				label: 'Backend',
				items: ['Node.js', 'Express', 'Django', 'Django REST', 'GraphQL', 'REST']
			},
			{ label: 'Data', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma'] },
			{
				label: 'Cloud & Infrastructure',
				items: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'DigitalOcean']
			},
			{ label: 'Frontend', items: ['React', 'Next.js', 'Vue'] }
		],
		projectNames: ['MosesTab', 'Braandly', 'healthcheck-service', 'supabase-pings'],
		pdfName: 'resume-backend',
		meta: {
			title: 'Resume — Ayomide Odewale, Backend Engineer',
			description:
				'Resume of Ayomide Odewale, a backend engineer with 7+ years across fintech and enterprise platforms.'
		},
		canonical: false
	},

	frontend: {
		id: 'frontend',
		titleLine: 'Senior Frontend Engineer',
		summary:
			'Frontend engineer with 7+ years shipping production interfaces, mostly in fintech and enterprise software. Experience across React, Next.js and Vue, reusable component libraries adopted by multiple product teams, and real-time collaborative interfaces. Comfortable owning the API layer the interface depends on.',
		skills: [
			{ label: 'Languages', items: ['TypeScript', 'JavaScript'] },
			{
				label: 'Frameworks',
				items: ['React', 'Next.js', 'Vue', 'Svelte / SvelteKit', 'Angular', 'React Native']
			},
			{ label: 'Styling', items: ['TailwindCSS', 'SCSS', 'Bootstrap', 'Figma'] },
			{ label: 'Backend integration', items: ['REST', 'GraphQL', 'Node.js', 'Express'] },
			{ label: 'Cloud & Tooling', items: ['AWS', 'Docker', 'GitHub Actions', 'Vercel', 'Git'] }
		],
		projectNames: ['MosesTab', 'Braandly', 'BringVan'],
		pdfName: 'resume-frontend',
		meta: {
			title: 'Resume — Ayomide Odewale, Frontend Engineer',
			description:
				'Resume of Ayomide Odewale, a frontend engineer with 7+ years across fintech and enterprise platforms.'
		},
		canonical: false
	},

	mobile: {
		id: 'mobile',
		titleLine: 'Mobile Application Engineer',
		summary:
			'Mobile engineer with 7+ years building cross-platform applications in Flutter and React Native, alongside the fullstack work behind them. Shipped mobile experiences for fintech platforms serving 10,000+ and 15,000+ users, and currently ships a Flutter payments client on a concurrent contract.',
		skills: [
			{ label: 'Languages', items: ['TypeScript', 'JavaScript', 'Dart', 'Go'] },
			{ label: 'Mobile', items: ['Flutter', 'React Native', 'Ionic', 'Expo'] },
			{ label: 'Backend integration', items: ['REST', 'GraphQL', 'Node.js', 'Firebase'] },
			{ label: 'Frontend', items: ['React', 'Next.js', 'Vue', 'TailwindCSS'] },
			{ label: 'Cloud & Tooling', items: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'Git'] }
		],
		projectNames: ['Meal Flow', 'MosesTab', 'Braandly'],
		pdfName: 'resume-mobile',
		meta: {
			title: 'Resume — Ayomide Odewale, Mobile Engineer',
			description:
				'Resume of Ayomide Odewale, a mobile engineer building cross-platform applications in Flutter and React Native.'
		},
		canonical: false
	},

	cloud: {
		id: 'cloud',
		titleLine: 'Fullstack & Platform Engineer',
		summary:
			'Fullstack engineer with 7+ years building and operating production systems, primarily in fintech. Experience spans multi-tenant SaaS architecture, payment and transaction systems, and the infrastructure that runs them: AWS managed with Terraform, Docker, CI pipelines and self-hosted monitoring written in Go. Currently specialising in cloud architecture and security, with AWS Solutions Architect Associate in progress.',
		skills: [
			{
				label: 'Cloud & Infrastructure',
				items: [
					'AWS (S3, EC2, ECS, IAM, VPC)',
					'Terraform',
					'Docker',
					'GitHub Actions',
					'Vercel',
					'DigitalOcean'
				]
			},
			{ label: 'Languages', items: ['TypeScript', 'JavaScript', 'Go', 'Python', 'PHP'] },
			{ label: 'Backend', items: ['Node.js', 'Express', 'Django', 'REST', 'GraphQL'] },
			{ label: 'Data', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma'] },
			{
				label: 'Security',
				items: [
					'IAM and least-privilege design',
					'Payment flow security',
					'Dependency and supply-chain hygiene'
				]
			}
		],
		// Xedla leads the infrastructure claim, so it is ordered ahead of the
		// application-heavy roles rather than sitting purely by date.
		roleIds: [
			'kikokushijo',
			'xedla',
			'bposeats',
			'helppo',
			'summitech',
			'veendhq',
			'fovero',
			'new-horizons'
		],
		projectNames: ['MosesTab', 'Braandly', 'healthcheck-service', 'supabase-pings'],
		pdfName: 'resume-cloud',
		meta: {
			title: 'Resume — Ayomide Odewale, Platform & Cloud Engineer',
			description:
				'Resume of Ayomide Odewale, a fullstack and platform engineer. AWS with Terraform, Docker, CI, and self-hosted monitoring in Go.'
		},
		canonical: false
	}
};

export const resumeVariantIds = Object.keys(resumeVariants) as ResumeVariantId[];

export const canonicalVariant = resumeVariants.fullstack;
