import type { CaseStudy } from '../types/case-study';

/**
 * Long-form write-ups for three live products.
 *
 * Every technical claim here was checked against the product's own source
 * before it was written. Where the source does not support a claim, it is not
 * made: there are no traction numbers, because nothing in the repositories
 * substantiates the figures the marketing sites quote.
 *
 * Sections carrying a `todo` are structurally complete but factually
 * incomplete — those notes render in development only.
 */
export const caseStudies: CaseStudy[] = [
	{
		slug: 'mosestab',
		title: 'MosesTab',
		tagline: 'Church management software replacing a stack of separate tools.',
		img: '/projects/mosestab.webp',
		link: 'https://mosestab.com',
		stacks: ['ReactJS', 'TypeScript', 'TanStack Router', 'NextJS', 'TailwindCSS', 'Stripe'],
		// No stats: the marketing site quotes figures that nothing in the codebase
		// or any export substantiates. Better empty than unverifiable.
		stats: [],
		metadescription:
			'MosesTab: a tenant-scoped church management platform with per-church Stripe Connect payouts, SMS text-to-give over Twilio, and a safety-critical child check-in system.',
		sections: [
			{
				heading: 'The problem',
				body: [
					'Churches run on tools that do not talk to each other: a member database in one place, a giving platform in another, a forms tool, a check-in app, a rota spreadsheet. Each is affordable alone and punishing in aggregate.',
					'The cost is not only the subscriptions. It is the administration: the same family entered four times, attendance that cannot be compared against giving, and a volunteer team spending Sunday afternoon reconciling exports.'
				]
			},
			{
				heading: 'What I built',
				body: [
					'A tenant-scoped platform where every church is addressed by slug and every API call is scoped to it. Members, groups and ministries, events, attendance, a forms builder, child check-in, visitor management and giving all sit behind one login.',
					'Users belong to many churches with a per-church role, so staff who serve more than one congregation get one account rather than several. Permissions are supplied per section and per church, and the route guard resolves the active church before any protected view renders.',
					'It is two front ends against a shared Django REST API: a React 19 and Vite dashboard using TanStack Router and Query for the authenticated product, and a Next.js public site for marketing and public giving.'
				]
			},
			{
				heading: "Decisions I'd defend",
				body: [
					'Giving runs on Stripe Connect with a connected account per church, not a single platform account. Money reaches a church directly and payouts, balances, payout schedules, instant payouts and refunds are all the church’s own. It costs an onboarding flow, and it is the difference between a product churches can trust with donations and one they cannot.',
					'Wallet payments were the fiddly part. Apple Pay and Google Pay go through the Stripe Payment Request API on the connected account, which means checking wallet availability before rendering the buttons at all, then confirming with actions handled manually so the wallet sheet closes correctly. Stripe.js caches its instance globally, which breaks when every church is a different connected account, so instances are loaded and cached per account instead.',
					'Text-to-give is a Twilio number provisioned per church, with keywords mapped to giving baskets and a tokenised card on file so an SMS can complete a donation. It carries its own guardrails: minimum, maximum and daily limits in minor units, because an SMS is a very easy thing to send twice.',
					'Child check-in is the part that has to be right. Pickup authorisation is an explicit per-guardian permission rather than something inferred from the relationship, so "can check in" and "can check out" are separate flags. Allergies and medical notes are surfaced on the roster and on every scan result rather than sitting a click away, classrooms carry volunteer-ratio and capacity constraints, and checkout requires a security code with optional guardian identity and PIN.'
				]
			},
			{
				heading: 'Where it is now',
				body: [
					'Live and in use, with a free plan that needs no card. The dashboard is the only one of the three front ends with a test suite: Vitest with Testing Library and MSW, covering the auth flows and the member import path.'
				],
				todo: [
					'Real traction figures — churches, members, countries — sourced from the production database or the Stripe dashboard. The numbers on the marketing site are not backed by anything in the repo, so nothing is claimed here.'
				]
			}
		]
	},
	{
		slug: 'bringvan',
		title: 'BringVan',
		tagline: 'A UK moving-company directory, built as a programmatic SEO surface.',
		img: '/projects/bringvan.webp',
		link: 'https://bringvan.com',
		stacks: ['NextJS', 'ReactJS', 'TypeScript', 'TailwindCSS', 'Zustand'],
		stats: [],
		metadescription:
			'BringVan: a UK moving-company directory built around programmatic SEO, with generated location and company pages, faceted search and contact-click attribution.',
		sections: [
			{
				heading: 'The problem',
				body: [
					'Finding a mover in the UK means searching a town name and landing on a page of paid ads or a directory that has never heard of your postcode. Comparing firms is guesswork, and the good local operators are invisible unless they buy their way up.',
					'The demand is intensely local: people search "removals in <town>", not "removals". That shape of demand rewards a site that has a real page for every town, which is a content generation problem before it is a product problem.'
				]
			},
			{
				heading: 'What I built',
				body: [
					'A directory whose surface area is generated rather than authored: nested routes produce a page per country, per location and per moving company, with a sitemap index assembling the lot and structured data on every company page.',
					'Search resolves what someone types against a locations endpoint rather than a geocoder, so "Oxford", "OX1" and "Oxfordshire" all settle onto a canonical location slug. That slug is what filters the movers query, alongside rating and price band.',
					'The commercial signal is contact attribution: every phone, email, maps and social click is recorded against the mover and the source it came from, which is what makes the directory measurable rather than decorative.'
				]
			},
			{
				heading: "Decisions I'd defend",
				body: [
					'Search does not fail silently. When someone types a place the system cannot resolve, the query is sent with a flag marking the location unresolved, so unserved demand is recorded rather than discarded. Over time that is a map of where to recruit movers next.',
					'Location resolution deliberately went through an autocomplete endpoint rather than a postcode geocoder. A geocoder returns coordinates; what the directory actually needs is the canonical slug of a place it already has a page for, and matching to that up front keeps every downstream URL stable and indexable.'
				]
			},
			{
				heading: 'Where it is now',
				body: [
					'Live, with real movers listed and the generated location and company pages indexed.'
				],
				todo: [
					'The quote form and the mover registration flow are currently front-end stubs — both log their payload and show a success screen without submitting anywhere. Either wire them to the API or take them down before pointing recruiters at this page, because the site presents both as working.',
					'Mover "verified" status exists as a flag on the data but has no verification workflow behind it in this repo. Worth confirming what verifies a mover in practice before the word is used in copy.',
					'The testimonials on the live site read as seed content (stock-shaped names, generic copy). Replace with real ones or remove the section.'
				]
			}
		]
	},
	{
		slug: 'braandly',
		title: 'Braandly',
		tagline: 'Multi-tenant brand management SaaS, and the API surface built on top of it.',
		img: '/projects/braandly.webp',
		link: 'https://braandly.com',
		stacks: ['NextJS', 'ReactJS', 'ExpressJS', 'MongoDB', 'Redis', 'Socket.IO'],
		stats: [
			{ label: 'Data models', value: '85' },
			{ label: 'MCP tools', value: '102' },
			{ label: 'Unit tests', value: '699' },
			{ label: 'Since', value: '2021' }
		],
		metadescription:
			'Braandly: a workspace-scoped brand management platform with a versioned public REST API, a hand-built OAuth 2.1 authorization server, and an MCP server exposing 102 tools.',
		sections: [
			{
				heading: 'The problem',
				body: [
					'Brand assets live everywhere except where anyone can find them. The logo is in a Drive folder, the palette is in someone\u2019s Figma file, the guidelines are a PDF two versions out of date, and the person who knows which is current left in March.',
					'Agencies have the same problem multiplied by every client they run, and the tools that solve one slice of it do not talk to the tools that solve the next.'
				]
			},
			{
				heading: 'What I built',
				body: [
					'A workspace-scoped platform where a brand and everything attached to it \u2014 identity, guidelines, palettes, fonts, gradients, files \u2014 sits in one place, with projects, tasks and collaborative documents around it, plus public link-in-bio pages for brands that need an outward face.',
					'It is a Next.js front end against an Express and MongoDB API, with Redis behind the queues and caches, and Socket.IO plus Yjs carrying real-time document collaboration. The front end deploys to Vercel; the API runs as a Docker image on a VPS, built and shipped by GitHub Actions.'
				]
			},
			{
				heading: "Decisions I'd defend",
				body: [
					'Tenancy is shared-schema: one database per environment, and a workspace reference on every domain collection. Every compound index is workspace-prefixed, including the full-text ones, because a text index that is not tenant-prefixed will happily search across tenants.',
					'Scoping is enforced in three layers rather than one. Route middleware resolves membership and role from the canonical workspace document rather than the denormalised copy on the user. A generic guard then checks the requested resource actually belongs to that workspace, and returns 404 rather than 403 so the API never confirms that another tenant\u2019s record exists. Controllers still filter explicitly on top of both.',
					'Authorisation has four levels, not one: a platform role, a workspace role ranked so nobody can act on someone above them, a per-project permission matrix stored on the project, and per-document sharing with view, comment and edit tiers.',
					'The public API needed a real auth story, so I built an OAuth 2.1 authorization server: authorization-code only, PKCE mandatory, dynamic client registration, RS256 access tokens verified statelessly, and opaque refresh tokens hashed at rest and rotated on every use, with reuse detection that revokes the whole token family. API keys are hashed too, with only a masked prefix stored for display.',
					'On top of that sits an MCP server exposing 102 tools, stateless over streamable HTTP with a fresh instance per request, its types generated from the live OpenAPI spec so the tools cannot drift from the API they wrap.'
				]
			},
			{
				heading: 'What went wrong',
				body: [
					'A live API audit found that workspace roles were not being enforced on most write endpoints \u2014 a guest could create tasks, projects and documents, and update brands. That is a privilege escalation, and it existed because scoping and authorisation had been treated as the same problem when they are not: the middleware correctly established which workspace you were in, and then did not check what your role there allowed you to do.',
					'The fix was a dedicated write-authorisation layer applied across the mutating routes, plus a hardening pass on the invitation flow. Worth stating plainly rather than quietly patching, because the interesting part of a permissions model is where it failed.'
				]
			},
			{
				heading: 'Where it is now',
				body: [
					'Live and in active development since late 2021, across four repositories. 85 data models, 699 unit tests, a Figma plugin and a browser extension against the public API, and a Playwright sweep that walks every route checking for console errors, failed requests and accessibility violations.',
					'I am the sole author of the backend, the link-in-bio app and the MCP server, and I wrote the large majority of the front end, with two collaborators contributing in bounded windows.'
				]
			}
		]
	},
	{
		slug: 'ayomideodewale-com',
		title: 'ayomideodewale.com',
		tagline: 'This site, and the resume generator that keeps it honest.',
		img: '/projects/maestro-website.webp',
		link: 'https://ayomideodewale.com',
		github: 'https://github.com/Maestroharyor/ayomideodewale.com',
		stacks: ['SvelteKit', 'Svelte', 'TypeScript', 'TailwindCSS', 'Vercel'],
		stats: [
			{ label: 'Resume variants', value: '5' },
			{ label: 'Generated from', value: '1 dataset' },
			{ label: 'Build dependencies added', value: '0' },
			{ label: 'Since', value: '2023' }
		],
		metadescription:
			'How this site is built: SvelteKit 5 and Tailwind 4 on Vercel, with five resume PDF variants generated from a single typed dataset by headless Chrome.',
		sections: [
			{
				heading: 'The problem',
				body: [
					'A portfolio site, a set of resume PDFs and a LinkedIn profile are three copies of the same facts, and copies drift. Mine had: the site was missing the current employer, one resume said five years of experience while another said six, job titles disagreed across surfaces, and the PDF the site linked to was a stale export nobody had regenerated in a year.',
					'Every one of those is the same failure. The facts were stored in the documents rather than anywhere a document could be generated from.'
				]
			},
			{
				heading: 'What I built',
				body: [
					'One typed dataset of roles, projects, education and certifications, and a `buildResume(variant)` function that composes a document from it. Five variants (fullstack, backend, frontend, mobile and cloud) select and reorder from the same records, and a variant may override the bullets for a role, but it can never introduce a second spelling of a fact.',
					'That dataset renders into a print-styled Svelte route, and a script drives headless Chrome over it to produce five PDFs. The site\u2019s own experience section is a projection over the same records, filtered by a per-role `site` flag, so the timeline on the homepage and the timeline in the PDF cannot disagree.',
					'The site itself is SvelteKit 2 on Svelte 5 runes, Tailwind 4 in its CSS-first configuration, deployed to Vercel.'
				]
			},
			{
				heading: "Decisions I'd defend",
				body: [
					"Dates are `YYYY-MM` strings, not `Date` objects. Lexicographic order equals chronological order, so sorting is free, and there is no timezone to get wrong. This is not hypothetical: `new Date('2026-01')` parses as UTC midnight and renders as December 2025 in any negative-offset locale, which would have shipped a wrong start date on every resume.",
					'The resume route sets `prerender = true` and `csr = false`. Without client-side rendering the theme watcher never mounts, so a stale dark class cannot leak into a print, the particle background never paints, and SvelteKit omits a hydration payload that would otherwise serialise the whole document into the page a second time.',
					'The print stylesheet specifies Arial rather than the system font stack. macOS San Francisco is not embeddable, so Chrome rasterises it into Type 3 fonts that some applicant tracking systems extract badly; Arial embeds as TrueType. The document is single-column for the same reason, since a CSS grid can make Chrome interleave columns in the PDF text stream and scramble extraction order.',
					'No dependency was added for any of this. Screenshots and PDFs go through the Chrome DevTools Protocol over Node\u2019s built-in WebSocket, and the four non-canonical resume variants render from a dev-only route guarded by `if (!dev) error(404)`, so they exist as PDFs without ever being publicly reachable as pages.'
				]
			},
			{
				heading: 'What went wrong',
				body: [
					'Two things, both instructive. Chrome\u2019s `--print-to-pdf` has no error channel: a broken page prints blank and reports success, so the script verifies every output starts with the `%PDF` magic bytes and exceeds a size floor, and I still open each one. And launching the installed Chrome while a normal Chrome is running silently hands the URL to the existing instance and ignores the flag entirely, which is why the script uses `chrome-headless-shell` with a fresh profile directory every run.',
					'Separately, writing the case studies on this site meant reading the source of the products they describe, and three claims did not survive that. A Terraform module I had described as provisioning production infrastructure had, by its own README, never been applied. Traction numbers quoted on a marketing site were not substantiated anywhere in the repository. A project I had called solo had two collaborators in the git history. All three were corrected rather than softened.'
				]
			},
			{
				heading: 'Where it is now',
				body: [
					'Live, open source, and the single source of truth for every surface it feeds. Adding a role means editing one record; the homepage timeline, five PDFs and the sitemap follow from it.'
				]
			}
		]
	},
	{
		slug: 'dailyos',
		title: 'DailyOS',
		tagline: 'Retail commerce that keeps selling when the connection drops.',
		img: '/projects/dailyos.webp',
		link: 'https://dailyos.foverotechnologies.com',
		github: 'https://github.com/Maestroharyor/dailyos',
		stacks: ['NextJS', 'ReactJS', 'TypeScript', 'Prisma', 'Postgres', 'Supabase'],
		stats: [
			{ label: 'Prisma models', value: '54' },
			{ label: 'Storefront endpoints', value: '16' },
			{ label: 'Unit tests', value: '~640' },
			{ label: 'Since', value: '2026' }
		],
		metadescription:
			'DailyOS: a multi-tenant retail commerce platform on Next.js and Postgres, with an offline write queue built so a dropped connection mid-sale cannot produce a duplicate order.',
		sections: [
			{
				heading: 'The problem',
				body: [
					'A shop floor is the worst network environment software has to work in, and it is the one place where losing a write means losing money. A card reader, a phone hotspot and a till in a basement will all drop the connection mid-sale, and the cashier cannot stop serving the queue while the software works out what happened.',
					'The usual answer is to retry, which is precisely how one sale becomes two orders.'
				]
			},
			{
				heading: 'What I built',
				body: [
					'A multi-tenant commerce platform on Next.js 16 and Postgres, via Prisma: point of sale, products, inventory, purchase orders, returns, stock takes, suppliers, discounts, loyalty and delivery zones, plus a personal finance module alongside it. Tenancy is a space discriminator carried on 38 of the 54 models and enforced in application code, with every uniqueness constraint written as a compound on the space rather than globally, so two shops can both have a customer at the same email address.',
					'It installs as a PWA against a hand-written Serwist service worker, and commerce reads are restored from IndexedDB while commerce writes queue in an outbox until the connection returns.',
					'A keyed storefront API sits on top: sixteen endpoints authenticated by a per-space key that maps to the tenant, so the caller never names the space it wants. That is what the VKT Bougie storefront writes orders through.'
				]
			},
			{
				heading: "Decisions I'd defend",
				body: [
					'Idempotency is a database constraint, not a cache. Every offline-capable model carries a compound unique on the space and a client-generated request id, and the replay path reads the Prisma unique-violation target to decide what the collision means: an order-number collision retries with a new number, a request-id collision must not retry, because retrying there is exactly how you get two orders for one sale.',
					'Draining the outbox takes a Web Lock. Two browser tabs on one till is normal, and two drainers picking up the same queued sale is a duplicate-order generator. For the same reason a queued order is never deleted automatically, not on repeated failure and not at the attempt cap, only by someone explicitly discarding it: a queued sale is money that has already changed hands.',
					'Offline sales never guess an order number. They carry a provisional identifier derived from their own ULID timestamp, in a separate namespace from real order numbers, so two terminals cannot collide because neither is picking a number.',
					'Money is exact decimal in the database, never float, and totals are recomputed server-side from the space’s own tax configuration rather than trusted from the client. Before that, the same basket could total differently depending on whether it came through the POS or the storefront. The conversion to integer minor units is confined to the one boundary that requires it, the payment provider, where the amount is checked against the verified transaction before the order is written.',
					'The payment webhook resolves its signer by trying each configured secret against the signature, rather than looking up a space first. The provider sends no tenant identifier, so the moment a second space exists alongside the first, selecting one arbitrarily makes every signature check fail, including real orders.'
				]
			},
			{
				heading: 'What went wrong',
				body: [
					'The first service worker cached every same-origin GET cache-first into one shared bucket, authenticated payloads included. On a shared till that meant the second cashier to sign in could be served the first one’s orders page. The rewrite scopes the persisted cache to the signed-in user, never caches API or server-component payloads at all, and clears the old caches on activation and on sign-out.',
					'Worth stating plainly: the meal-planning module is not server-backed. Its models and server actions exist, but no page calls them, so it runs on local browser storage against a public recipe API and does not sync across devices. It is a prototype living next to production code, and it is described that way rather than counted as a third module.'
				]
			},
			{
				heading: 'Where it is now',
				body: [
					'Live, with the commerce and finance modules in real use and the storefront API serving VKT Bougie. Around 640 unit tests, weighted towards the offline and money paths, with continuous integration gating lint, types, tests and a full build.',
					'The honest gaps: the audit log covers membership and administration only, not commerce mutations; rate limiting is per-instance and resets on a cold start; and per-item inventory movement history is not wired up yet.'
				]
			}
		]
	},
	{
		slug: 'vkt-bougie',
		title: 'VKT Bougie',
		tagline: 'A storefront that refuses to price anything itself.',
		img: '/projects/vktbougie.webp',
		link: 'https://vktbougie.com',
		stacks: ['SvelteKit', 'Svelte', 'TypeScript', 'TailwindCSS', 'Prisma', 'Vercel'],
		stats: [
			{ label: 'Tests', value: '621' },
			{ label: 'Working facets', value: '8' },
			{ label: 'States covered', value: '37' },
			{ label: 'Since', value: '2023' }
		],
		metadescription:
			'VKT Bougie: a SvelteKit storefront with server-side faceted search, tested variant selection and Paystack checkout, built so the storefront never computes a price it is about to charge.',
		sections: [
			{
				heading: 'The problem',
				body: [
					'A storefront and its commerce backend are two systems that must agree on one number: what the customer owes. If both compute it, they will eventually disagree, and the disagreement surfaces after the card has been charged.',
					'The second problem is Nigerian delivery. Fees are set per state and per area rather than by distance, some options are pickup with a refundable deposit rather than a fee, and the same state answers to several spellings.'
				]
			},
			{
				heading: 'What I built',
				body: [
					'A SvelteKit 2 storefront on Svelte 5 runes, deployed to Vercel. Catalog reads go straight to the commerce database through a SELECT-only role, kept in a server-only module so the client bundle cannot reach it; orders, customers, wishlists and reviews go over an HTTP API authenticated by a per-space storefront key.',
					'Faceted search is server-side SQL, not client-side filtering: text, category, colour, size, material, price range and sale status, with four sorts and pagination. Variant selection has its own algorithm and its own test file, because picking a size should not silently revert the colour you already chose.',
					'Delivery is a state and option picker over the merchant’s real zone table, with the fee and any refundable deposit kept as separate quantities.'
				]
			},
			{
				heading: "Decisions I'd defend",
				body: [
					'The storefront never computes what it charges. It takes the total from the backend verbatim, because a second implementation here would be a second chance to disagree. What it does do is assert that the server’s own figures sum to the server’s own total within half a kobo, and refuse to open the payment popup if they do not. That check caught a real near-miss where a pickup deposit was added to the quote breakdown: had the total excluded it, checkout would have charged short and the order would have been rejected after the debit.',
					'The payment key is bound to the deploy environment. A live key on staging and a test key in production are both refused, with shopper-facing copy rather than a silent charge, because neither the key nor the environment knows which one the other landed in.',
					'Facet values are derived from the whole catalogue rather than the current page: a colour swatch should exist because some product somewhere is that colour, not because it happens to be on page three.',
					'Nigerian states are normalised against a canonical list of the thirty-six plus the FCT, written because the merchant’s own table spelled Nasarawa two ways and the FCT four. Unrecognised states are logged and dropped rather than guessed at, and there is deliberately no catch-all delivery fee: the previous fallback was deleted precisely so one could not be reintroduced by accident.',
					'Anonymous responses are cacheable, signed-in ones are not, and the guard is the conditional rather than a Vary header, because a public header on a signed-in data payload would put a customer email into a shared cache.'
				]
			},
			{
				heading: 'What went wrong',
				body: [
					'The catalogue used to be filtered in the browser: the page requested five hundred products and narrowed them client-side, which was quietly broken because the API clamps its page size to a hundred. Filtering, sorting and pagination moved to the server.',
					'It also started life with no test coverage on the checkout path, no error monitoring and per-instance rate limiting. All three were addressed, though the rate limiter still fails open without its shared store, and I would rather say that than imply otherwise.'
				]
			},
			{
				heading: 'Where it is now',
				body: [
					'Live, with 621 tests and continuous integration that gates lint, a custom Svelte template rule, type checking, tests and a full build on every pull request.',
					'The homepage hero is still hardcoded rather than merchant-managed, and the instant-indexing path is plumbed on this side but has nothing calling it yet. Both are known, and both are on the list.'
				]
			}
		]
	},
	{
		slug: 'healthcheck-service',
		title: 'healthcheck-service',
		tagline: 'The smallest thing that answers "is it up?".',
		img: '/projects/healthcheck-service.webp',
		github: 'https://github.com/Maestroharyor/healthcheck-service',
		stacks: ['Go', 'Docker', 'Slack', 'Resend'],
		stats: [
			{ label: 'Lines of Go', value: '502' },
			{ label: 'Third-party deps', value: '2' },
			{ label: 'Endpoints watched', value: '1' }
		],
		metadescription:
			'healthcheck-service: a 502-line Go uptime monitor that checks one endpoint on a schedule and alerts to Slack and email, written because the hosted options cost more than the thing they were watching.',
		sections: [
			{
				heading: 'The problem',
				body: [
					'Uptime monitoring is priced per monitor, and a small service that needs watching is often cheaper to run than the thing watching it. I wanted one endpoint checked on a schedule, an alert when it stopped answering, and nothing else.'
				]
			},
			{
				heading: 'What I built',
				body: [
					'A Go binary in about five hundred lines and two third-party dependencies. It calls one configured endpoint every minute, and on a transport error or a non-200 response it posts to Slack and sends an email. Configuration is environment variables only; the whole thing ships as a multi-stage Docker build producing a static binary on Alpine, running as a non-root user.'
				]
			},
			{
				heading: "Decisions I'd defend",
				body: [
					'The scheduler is fourteen lines: run once, then a ticker. There is no job framework, no queue and no persistence, because a monitor that needs its own infrastructure to stay up has inverted its own purpose.',
					'The container build is the part I would defend hardest, because it is the part that usually goes wrong. CGO off, trimmed and stripped, a static binary on a minimal base with CA certificates added explicitly, running as a fixed non-root uid. The build context excludes every environment file with a single negation for the example, so a secret cannot end up in a layer.'
				]
			},
			{
				heading: 'The tradeoffs',
				body: [
					'This is a deliberately small tool and it is worth being precise about what that costs. One endpoint per process, a fixed one-minute interval, a fixed request method, no failure threshold so a single blip alerts, and no recovery notification when it comes back. Nothing is persisted, so there is no history and no uptime percentage.',
					'It has no tests. Its successor, supabase-pings, is where most of these were fixed, and the diff between the two is the honest version of what I learned writing it.'
				]
			},
			{
				heading: 'Where it is now',
				body: [
					'Public, MIT licensed, and doing the one job it was written for. The README carries its own limitations section, which matches the code.'
				]
			}
		]
	},
	{
		slug: 'supabase-pings',
		title: 'supabase-pings',
		tagline: 'One binary so a free-tier database stops pausing itself.',
		img: '/projects/supabase-pings.webp',
		github: 'https://github.com/Maestroharyor/supabase-pings',
		stacks: ['Go', 'YAML', 'Slack', 'SMTP'],
		stats: [
			{ label: 'Lines of Go', value: '853' },
			{ label: 'Alert channels', value: '3' },
			{ label: 'Projects per instance', value: 'Many' }
		],
		metadescription:
			'supabase-pings: a Go binary that keeps free-tier Supabase projects awake, with a config split that keeps secrets out of the file you commit.',
		sections: [
			{
				heading: 'The problem',
				body: [
					'Free-tier Supabase projects pause after a week without activity, and an unpaused project is one scheduled request away. Doing that for several projects at once needs a list, a schedule, and somewhere to put credentials that is not the list.'
				]
			},
			{
				heading: 'What I built',
				body: [
					'A Go binary that reads a project list and an interval from one YAML file, notification settings from another, and every secret from the environment. On a failure it can alert over Slack, a transactional email API, or plain SMTP.'
				]
			},
			{
				heading: "Decisions I'd defend",
				body: [
					'The YAML files hold environment variable names, not values. That is the whole design: the config you commit describes which projects exist and where their credentials live, and the credentials themselves never enter the repository. Disabled channels skip their lookups entirely, so running Slack-only does not require email credentials to exist.',
					'Missing configuration is reported all at once. The earlier tool exited on the first missing variable, which meant fixing one variable per restart; here the resolver accumulates every missing name and reports them together.',
					'Responses are read through a size limit and every interpolated value in the alert email is HTML-escaped. A monitor reads output from something that is already misbehaving, and putting an unbounded, unescaped response body into an alert is how a broken endpoint becomes a second problem.',
					'The one test covers MIME assembly, by re-parsing the generated message and asserting the plain-text part precedes the HTML part. That ordering is a rule of the format rather than a preference, and it is the kind of thing that silently renders wrong in one client and fine in every other.'
				]
			},
			{
				heading: 'The tradeoffs',
				body: [
					'Projects are pinged sequentially, so one unreachable project delays the rest by its timeout. Nothing is persisted between ticks, which means alerts repeat every interval while a project is down and there is no recovery notification. The ticker does not catch up after the host sleeps.',
					'Test coverage is one function. The README says all of this too.'
				]
			},
			{
				heading: 'Where it is now',
				body: [
					'Public and MIT licensed. It is the second pass at the problem the healthcheck monitor introduced me to, and most of what it does differently is a direct response to something the first one got wrong.'
				]
			}
		]
	},
	{
		slug: 'jornally',
		title: 'Jornally',
		tagline: 'A long-form publishing platform, and what two years of it taught me.',
		img: '/projects/jornally.webp',
		stacks: ['NextJS', 'ReactJS', 'TipTap', 'Redux', 'Laravel API', 'Ant Design'],
		stats: [
			{ label: 'Lines of code', value: '~12,000' },
			{ label: 'Ran', value: '2021–2023' },
			{ label: 'Source files', value: '~100' },
			{ label: 'Tests', value: '0' }
		],
		metadescription:
			'Jornally: a long-form publishing platform with a TipTap editor, draft recovery and a threaded comment tree, built on Next.js against a Laravel API between 2021 and 2023.',
		sections: [
			{
				heading: 'The problem',
				body: [
					'Writing tools and reading tools want opposite things. A writer needs a rich editor that never loses work; a reader needs pages that load fast, render without JavaScript and can be found by a search engine. Most platforms pick one and make the other someone else’s problem.'
				]
			},
			{
				heading: 'What I built',
				body: [
					'A publishing platform on Next.js against a Laravel API: accounts and follows, categories and tags, a threaded comment tree with replies and likes, bookmarks, up and down votes, search, and topic circles that readers join and writers can publish into.',
					'The editor is TipTap with a custom toolbar, image upload and table support, and the reading side renders server-side so an article is a real HTML page before any JavaScript runs.'
				]
			},
			{
				heading: "Decisions I'd defend",
				body: [
					'The session token lives in a cookie rather than only in memory, specifically so server-side rendering can read it. Circle and article pages render on the server for a logged-out visitor and for a search engine, and the same code path personalises them for a signed-in reader by degrading to unauthenticated headers when no token is present. One rendering path, two audiences, no client-side flash of the wrong state.',
					'Drafts autosave on every keystroke and restore on load. A long-form writing tool losing work to an accidental refresh is the failure that loses you the writer, not the session.',
					'Server-side data for a page is fetched in parallel rather than in sequence, so a circle page issues its three calls at once instead of stacking three round trips.'
				]
			},
			{
				heading: 'What I would do differently',
				body: [
					'There is no layer over the API. The base URL is interpolated at roughly seventy call sites across the components, and three different HTTP styles coexist, sometimes in the same file. Every one of those call sites rebuilds its own auth header. The single highest-value change would have been one client module with an interceptor, and its absence is why there is no consistent handling of expiry, errors or loading state.',
					'The token is also duplicated into local storage alongside the cookie, which means it is readable by any script on the page. A server-set, http-only cookie was the right answer and I did not reach for it.',
					'There are no tests. The comment and reply tree in particular is the kind of recursive, paginated structure that is miserable to verify by clicking, and it is exactly where a copy-paste bug in a pagination call survived unnoticed.',
					'The premise also drifted. Circles were meant to be how writing found its audience, but the default feed stayed global and the requirement to publish into a circle was commented out rather than resolved. That is a product decision left half-made in code, which is worse than either answer.'
				]
			},
			{
				heading: 'Where it is now',
				body: [
					'Shut down. It ran from late 2021 to late 2023 across 228 commits, and the domain has since been taken by an unrelated company, so there is nothing left to link to.',
					'I am including it because the interesting part is not the product. It is that the parts I got right, server-rendered reading and draft safety, were the architectural choices, and the parts I got wrong were all the same mistake: no abstraction at the boundary I crossed most often.'
				]
			}
		]
	},
	{
		slug: 'virem',
		title: 'Virem',
		tagline: 'A multivendor marketplace on headless WooCommerce, and the security lesson in it.',
		img: '/projects/virem.webp',
		stacks: ['NextJS', 'ReactJS', 'Redux Saga', 'WooCommerce', 'Dokan', 'Ant Design'],
		stats: [
			{ label: 'Ran', value: '2021–2022' },
			{ label: 'Surfaces', value: '2' },
			{ label: 'Tests', value: '0' }
		],
		metadescription:
			'Virem: a multivendor marketplace built on headless WooCommerce and Dokan, with a vendor onboarding chain that provisions a store in one flow.',
		sections: [
			{
				heading: 'The problem',
				body: [
					'A marketplace is two products. Shoppers need a fast catalogue and a checkout that works on a patchy connection; sellers need onboarding, listings and orders. Building both from scratch for a launch with no traffic yet is how marketplaces die before anyone visits them.'
				]
			},
			{
				heading: 'What I built',
				body: [
					'Two Next.js front ends against a headless WooCommerce install with Dokan for multivendor: a storefront with catalogue, per-vendor stores, cart, customer accounts and order history, and a separate seller dashboard for listings, orders and store settings.',
					'Both were built out on commercial React templates rather than from nothing, which is the decision that made a two-surface marketplace possible at all at that size. The integration work, the auth, the vendor provisioning and the checkout are mine; the component library and the page furniture were bought.'
				]
			},
			{
				heading: "Decisions I'd defend",
				body: [
					'Vendor onboarding is one chain rather than three forms. Registering creates the WordPress user, exchanges the credentials for a token, then calls Dokan to provision the store, so a seller signs up once and lands in a working dashboard instead of signing up and then waiting on an admin.',
					'Delivery pricing is a hardcoded table of local neighbourhoods rather than a shipping engine. For a marketplace serving one city, a lookup that a non-technical operator can read and correct beats a rules engine nobody can audit.',
					'Buying the templates. There was no design capacity and two surfaces to ship, and the parts that actually differentiate a marketplace are the vendor flow and the catalogue integration, not the button styles.'
				]
			},
			{
				heading: 'What I would do differently',
				body: [
					'The WooCommerce API credentials were kept in client-side code, which meant they were readable by anyone who opened devtools, with write access to customers and orders. That is the mistake I would fix first and the reason I no longer link the repository. The correct shape is a server route that holds the credentials and exposes only the operations the browser is allowed to perform.',
					'Card payments were wired up and then commented out before launch, so the shipped build accepted cash on delivery only. Leaving a dead branch behind a live-looking option is worse than removing the option.',
					'There were no tests, on a codebase handling orders.'
				]
			},
			{
				heading: 'Where it is now',
				body: [
					'Shut down. The storefront build still resolves but the WordPress backend behind it is gone, so it is a shell.'
				]
			}
		]
	},
	{
		slug: 'lifetechfacts',
		title: 'Lifetechfacts',
		tagline: 'A tech blog I wrote for, and built the reading experience for.',
		img: '/projects/lifetechfacts.webp',
		stacks: ['NextJS', 'TypeScript', 'WordPress', 'TailwindCSS', 'PWA'],
		stats: [
			{ label: 'Ran', value: '2022–2023' },
			{ label: 'ISR revalidate', value: '1s' },
			{ label: 'Tests', value: '0' }
		],
		metadescription:
			'Lifetechfacts: a technology blog on a Next.js front end over headless WordPress, with incremental static regeneration, syntax highlighting and offline support.',
		sections: [
			{
				heading: 'The problem',
				body: [
					'I was writing the posts as well as building the site, which made the trade-off concrete: WordPress is the best writing and editing experience available, and one of the worst reading experiences you can serve. I wanted the editor without the front end.'
				]
			},
			{
				heading: 'What I built',
				body: [
					'A Next.js reading front end over headless WordPress. Posts, categories, tags and search come from the WordPress REST API and render as static pages that revalidate in the background, so publishing an edit updates the site without a rebuild and a reader never waits on the CMS.',
					'On top of that: syntax highlighting for code posts, an installable offline-capable build, share cards, dark mode, and a table of contents lifted out of the post body.'
				]
			},
			{
				heading: "Decisions I'd defend",
				body: [
					'Incremental static regeneration was the whole point. A blog is read far more than it is written, the content is public, and the CMS is the slow part; serving static HTML that refreshes itself gets the editing experience and the reading experience at once.',
					'The table of contents is extracted from the rendered WordPress HTML and its anchors rewritten. It is string surgery on someone else’s markup and I would not call it clean, but the alternative was asking a writer to maintain a second structure by hand, and writers do not do that.'
				]
			},
			{
				heading: 'What I would do differently',
				body: [
					'Two features looked finished and were not. Comments render but cannot be posted: the submit call is written and never wired to the button. The "write for us" page is a complete form with no submit handler at all. Both shipped looking live, which is worse than not shipping them, and both are the kind of thing one integration test would have caught.',
					'The companion API was thinner than it appeared, and one part of it was wrong in a way worth naming: enrolment confirmation was sent on the basis of a payment flag supplied in the request body. A client can say anything. Payment state has to come from the payment provider, verified server-side, and that is the lesson I carried into every checkout I have built since.'
				]
			},
			{
				heading: 'Where it is now',
				body: [
					'Shut down, and the domain has lapsed. The audience moved to the community I still run.'
				]
			}
		]
	},
	{
		slug: 'foodmood',
		title: 'FoodMood',
		tagline: 'A recipe browser, built twice on purpose.',
		img: '/projects/foodmood.webp',
		link: 'https://foodmood-final.vercel.app',
		stacks: ['VueJS', 'Vite', 'Vuex', 'TailwindCSS'],
		stats: [
			{ label: 'Built in', value: '~2 days' },
			{ label: 'Rebuilt', value: '3 months later' },
			{ label: 'Backend', value: 'None' }
		],
		metadescription:
			'FoodMood: a Vue 3 recipe browser over a public recipe API, rebuilt from Vue CLI to Vite and from the Options API to script setup.',
		sections: [
			{
				heading: 'The problem',
				body: [
					'I wanted to learn Vue 3 properly, and reading about a framework does not tell you what it is like to live in. A recipe browser is a good shape for that: a list, a detail page, a search, and a third-party API that returns awkward data.'
				]
			},
			{
				heading: 'What I built',
				body: [
					'A Vue 3 front end over a public recipe API: a recipe of the day, browsing by category, a detail page with ingredients and method, and live search from the header. There is no backend and no accounts; it is a reading surface over someone else’s data.'
				]
			},
			{
				heading: "Decisions I'd defend",
				body: [
					'Building it twice was the point. The first version was Vue CLI and webpack with the Options API; three months later I rebuilt it on Vite with script setup and the Composition API, and the second version gained the things the first one lacked, which were loading states, an error state and a real not-found page. Rebuilding something small that you already understand is the cheapest way to evaluate a toolchain change, because the only variable is the toolchain.',
					'The honest cost of that rebuild: it dropped TypeScript. I would not make that trade again.'
				]
			},
			{
				heading: 'The tradeoffs',
				body: [
					'The category list is hardcoded rather than fetched. Search fires on every keystroke with no debouncing, and a search with no matches is not handled cleanly, because the API returns null rather than an empty list. There are no tests.'
				]
			},
			{
				heading: 'Where it is now',
				body: [
					'Still deployed, doing exactly what it did. It was a learning exercise and it is presented as one.'
				]
			}
		]
	},
	{
		slug: 'skillup',
		title: 'SkillUp',
		tagline: 'Registering, tracking and certifying 17 tracks of people, on a free tier.',
		img: '/projects/fgcc.webp',
		link: 'https://fgccement.org.ng/skillup',
		github: 'https://github.com/Maestroharyor/fgcc-app',
		stacks: ['NextJS', 'ReactJS', 'TypeScript', 'Supabase', 'Postgres', 'Vitest'],
		stats: [
			{ label: 'Tracks', value: '17' },
			{ label: 'Tests', value: '319' },
			{ label: 'Migrations', value: '11' },
			{ label: 'Shipped in', value: '38 days' }
		],
		metadescription:
			'SkillUp: registration, attendance and certification for a three-day training programme, built on Next.js and Postgres with row-level security and a batched certificate pipeline.',
		sections: [
			{
				heading: 'The problem',
				body: [
					'A free three-day training programme with seventeen tracks, twenty seats each, and a registration desk staffed by volunteers. People sign up for themselves; pastors and parents sign up groups of twenty at once; some walk in on the day with no email address at all. Every one of them needs a seat, a reminder, a record of attendance and a certificate at the end.',
					'And it all had to run on free tiers, which turns out to be the constraint that shaped the most interesting decisions.'
				]
			},
			{
				heading: 'What I built',
				body: [
					'Registration in two modes, one for an individual and one for a submitter entering up to twenty people. Tracks fill to capacity and then overflow to a waitlist with a position. Every registrant gets a reference number issued by a Postgres trigger from a per-track sequence, confirmation email on the way in, reminders on a schedule, a check-in at the desk, and a certificate at the end.',
					'Behind it: eleven migrations, six tables with row-level security, sixteen email templates, an admin area with fifteen pages, and 319 tests run on both pre-commit and pre-push.'
				]
			},
			{
				heading: "Decisions I'd defend",
				body: [
					'Static content lives in source control, state lives in the database. Tracks, schedule, FAQs and facilitators are TypeScript files, so a copy edit is a pull request rather than a migration. The payoff is concrete: the WhatsApp invite link for each track is in that file specifically so a reviewer can verify it, because a wrong invite link is a real incident at an event and a reviewable diff is the cheapest control there is.',
					'The certificate pipeline is built around a number: a hundred emails a day, which is the free plan ceiling. Certificates are queued by track, split across consecutive days under a per-day cap, and sent by a daily job that selects only rows scheduled in the past with no sent timestamp. That query is the idempotency guarantee. Each row carries its own status, error and attempt count, so a failure retries tomorrow without resending everything.',
					'Lagos time is a first-class concern rather than a formatting detail. The server renders in UTC, so a naive date would show the wrong day around midnight, and the check-in boundary is a calendar day. Every display and every day boundary is pinned to Lagos, and the registration window is derived from environment timestamps so the event can be retimed without a deploy.',
					'The reference number embeds the track code, so when someone switches track the number has to be reissued. Rather than patching around it, the trigger was extended to null and regenerate on a track change, on the reasoning that sequences are monotonic and a regenerated number can never collide with an abandoned one.'
				]
			},
			{
				heading: 'What went wrong',
				body: [
					'I shipped an hourly certificate cron for tighter batching and discovered in production that the hosting plan only allows daily crons. The fix was to redesign around a daily job as backstop plus a manual "send the due batch now" button, which is a better design anyway because it puts a human in the loop on the day it matters.',
					'A check constraint blocked a real workflow mid-programme: admins registering walk-ins at the desk were writing a value the original constraint did not permit, and a second migration hours later made phone optional too, because at a desk you sometimes have neither email nor phone. Two schema changes driven by what actually happened at the table.',
					'I also built email confirmation codes for destructive admin actions, then deleted the feature before launch in favour of plain confirmation modals. The migration that created its table stayed in place and a later one dropped the table, rather than editing history, because the first migration had already run in production.'
				]
			},
			{
				heading: 'What I would do differently',
				body: [
					'Row-level security is enabled on every table, but every public write runs through a server action using the service role, so in practice the schema validation is the real gate and the policies are defence in depth against someone talking to the database directly. That is a reasonable architecture, but I would not describe the policies as the authorization layer, because they are not.',
					'The group-registration path has no duplicate check. A submitted registrant whose email already exists hits the unique constraint, gets logged, and is skipped silently, so they vanish from the summary email with nothing surfaced to the submitter. Capacity is also checked and then written without a transaction, so concurrent submissions can overshoot a cap.',
					'Observability is structured logging and nothing else, and some of those log lines carry registrant emails for a youth programme. That is the thing I would fix first.'
				]
			},
			{
				heading: 'Where it is now',
				body: [
					'Live, and it carried the real event: tracks filled to capacity, and six commits went out over the two days the programme was running.'
				]
			}
		]
	},
	{
		slug: 'fovero-tools',
		title: 'Fovero Technologies',
		tagline: 'Four free tools, and a recommender that tells you what it rejected.',
		img: '/projects/fovero.webp',
		link: 'https://foverotechnologies.com',
		stacks: ['NextJS', 'ReactJS', 'TypeScript', 'Supabase', 'Cheerio', 'Resend'],
		stats: [
			{ label: 'Detection rules', value: '116' },
			{ label: 'Tech options scored', value: '38' },
			{ label: 'Scoring dimensions', value: '10' },
			{ label: 'Tests', value: '0' }
		],
		metadescription:
			'Fovero Technologies: a free tool suite with a category-scoped technology recommender, a real-fetch website auditor and a 116-rule stack fingerprinter, built on Next.js.',
		sections: [
			{
				heading: 'The problem',
				body: [
					'An agency site is a brochure, and nobody trusts a brochure. The useful version gives a prospect something before asking for anything, and the thing they most want is an answer to "what should I build this with, and what is wrong with my current site?"'
				]
			},
			{
				heading: 'What I built',
				body: [
					'Four tools. A technology recommender that asks eleven branching questions and returns a stack. A website auditor that fetches a page and scores SEO, accessibility, security and performance against what it actually finds. A stack fingerprinter that identifies 116 technologies from markup, scripts, headers and meta tags. And a digital readiness quiz.',
					'Around them: result caching keyed on a canonicalised URL, a lead scoring model, transactional email, and a follow-up sequence on a schedule.'
				]
			},
			{
				heading: "Decisions I'd defend",
				body: [
					'The recommender is three layers, and the order matters. Filter first, on hard rules: a mobile project cannot use a web-only frontend, a non-technical team cannot use a framework that requires code. Then score, across ten independent dimensions. Then validate across categories, because a coherent stack is not just the top-scoring item in each column: picking a hosted store builder means there is no backend to recommend, and a Flutter app cannot sit on a serverless function that sleeps.',
					'The scoring tables are keyed by technology name inside its own category rather than by tags. The previous engine summed tag weights globally, which let an answer about mobile boost anything tagged mobile regardless of which column it was in. Names cost more to maintain and stop the categories bleeding into each other.',
					'The explanations are a by-product of the filter, not a second list. Every exclusion returns a human-readable reason, and the "why not React, why not AWS" section reuses those strings verbatim. Adding a rule automatically produces the right explanation, so the two cannot drift apart. Telling someone why you rejected the thing they were expecting is most of what makes a recommendation credible.',
					'Every external dependency degrades rather than fails. No performance API key means the auditor falls back to eleven heuristics over the HTML instead of returning nothing. A cache read or write failure is swallowed and the tool still runs. An email send happens off the response path. The scheduled follow-up advances a subscriber stage only after a successful send, so a failure retries tomorrow instead of skipping someone.'
				]
			},
			{
				heading: 'What I would do differently',
				body: [
					'The download button says PDF and returns HTML with a print button. It produces a fine document, but the label writes a cheque the code does not cash, and that is the first thing I would fix.',
					'Two of the eleven questions are collected and then never read by the engine, left behind when the scoring model was replaced. Worse, the feature checkboxes for e-commerce and mobile projects do not overlap with the feature scoring table at all, so on those branches that question contributes exactly nothing. The retired engine is also still imported, so it ships in the bundle unreachable.',
					'There are no tests, on an engine whose whole selling point is that the same answers always produce the same recommendation. That is the single highest-value test suite I am not writing, and a handful of snapshot cases would lock it down.'
				]
			},
			{
				heading: 'Where it is now',
				body: [
					'Live, with all four tools linked from the homepage and feeding a real lead pipeline.'
				]
			}
		]
	},
	{
		slug: 'youtube-scheduler',
		title: 'youtube-scheduler',
		tagline: 'Editing metadata against an API that wipes what you do not resend.',
		img: '/projects/youtube-scheduler.webp',
		github: 'https://github.com/Maestroharyor/youtube-scheduler-and-updater',
		stacks: ['Python', 'YouTube Data API', 'OAuth 2.0', 'GitHub Actions'],
		stats: [
			{ label: 'Tests', value: '163' },
			{ label: 'Dependencies', value: '3' },
			{ label: 'Python versions in CI', value: '4' }
		],
		metadescription:
			'youtube-scheduler: a Python CLI for batch metadata edits against an API that overwrites anything you omit, with read-modify-write merging, a run log and rollback.',
		sections: [
			{
				heading: 'The problem',
				body: [
					'YouTube’s update endpoint is destructive in a way that is easy to miss. It does not patch. For any part you name, every writable property in that part is replaced by what you sent, and anything you omitted is cleared. Send a new description without the tags, and the tags are gone.',
					'That makes a bulk edit across a channel a genuinely dangerous operation, and the danger is silent: the API returns success.'
				]
			},
			{
				heading: 'What I built',
				body: [
					'A command-line tool that edits titles, descriptions and tags and schedules publish times across many videos at once, built so that a mistake is hard to make and recoverable when it happens.',
					'Every video is fetched before anything is planned, the whole batch is planned before anything is written, and the confirmation screen shows the exact quota cost and every skip before the first write goes out.'
				]
			},
			{
				heading: "Decisions I'd defend",
				body: [
					'Bodies are built from the fetched resource, never from scratch, and read-only fields are removed by a denylist rather than selected by an allowlist. The difference matters on a moving API: a writable field the platform adds next year round-trips safely under a denylist, and gets silently wiped under an allowlist.',
					'The real safety mechanism is sending the minimum set of parts. If nothing is being scheduled, the request names only the snippet, so every property in the status part is structurally unreachable rather than carefully preserved. Licence, embeddable and the made-for-kids declaration cannot be touched because the request never mentions the part they live in.',
					'The made-for-kids declaration gets its own prompt that a blanket yes flag cannot bypass. The value the API returns is the effective one and may be inherited from the channel, while the writable field is a per-video declaration, so echoing back what you read would invent a claim the creator never made.',
					'A time with no UTC offset is rejected rather than assumed local. That is the single most common bug in this class of tool: the same input schedules a different moment depending on which machine runs it.',
					'Every run writes a log holding the full before state, the exact request body and the response, and a restore command replays the before state through the same merge logic. The tests are the part I would point at: the stub mutates an in-memory store the same way the real API does, so a wipe in a test looks exactly like a wipe in production.'
				]
			},
			{
				heading: 'The honest gaps',
				body: [
					'The rollback is not total. Only writes recorded as succeeded are candidates, so a write that landed server-side but failed in transit is unrecoverable. One field is never returned by the read endpoint, so it is not in the before state and cannot be restored. And restore is itself a destructive update, which is worth saying out loud.',
					'The run log is also less durable than its own comment claims: it is written at the end rather than in a finally block, so an exception raised outside the per-video handlers exits without writing it. For a tool whose pitch is that everything is recorded and undoable, that is the defect I would fix first, and it is a one-line change.',
					'One display bug: the confirmation screen labels every scheduled time with a fixed West Africa offset. The value sent is correct; the reassurance printed next to it is wrong for anyone outside that zone.'
				]
			},
			{
				heading: 'Where it is now',
				body: [
					'Public and MIT licensed, with 163 tests running against four Python versions in CI, and dependencies pinned with a test that fails if the two dependency files ever disagree.'
				]
			}
		]
	},
	{
		slug: 'tailwind-screen-size',
		title: 'tailwind-screen-size',
		tagline: 'A small dev overlay, and a lesson in package publishing.',
		img: '/projects/tailwind-screen-size.webp',
		link: 'https://www.npmjs.com/package/tailwind-screen-size',
		github: 'https://github.com/Maestroharyor/tailwind-screen-size',
		stacks: ['TypeScript', 'ReactJS', 'Svelte', 'tsup', 'Rollup', 'npm'],
		stats: [
			{ label: 'Releases', value: '10' },
			{ label: 'Frameworks', value: '2' },
			{ label: 'Built in', value: '16 hours' }
		],
		metadescription:
			'tailwind-screen-size: a published npm dev overlay showing the active Tailwind breakpoint, with separate React and Svelte builds from one source.',
		sections: [
			{
				heading: 'The problem',
				body: [
					'Responsive work is a lot of dragging a window edge and guessing which breakpoint you just crossed. The browser tells you the pixel width; it does not tell you whether Tailwind currently thinks you are at md or lg, which is the number you actually need.'
				]
			},
			{
				heading: 'What I built',
				body: [
					'A development-only badge pinned to a corner of the page showing the live viewport dimensions and the active breakpoint label, with theme and position options. It ships as one npm package with separate React and Svelte entry points built from a shared source, released by a GitHub Actions pipeline on push.'
				]
			},
			{
				heading: "Decisions I'd defend",
				body: [
					'Publishing both frameworks from one package rather than two. The types and the detection helpers are genuinely shared, and a developer who moves between a React app and a Svelte app installs one thing.',
					'Rendering only in development, gated rather than left to the consumer to remember to strip. A debug overlay that can reach production is worse than no overlay.'
				]
			},
			{
				heading: 'What I got wrong, and it is worth stating plainly',
				body: [
					'The package is published, and the React entry point does not resolve. The exports map names files that the build does not emit under those names: the bundler writes ESM as one extension and CommonJS as another, and the map was written against the wrong pair. The result is that the first usage example in the README fails with a module-not-found error, and has done since the version that introduced the map. The stylesheet subpath points at a file that is never built, and the Svelte type declarations are emitted one directory deeper than the map looks for them.',
					'The Svelte component also reads an environment variable without the guard its React sibling has, so it throws in a plain browser build. The two implementations were written separately and have quietly diverged in several other places: different theme palettes, and the Svelte badge silently dropped the height from the dimensions it advertises.',
					'There are no tests. For a package shipping two hand-maintained implementations of one component, that is exactly why the divergence went unnoticed, and with 814 lifetime downloads nobody has reported any of it.',
					'The lesson is not about Tailwind or about Svelte. It is that publishing is its own discipline: an exports map is a contract, and the only way to know it holds is to install the tarball in a clean project and import it. I did not, and it shipped broken through ten releases.'
				]
			},
			{
				heading: 'Where it is now',
				body: [
					'On npm at 1.0.8, unchanged since the day it was published. The packaging fixes are small and known; they are next.'
				]
			}
		]
	},
	{
		slug: 'mealflow',
		title: 'MealFlow',
		tagline: 'The same product, built three times, to find out what the runtime costs you.',
		img: '/projects/mealflow.webp',
		link: 'https://meaflow-app.vercel.app',
		github: 'https://github.com/Maestroharyor/Mealflow-flutter',
		stacks: ['Flutter', 'React Native', 'NextJS', 'TypeScript', 'Firebase', 'Riverpod'],
		stats: [
			{ label: 'Runtimes', value: '3' },
			{ label: 'Span', value: '10 weeks' },
			{ label: 'Shared code', value: 'None' }
		],
		metadescription:
			'MealFlow: one meal-planning product rebuilt three times in ten weeks across React Native, Flutter and a Next.js PWA, to compare the runtimes against a fixed spec.',
		sections: [
			{
				heading: 'The problem',
				body: [
					'Framework comparisons are usually written by people who built a to-do list in each, which tells you about the tutorial and nothing about the framework. I wanted the comparison where the product is fixed and non-trivial and the only variable is the runtime.',
					'The product: a weekly meal planner, a recipe browser, and a categorised grocery list with price tracking and multi-month planning.'
				]
			},
			{
				heading: 'What I built',
				body: [
					'Three independent implementations of the same spec in ten weeks. React Native on Expo with file-based routing, Zustand and NativeWind. Flutter with Riverpod, go_router and Hive. A Next.js PWA on React 19 with Firebase authentication and Firestore.',
					'Recipe discovery in all three comes from the same public recipe API, but there is no shared code, no shared backend and no shared schema. Three clients, three data layers, three architectures.'
				]
			},
			{
				heading: 'What the comparison actually showed',
				body: [
					'The Flutter build produced the cleanest architecture. A repository layer over local storage, with the API client and the persistence behind the same interface, fell out of the language and the ecosystem almost by default. It is also the only one of the three I would call structurally tidy.',
					'The Next.js build produced the only genuinely multi-user product. Once real accounts and a real database were cheap to reach for, the features changed shape: shared household groups, email invitations, live sync between devices. That is not a framework capability, it is what proximity to a backend does to the scope you attempt.',
					'The React Native build produced the most production-grade tooling around the least finished app. It inherited a mature starter, so it has component tests, end-to-end flows and a full CI matrix, and its login issues a hardcoded token to a backend that does not exist. That gap is the most useful thing the exercise taught me: tooling maturity and product maturity are independent, and a repository can look far more finished than it is.'
				]
			},
			{
				heading: 'The honest state of each',
				body: [
					'The Next.js one is the most complete and the only one with real persistence, but it was scaffolded from a generator, its README still describes a database it does not use, and its offline story is asset caching plus persisted local state rather than durable offline writes: the pending-operation queue is deliberately excluded from storage, so a reload before reconnecting loses it.',
					'The Flutter one is a complete single-user app with no accounts and no sync. Its only test file is the untouched framework template, which references a class the app does not define and would not compile.',
					'The React Native one still ships the starter kit’s demo API and feed screens, and its grocery data lives in component state.',
					'None of them is a product. They are three answers to one question, and the answer was worth the ten weeks.'
				]
			}
		]
	},
	{
		slug: 'xedla-pay',
		title: 'Xedla Pay',
		tagline: 'Wallets, bank rails and escrow, across four backend services.',
		img: '/projects/xedla.webp',
		link: 'https://www.xedla.com',
		stacks: ['TypeScript', 'NodeJS', 'ExpressJS', 'MongoDB', 'Redis', 'Flutter'],
		stats: [
			{ label: 'Services I lead', value: '4' },
			{ label: 'Transaction types', value: '10' },
			{ label: 'Live since', value: '2023' },
			{ label: 'App stores', value: '2' }
		],
		metadescription:
			'Xedla Pay: a Nigerian payments product with wallets, bank-rail transfers, virtual cards and escrow. I am the primary author of four of its backend services.',
		sections: [
			{
				heading: 'The problem',
				body: [
					'Buying from a stranger online in Nigeria is a trust problem before it is a payments problem. The seller will not ship until the money moves; the buyer will not send money until the goods arrive. The usual resolution is a WhatsApp argument.',
					'The product answers that with escrow: funds are held against a transaction, released when delivery is confirmed, and appealed to a human when it is not. That turns a trust problem into a state machine, and the state machine holds other people’s money.'
				]
			},
			{
				heading: 'What I built',
				body: [
					'I am the primary author of four of the backend services: identity and accounts, escrow, transactions, and virtual cards. Node and Express on MongoDB with Redis, each service owning its own data and deployed on its own pipeline, with a test suite and staging and production workflows.',
					'The product moves money on banking-as-a-service rails through a licensed partner rather than a card gateway, with identity verification tiered against a KYC provider, so an account’s limits are a function of how much of itself it has proved.',
					'I also wrote the request-encryption layer that sits between the clients and the API, and contributed the virtual-card and escrow screens to the Flutter app, which is live on both app stores.'
				]
			},
			{
				heading: "Decisions I'd defend",
				body: [
					'Escrow is its own service with its own boundary, and the clients honour that boundary rather than pretending it does not exist. Escrow is the only part of the system holding funds that belong to neither party yet, and it is the part most likely to need a human in the loop. Keeping it separately deployable means a bad release elsewhere cannot take custody logic with it.',
					'No money moves from the admin console on a single click. Releasing or reversing an escrow is modelled as a typed intent behind a confirmation step; rejecting a verification requires a written reason; issuing a manual credit enforces a ceiling and a justification before the request is made. Those all pair with a server-side action log, so every movement has an operator, an amount and a reason attached to it.',
					'Authenticated requests from the console go through one wrapper rather than being scattered across components, so the bearer token, a request timeout and the refresh-and-retry behaviour are defined once. The argument for that pattern is visible in the codebase: the one screen that bypasses it is also the one screen that does not work.'
				]
			},
			{
				heading: 'What I got wrong',
				body: [
					'I shipped client-side encryption of request bodies from the admin console, deriving the key from a build-time public environment variable with a fallback to a hardcoded string. It could not have worked as a security control, because a key compiled into a browser bundle is not a secret, and the fallback meant a misconfigured build would encrypt with a value anyone could guess rather than failing loudly.',
					'It also never functioned: the console derived the key one way and the server derived it another, so the two could not agree. It was removed a few weeks later, and the honest part of the story is why. It was not removed because anyone caught the cryptography. It was removed because it broke.',
					'The lesson stuck. My own implementation of the same layer on the mobile client keeps the key off the public surface, and the server refuses to start without one rather than defaulting. A control that cannot fail loudly is not a control.',
					'Separately, I hand-rolled a container build and deploy pipeline for one of the front ends, pushing an image to a registry and replacing the container over SSH. It has exactly one run in its history and that run failed. The site it was written for is served by managed hosting instead, and the pipelines I would actually point at are the ones on the backend services, which run on every pull request.'
				]
			},
			{
				heading: 'Where it is now',
				body: [
					'Live, with the mobile app on the App Store and Google Play and the services in production. The work continues under contract alongside my other roles.'
				]
			}
		]
	}
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((study) => study.slug === slug);
