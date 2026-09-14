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
	import { socialMenu } from '../../data/menu';
	import { resumeContact } from '../../data/resume/shared';

	const metadescription =
		'Get in touch with Ayomide Odewale, a fullstack engineer based in Lagos working remotely with teams worldwide. Questions, proposals or just hello.';

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

<SeoMeta title="Get In Touch" {metadescription} path="/contact" />

<main class="mx-auto max-w-[1200px] px-5 py-20 md:py-28">
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
						<a
							href={`mailto:${resumeContact.email}`}
							class="text-lg text-gray-700 underline underline-offset-4 transition duration-300 hover:text-primary-500 dark:text-gray-200 dark:hover:text-warning-500"
						>
							{resumeContact.email}
						</a>
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

		<div
			class="rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm md:p-8 dark:border-primary-600 dark:bg-primary-900/30"
		>
			<ContactForm />
		</div>
	</div>
</main>
