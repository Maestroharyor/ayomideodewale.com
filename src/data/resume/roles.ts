import type { ResumeRole } from '../../types';

/**
 * The single source of truth for work history.
 *
 * Dates and canonical titles follow LinkedIn, because that is the surface a
 * recruiter cross-checks a resume against. Where a variant needs different
 * emphasis it declares an explicit override rather than a second spelling.
 *
 * `site` decides whether a role reaches the website's experience grid, which is
 * a curated highlight reel rather than a full employment record.
 *
 * Note the Fovero/VeendHQ pair: Fovero ends Jan 2022 and VeendHQ starts Feb
 * 2022. Moving one without the other opens a phantom gap.
 */
export const resumeRoles: ResumeRole[] = [
	{
		id: 'kikokushijo',
		role: 'Full Stack Engineer',
		company: 'Kikokushijo Academy',
		location: 'Tokyo, Japan · Remote',
		link: 'https://www.kikokushijoacademy.com',
		start: '2026-01',
		end: null,
		employmentType: 'full-time',
		description:
			'Building and maintaining the learning platform behind an English academy running 11+ campuses across Tokyo, Yokohama and Chiba, plus a distance-learning cohort studying from anywhere in the world.',
		stacks: ['TypeScript', 'ReactJS', 'NodeJS', 'MongoDB', 'Prisma'],
		bullets: [
			'Build and maintain the learning platform for an English academy running 11+ campuses across Tokyo, Yokohama and Chiba, plus a distance-learning cohort studying from anywhere in the world.',
			'Shipped real-time collaborative features including a multi-user lesson whiteboard and attendance tracking across in-person and remote sessions.',
			'Built a no-code form builder so staff can create and change forms without engineering involvement.',
			'Own the deploy path: environments, releases, the data layer and hosting configuration.'
		],
		variantBullets: {
			frontend: [
				'Build the student and parent portals for an academy running 11+ campuses, each with its own access model.',
				'Shipped a real-time multi-user lesson whiteboard and an attendance interface used across in-person and remote sessions.',
				'Built a no-code form builder so staff can compose and change forms without engineering involvement.'
			],
			backend: [
				'Build and maintain the services behind a learning platform serving students, parents and instructors across 11+ campuses and a global distance-learning cohort.',
				'Modelled the data layer in MongoDB with Prisma, covering separate student and parent access models.',
				'Own the deploy path: environments, releases, the database and hosting configuration.'
			],
			cloud: [
				'Own fullstack delivery of a production learning platform across 11+ campuses and a global distance-learning cohort, including the deploy path: environments, releases, database and hosting configuration.',
				'Shipped real-time collaborative features including a multi-user lesson whiteboard and attendance tracking.'
			],
			mobile: [
				'Build and maintain the learning platform behind an academy running 11+ campuses, working across responsive web clients used heavily on phones and tablets in class.',
				'Shipped real-time collaborative features including a multi-user lesson whiteboard and attendance tracking.'
			]
		},
		site: { show: true, order: 1 }
	},
	{
		id: 'xedla',
		role: 'Mobile App Developer',
		company: 'Xedla Pay',
		location: 'Kwara, Nigeria',
		start: '2023-01',
		end: null,
		employmentType: 'contract',
		engagementNote: 'Contract, concurrent',
		description:
			'Primary author of four of the backend services behind the payments platform, plus the Terraform that provisions its AWS storage.',
		stacks: ['TypeScript', 'NodeJS', 'ExpressJS', 'MongoDB', 'Redis', 'Terraform'],
		bullets: [
			'Primary author of four backend services: identity and accounts, escrow, transactions and virtual cards. Node, Express and MongoDB with Redis, each separately deployed with its own test suite and CI pipeline.',
			'Built escrow as an isolated service holding funds against a transaction, with release, reversal and human dispute appeal, so a failure elsewhere cannot reach custody logic.',
			'Integrated banking-as-a-service transfer rails and a tiered identity provider, so an account\u2019s limits follow how much of itself it has verified.',
			'Author AWS infrastructure as code with Terraform, including the production S3 buckets and remote state backend, with versioning, server-side encryption and public-access blocking.'
		],
		variantBullets: {
			backend: [
				'Primary author of four backend services: identity and accounts, escrow, transactions and virtual cards. Node, Express and MongoDB with Redis, each separately deployed with its own test suite and CI pipeline.',
				'Built escrow as an isolated service holding funds against a transaction, with release, reversal and human dispute appeal, so a failure elsewhere cannot reach custody logic.',
				'Integrated banking-as-a-service transfer rails and a tiered identity provider, and wrote the request-encryption layer shared across the platform clients.'
			],
			cloud: [
				'Author AWS infrastructure as code with Terraform. In production: S3 buckets and the remote state backend, with versioning, server-side encryption and public-access blocking.',
				'Defined a validated staging environment in Terraform covering VPC and subnets, EC2, ECS, ECR, CloudWatch and IAM roles and policies.',
				'Primary author of four separately deployed backend services, each with its own test suite and pull-request, staging and production pipelines.'
			],
			mobile: [
				'Contributed the virtual-card and escrow screens to the Flutter client, live on the App Store and Google Play, and wrote the request-encryption layer shared across the platform clients.',
				'Primary author of four of the backend services the client talks to, covering accounts, escrow, transactions and virtual cards.',
				'Author the Terraform that provisions the AWS storage the clients depend on.'
			]
		},
		// Resume-only. A concurrent contract running alongside a full-time role
		// would break the site timeline's single linear reading order.
		site: { show: false }
	},
	{
		id: 'bposeats',
		role: 'Frontend Developer',
		company: 'BPOSeats',
		location: 'Cebu, Philippines · Remote',
		link: 'https://www.bposeats.com',
		start: '2023-10',
		end: '2026-04',
		employmentType: 'full-time',
		description:
			'Led frontend design and development for the internal platform, and took on backend and email infrastructure work alongside it.',
		stacks: ['VueJS', 'JavaScript', 'SCSS', 'Django', 'Figma'],
		bullets: [
			"Led frontend development for the company's internal platform in Vue.js and SCSS, building the responsive component set used across the product.",
			'Built server-side features in Django and Django REST Framework, and profiled and rewrote the slowest API endpoints.',
			'Introduced MJML for transactional email so templates render consistently across major email clients.'
		],
		variantBullets: {
			backend: [
				'Built server-side features in Django and Django REST Framework, and profiled and rewrote the slowest API endpoints.',
				'Introduced MJML for transactional email so templates render consistently across major email clients.',
				'Worked across the Vue.js client and the API, defining the response contracts between them.'
			],
			frontend: [
				"Led frontend design and development for the company's internal platform in Vue.js and SCSS.",
				'Built the responsive component set used across the product, improving cross-platform usability and accessibility.',
				'Worked from Figma designs and fed practical constraints back into them.'
			]
		},
		site: {
			show: true,
			order: 2,
			description:
				'Designed and built responsive component and UI sets used across the product and related platforms.',
			stacks: ['Figma', 'JavaScript', 'VueJS', 'SASS']
		}
	},
	{
		id: 'helppo',
		role: 'Senior Software Developer',
		company: 'Helppo Africa',
		location: 'Lagos, Nigeria · Remote',
		link: 'https://www.linkedin.com/company/helppo-africa-limited',
		start: '2023-05',
		end: '2023-11',
		employmentType: 'full-time',
		description:
			'Led development on a financial platform serving over 10,000 active users, including payment processing and the security controls around it.',
		stacks: ['TypeScript', 'Angular', 'Ionic', 'NodeJS', 'TailwindCSS'],
		bullets: [
			'Led development on a financial platform serving over 10,000 active users.',
			'Designed and integrated REST and GraphQL APIs for the web and mobile clients.',
			'Implemented payment processing and transaction management, including the security controls around them.'
		],
		variantBullets: {
			backend: [
				'Led backend development on a financial platform serving over 10,000 active users.',
				'Designed and integrated REST and GraphQL APIs consumed by the web and mobile clients.',
				'Implemented payment processing and transaction management, and the security controls around money movement.'
			],
			mobile: [
				'Led development of the mobile experience for a financial platform serving over 10,000 active users, built in Ionic and Angular.',
				'Worked with designers to build the transaction and payment interfaces.',
				'Integrated the mobile client against REST and GraphQL APIs.'
			],
			cloud: [
				'Led development on a financial platform serving over 10,000 active users.',
				'Implemented the security controls around payment and transaction flows.'
			]
		},
		site: { show: true, order: 3 }
	},
	{
		id: 'summitech',
		role: 'Frontend Developer',
		company: 'Summitech Computing Ltd',
		location: 'Lagos, Nigeria · Remote',
		link: 'https://summitech.ng',
		start: '2022-10',
		end: '2023-05',
		employmentType: 'full-time',
		description:
			'Built and maintained frontend for enterprise software products, including reusable component libraries adopted across multiple products.',
		stacks: ['JavaScript', 'TypeScript', 'ReactJS', 'Bootstrap'],
		bullets: [
			'Built and maintained frontend for enterprise software products, engineering reusable component libraries adopted across multiple products.',
			'Worked on the API layer alongside the frontend, including database query performance.'
		],
		variantBullets: {
			backend: [
				'Worked on the API layer behind enterprise software products, including database query performance.',
				'Built reusable frontend component libraries against those APIs, adopted across multiple products.'
			]
		},
		site: { show: true, order: 4 }
	},
	{
		id: 'veendhq',
		role: 'Frontend Developer',
		company: 'VeendHQ',
		location: 'Wyoming, USA · Remote',
		link: 'https://veendhq.com',
		start: '2022-02',
		end: '2022-10',
		employmentType: 'contract',
		engagementNote: 'Contract',
		description:
			'Built and maintained fintech platforms serving over 15,000 users at a Techstars ’23 company.',
		stacks: ['ReactJS', 'NextJS', 'React Native', 'TypeScript'],
		bullets: [
			'Built and maintained fintech platforms serving over 15,000 users at a Techstars ’23 company.',
			'Used server-side rendering and static generation in Next.js where it helped load performance.',
			'Contributed to the React Native mobile app against the same APIs.'
		],
		variantBullets: {
			mobile: [
				'Contributed to the React Native mobile app for fintech platforms serving over 15,000 users.',
				'Worked across the mobile client and the web product against a shared API surface.',
				'Wrote unit tests and worked through the defects that reached production.'
			],
			backend: [
				'Built fintech platforms serving over 15,000 users, working across the service boundaries between web, mobile and the backend APIs.',
				'Wrote unit tests and worked through the defects that reached production.'
			]
		},
		site: { show: true, order: 5 }
	},
	{
		id: 'fovero',
		// Senior Software Developer, matching LinkedIn. Deliberately not "Founder":
		// a title the profile contradicts is the same class of problem as a stale
		// "Present" date, and this work exists to remove those.
		role: 'Senior Software Developer',
		company: 'Fovero Digital Technologies',
		location: 'Lagos, Nigeria',
		start: '2020-02',
		end: '2022-01',
		employmentType: 'part-time',
		engagementNote: 'Part-time',
		description:
			'Led design and delivery of web and mobile software for agency clients, and ran the infrastructure behind them.',
		stacks: ['JavaScript', 'Python', 'PHP'],
		bullets: [
			'Led design and delivery of web and mobile software for agency clients, from scoping through release.',
			'Ran the infrastructure side end to end: provisioning, deployment, DNS, certificates and uptime.',
			'Mentored junior developers and ran code review.'
		],
		variantBullets: {
			cloud: [
				'Ran client infrastructure end to end: provisioning, deployment, DNS, certificates and uptime monitoring.',
				'Led design and delivery of web and mobile software for agency clients, from scoping through release.'
			]
		},
		site: { show: false, earlier: true }
	},
	{
		id: 'new-horizons',
		role: 'IT Instructor',
		company: 'New Horizons Computer Learning Centers',
		location: 'Lagos, Nigeria',
		link: 'https://www.newhorizonsnigeria.com.ng/',
		start: '2019-10',
		end: '2020-02',
		employmentType: 'full-time',
		description: 'Taught core programming concepts and built web applications for clients.',
		stacks: ['JavaScript', 'HTML', 'CSS', 'PHP'],
		bullets: [
			'Designed and delivered training on core programming concepts.',
			'Built and deployed client web applications in HTML, CSS, JavaScript and PHP.'
		],
		site: { show: false, earlier: true }
	}
];
