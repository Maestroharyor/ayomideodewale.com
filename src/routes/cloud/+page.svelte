<script lang="ts">
	import PageHeading from '../../components/elements/PageHeading.svelte';
	import SeoMeta from '../../components/elements/SEOMeta.svelte';

	const metadescription =
		'Fullstack engineer specialising in cloud architecture and platform work. AWS managed with Terraform, Docker, CI, and self-hosted monitoring written in Go. AWS Solutions Architect Associate in progress.';

	// Pre-certification framing throughout: nothing here reads as though SAA-C03
	// is done, and the roadmap carries no dates because the exam is not booked.
	//
	// Every claim below was checked against the source it describes. The Xedla
	// entry in particular distinguishes what is applied in production from what
	// is written and validated, because they are not the same thing.
	const stack = [
		{ name: 'AWS', src: '/svgs/aws.svg' },
		{ name: 'Terraform', src: '/svgs/terraform.svg' },
		{ name: 'Docker', src: '/svgs/docker.svg' },
		{ name: 'Go', src: '/svgs/go.svg' }
	];

	const infrastructure = [
		{
			title: 'AWS with Terraform',
			icon: '/svgs/terraform.svg',
			body: 'At Xedla Pay I author the AWS infrastructure as code. Applied in production: S3 and the remote state backend, with versioning, server-side encryption and public-access blocking. A second, validated module defines a staging environment of VPC and subnets, EC2, ECS, ECR, CloudWatch and IAM roles and policies.'
		},
		{
			title: 'Production ownership',
			icon: '/svgs/nodejs.svg',
			body: 'At Kikokushijo Academy I own the deploy path for the learning platform: environments, releases, the database and hosting configuration. That is fullstack ownership including deployment rather than infrastructure engineering — the hosting itself is managed.'
		},
		{
			title: 'Multi-tenant SaaS',
			icon: '/svgs/typescript.svg',
			body: 'I build and operate Braandly and MosesTab. Tenant isolation, access control, hosting, monitoring and cost all sit with me. Braandly runs as a Docker image on a VPS behind a CDN, with Redis-backed queues, twenty-odd scheduled jobs and a self-built OAuth 2.1 server; MosesTab gives every church its own Stripe Connect account.'
		},
		{
			title: 'Agency infrastructure',
			icon: '/svgs/docker.svg',
			body: 'Through Fovero I ran provisioning, deployment, DNS, certificates and uptime for client projects from 2020 onward. Unglamorous, and the reason I know what breaks.'
		}
	];

	const tools = [
		{
			name: 'healthcheck-service',
			href: 'https://github.com/MaestroHaryor/healthcheck-service',
			body: 'A self-hosted uptime monitor in Go. Checks one endpoint on a schedule and alerts to Slack and email. Written because the hosted options cost more than the thing they were watching.'
		},
		{
			name: 'supabase-pings',
			href: 'https://github.com/MaestroHaryor/supabase-pings',
			body: 'A single Go binary that keeps free-tier Supabase projects from pausing. Scheduled pings, nothing else.'
		},
		{
			name: 'simple-go-webserver',
			href: 'https://github.com/MaestroHaryor/simple-go-webserver',
			body: "A notes server built on Go's standard net/http with SQLite and no framework. Written to understand what the frameworks are doing."
		}
	];

	const security = [
		{
			title: 'Payment and transaction flows',
			body: 'At Helppo Africa and VeendHQ I worked on the security controls around money movement, for platforms serving 10,000+ and 15,000+ users respectively. In MosesTab, giving runs through per-church Stripe Connect accounts so funds never pool in a platform balance.'
		},
		{
			title: 'Multi-tenant access control',
			body: 'Braandly scopes every collection to a workspace, enforces it in three layers, and returns 404 rather than 403 on a cross-tenant request so the API never confirms another tenant’s record exists. A live audit once found roles unenforced on write endpoints — found, fixed, and worth saying out loud.'
		},
		{
			title: 'Auth built to spec',
			body: 'Braandly’s public API is fronted by a hand-built OAuth 2.1 server: authorization-code only, PKCE mandatory, RS256 access tokens verified statelessly, and opaque refresh tokens hashed at rest and rotated on use, with reuse detection that revokes the whole token family.'
		},
		{
			title: 'Writing and teaching',
			body: "I've published explainers on least-privilege access and blast radius, and on supply-chain attacks against npm."
		}
	];

	// `logo` is only set where the mark is actually that vendor's: CompTIA is not
	// an AWS certification and should not carry the AWS wordmark.
	const roadmap = [
		{
			name: 'AWS Solutions Architect Associate (SAA-C03)',
			status: 'In progress',
			active: true,
			logo: '/svgs/aws.svg'
		},
		{ name: 'CompTIA Security+', status: 'Planned', active: false, logo: null },
		{ name: 'AWS Security Specialty', status: 'Planned', active: false, logo: '/svgs/aws.svg' }
	];
</script>

<SeoMeta title="Cloud &amp; Platform" {metadescription} path="/cloud" />

