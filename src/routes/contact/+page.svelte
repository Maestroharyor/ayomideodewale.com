<script lang="ts">
	import { Icon } from 'svelte-icons-pack';
	import {
		FaBrandsGithub,
		FaBrandsLinkedin,
		FaBrandsXTwitter,
		FaBrandsInstagram,
		FaBrandsTiktok,
		FaBrandsFacebook
	} from 'svelte-icons-pack/fa';
	import BraandlyIcon from '../../components/elements/BraandlyIcon.svelte';
	import ContactForm from '../../components/elements/ContactForm.svelte';
	import SeoMeta from '../../components/elements/SEOMeta.svelte';
	import ObfuscatedContact from '../../components/elements/ObfuscatedContact.svelte';
	import { breadcrumbNode, graph, webPageNode, webSiteNode } from '../../lib/schema';
	import { absoluteUrl } from '../../data/site';
	import { socialMenu } from '../../data/menu';
	import { resumeContact } from '../../data/resume/shared';

	const metadescription =
		'Get in touch with Ayomide Odewale, a fullstack engineer based in Lagos working remotely with teams worldwide. Questions, proposals or just hello.';

	const title = 'Get In Touch';

	const schema = graph([
		webSiteNode(),
		webPageNode({ path: '/contact', title, description: metadescription }),
		breadcrumbNode([
			{ name: 'Home', path: '/' },
			{ name: 'Get in Touch', path: '/contact' }
		])
	]);

	// The form is the primary path, but a recruiter with a shortlist open wants to
	// paste an address into their own client. Both are offered rather than one.
	const socialIcons: Record<string, typeof FaBrandsGithub> = {
		GitHub: FaBrandsGithub,
		LinkedIn: FaBrandsLinkedin,
		X: FaBrandsXTwitter,
		Instagram: FaBrandsInstagram,
		TikTok: FaBrandsTiktok,
		Facebook: FaBrandsFacebook
	};
</script>

<SeoMeta
	{title}
	{metadescription}
	path="/contact"
	image={absoluteUrl('/og/contact.png')}
	imageAlt="Contact Ayomide Odewale"
	{schema}
/>

<main id="main" tabindex="-1" class="mx-auto max-w-[1200px] px-5 py-20 md:py-28">
	<div class="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
		<div>
			<h1 class="text-4xl font-bold text-primary-500 md:text-5xl dark:text-warning-500">
				Get in touch
			</h1>
			<p class="mt-5 text-xl leading-relaxed text-gray-600 dark:text-gray-300">
				Hiring, building something, or just want to talk shop? Send a message and I&apos;ll get back
				to you.
			</p>

			<dl class="mt-10 space-y-6">
				<div>
					<dt
						class="text-sm font-bold tracking-widest uppercase text-primary-500 dark:text-warning-500"
					>
						Email
					</dt>
					<dd class="mt-1.5">
						<ObfuscatedContact
							value={resumeContact.email}
							scheme="mailto"
							class="text-lg text-gray-700 underline underline-offset-4 transition duration-300 hover:text-primary-500 dark:text-gray-200 dark:hover:text-warning-500"
						/>
					</dd>
				</div>
				<div>
					<dt
						class="text-sm font-bold tracking-widest uppercase text-primary-500 dark:text-warning-500"
					>
						Based in
					</dt>
					<dd class="mt-1.5 text-lg text-gray-700 dark:text-gray-200">{resumeContact.location}</dd>
				</div>
				<div>
					<dt
						class="text-sm font-bold tracking-widest uppercase text-primary-500 dark:text-warning-500"
					>
						Elsewhere
					</dt>
					<dd class="mt-3 grid w-max grid-cols-4 gap-3">
						{#each socialMenu as social (social.link)}
							<a
								href={social.link}
								target="_blank"
								rel="noreferrer"
								aria-label={social.title}
								title={social.title}
								class="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition duration-300 hover:border-primary-500 hover:text-primary-500 dark:border-primary-600 dark:text-gray-300 dark:hover:border-warning-500 dark:hover:text-warning-500"
							>
								{#if social.title === 'Braandly'}
									<BraandlyIcon size={20} />
								{:else}
									<Icon src={socialIcons[social.title]} size="20" color="currentColor" />
								{/if}
							</a>
						{/each}
					</dd>
				</div>
			</dl>

			<p class="mt-10 text-[15px] text-gray-500 dark:text-gray-400">
				Looking for the short version? <a
					href="/resume"
					class="underline underline-offset-4 transition duration-300 hover:text-primary-500 dark:hover:text-warning-500"
					>My resume is here</a
				>.
			</p>
		</div>

		<!--
			Glass needs something behind it to smear. The page is a flat navy with a
			few particles, so a translucent panel over it just reads as a lighter
			navy no matter how much blur is applied. These two blurred colour fields
			sit behind the card and give the backdrop-filter something to work with;
			without them the effect is invisible.

			aria-hidden and pointer-events-none: they are paint, not content.
		-->
		<div class="relative isolate">
			<div
				class="pointer-events-none absolute top-0 right-0 -z-10 h-64 w-64 rounded-full bg-primary-500/40 blur-3xl dark:bg-primary-400/25"
				aria-hidden="true"
			></div>
			<div
				class="pointer-events-none absolute bottom-0 left-0 -z-10 h-72 w-72 rounded-full bg-warning-500/25 blur-3xl dark:bg-warning-500/15"
				aria-hidden="true"
			></div>

			<!--
				The inset white line along the top edge is what sells the material: it
				reads as light catching a bevel. Without it a translucent panel looks
				like flat tint rather than a pane sitting above the page.
			-->
			<div
				class="rounded-2xl border border-white/50 bg-white/40 p-6 shadow-2xl shadow-primary-900/10 ring-1 ring-white/40 ring-inset backdrop-blur-2xl backdrop-saturate-150 md:p-8 dark:border-white/15 dark:bg-white/[0.07] dark:shadow-black/30 dark:ring-white/10"
			>
				<ContactForm />
			</div>
		</div>
	</div>
</main>