<main>
	<PageHeading
		title="Cloud &amp; Platform"
		description="Seven years building systems, now going deeper on how they're run. I'm a fullstack engineer specialising in cloud architecture and platform work: provisioning with Terraform, operating what I build, and understanding the failure modes before they find me."
	/>

	<div class="mx-auto max-w-[1100px] px-5 pb-28">
		<!-- Stack strip, directly under the intro, so the page states its subject
			 visually before anyone reads a paragraph. -->
		<ul class="flex flex-wrap items-center justify-center gap-8 md:gap-14 pb-20">
			{#each stack as item (item.name)}
				<li class="flex flex-col items-center gap-2">
					<img
						src={item.src}
						alt=""
						width="48"
						height="48"
						loading="lazy"
						class="h-12 w-12 md:h-14 md:w-14"
					/>
					<span class="text-sm font-medium text-slate-600 dark:text-slate-300">{item.name}</span>
				</li>
			{/each}
		</ul>

		<div class="space-y-20">
			<section>
				<h2 class="mb-8 text-3xl font-bold text-primary-500 md:text-4xl dark:text-warning-500">
					Infrastructure I've run
				</h2>
				<div class="grid gap-5 md:grid-cols-2">
					{#each infrastructure as item (item.title)}
						<div
							class="h-full rounded-2xl border border-gray-200 bg-[rgba(0,0,0,0.015)] p-6 transition-all duration-300 hover:-translate-y-[2px] hover:border-primary-300 hover:shadow-md dark:border-primary-600 dark:bg-[rgba(255,255,255,0.02)] dark:hover:border-warning-500"
						>
							<div class="mb-3 flex items-center gap-3">
								<img src={item.icon} alt="" width="28" height="28" loading="lazy" class="h-7 w-7" />
								<h3 class="text-xl font-bold">{item.title}</h3>
							</div>
							<p class="leading-relaxed">{item.body}</p>
						</div>
					{/each}
				</div>
			</section>

			<section>
				<h2 class="mb-8 text-3xl font-bold text-primary-500 md:text-4xl dark:text-warning-500">
					Tools I've built
				</h2>
				<div class="grid gap-5 md:grid-cols-3">
					{#each tools as tool (tool.name)}
						<a
							href={tool.href}
							target="_blank"
							rel="noreferrer"
							class="group flex h-full flex-col rounded-2xl border border-gray-200 bg-[rgba(0,0,0,0.015)] p-6 transition-all duration-300 hover:-translate-y-[2px] hover:border-primary-300 hover:shadow-md dark:border-primary-600 dark:bg-[rgba(255,255,255,0.02)] dark:hover:border-warning-500"
						>
							<div class="mb-3 flex items-center justify-between gap-3">
								<img
									src="/svgs/go.svg"
									alt="Go"
									width="32"
									height="32"
									loading="lazy"
									class="h-8 w-8"
								/>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
							<h3 class="mb-2 font-mono text-lg font-bold text-primary-500 dark:text-warning-500">
								{tool.name}
							</h3>
							<p class="text-[15px] leading-relaxed">{tool.body}</p>
						</a>
					{/each}
				</div>
			</section>

			<section>
				<h2 class="mb-8 text-3xl font-bold text-primary-500 md:text-4xl dark:text-warning-500">
					Security work
				</h2>
				<div class="grid gap-x-10 gap-y-8 md:grid-cols-2">
					{#each security as item (item.title)}
						<div class="border-l-2 border-primary-300 pl-5 dark:border-primary-600">
							<h3 class="mb-2 text-xl font-bold">{item.title}</h3>
							<p class="leading-relaxed">{item.body}</p>
						</div>
					{/each}
				</div>
			</section>

			<section>
				<h2 class="mb-8 text-3xl font-bold text-primary-500 md:text-4xl dark:text-warning-500">
					Certification roadmap
				</h2>
				<ol class="space-y-3">
					{#each roadmap as cert (cert.name)}
						<li
							class="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 {cert.active
								? 'border-primary-400 bg-[rgba(66,72,158,0.04)] dark:border-warning-500 dark:bg-[rgba(255,169,0,0.06)]'
								: 'border-gray-200 dark:border-primary-600'}"
						>
							<span class="flex items-center gap-3 text-lg">
								{#if cert.logo}
									<img
										src={cert.logo}
										alt=""
										width="24"
										height="24"
										loading="lazy"
										class="h-6 w-6"
									/>
								{:else}
									<span
										class="h-6 w-6 shrink-0 rounded-full border-2 border-gray-300 dark:border-primary-600"
										aria-hidden="true"
									></span>
								{/if}
								{cert.name}
							</span>
							<span
								class="rounded-full border px-3 py-1 text-sm font-medium {cert.active
									? 'border-primary-500 text-primary-500 dark:border-warning-500 dark:text-warning-500'
									: 'border-gray-300 text-slate-500 dark:border-gray-600 dark:text-slate-400'}"
							>
								{cert.status}
							</span>
						</li>
					{/each}
				</ol>
			</section>

			<section
				class="rounded-2xl border border-gray-200 px-6 py-12 text-center dark:border-primary-600"
			>
				<h2 class="mb-4 text-3xl font-bold text-primary-500 md:text-4xl dark:text-warning-500">
					Get in touch
				</h2>
				<p class="mx-auto mb-8 max-w-[620px] text-lg">
					Building something on AWS, or looking for someone who'll own the deploy path as well as
					the code? Let's talk.
				</p>
				<a
					href="/contact"
					class="inline-block rounded-full border-2 border-primary-500 px-8 py-2 text-lg font-medium text-primary-500 transition duration-300 ease-in-out hover:border-dark-theme hover:text-dark-theme dark:border-white dark:text-gray-200 dark:hover:border-warning-500 dark:hover:text-warning-500"
				>
					Get In Touch
				</a>
			</section>
		</div>
	</div>
</main>
