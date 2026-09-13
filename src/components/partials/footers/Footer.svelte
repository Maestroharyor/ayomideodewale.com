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
	import { page } from '$app/state';
	import { footerMenu, socialMenu } from '../../../data/menu';
	import BraandlyIcon from '../../elements/BraandlyIcon.svelte';
	import { resumeContact } from '../../../data/resume/shared';

	const currentYear = new Date().getFullYear();

	// $derived rather than a page.subscribe() in onMount, so this is right during
	// SSR and on first paint instead of flashing.
	const currentPage = $derived(page.route.id ?? '/');
	const currentMenu = $derived(
		currentPage === '/'
			? footerMenu.filter((menu) => menu.link !== '/')
			: footerMenu.filter((menu) => !menu.isHomeLink)
	);

	// socialMenu is the one list; HomeConnect reads the same source. The icon is
	// presentation, so it is mapped here rather than stored alongside the data.
	const socialIcons: Record<string, typeof FaBrandsGithub> = {
		GitHub: FaBrandsGithub,
		LinkedIn: FaBrandsLinkedin,
		X: FaBrandsXTwitter,
		Instagram: FaBrandsInstagram,
		TikTok: FaBrandsTiktok,
		Facebook: FaBrandsFacebook
	};
</script>

<footer
	class="relative border-t border-gray-200 pt-16 pb-10 dark:border-primary-600 dark:text-white"
>
	<div class="mx-auto max-w-[1200px] px-5">
		<div class="grid gap-12 md:grid-cols-[1.3fr_0.9fr_1.1fr]">
			<div>
				<a href="/" class="inline-flex items-center gap-2">
					<img src="/logos/light_logo.svg" alt="" width="36" height="36" />
					<span class="text-lg font-bold">Ayomide Odewale</span>
				</a>
				<p class="mt-4 max-w-sm text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
					Fullstack engineer, seven years in. I build products end to end and run the infrastructure
					under them.
				</p>
				<p class="mt-3 text-sm text-gray-500 dark:text-gray-400">{resumeContact.location}</p>
			</div>

			<nav aria-labelledby="footer-explore">
				<h2
					id="footer-explore"
					class="text-sm font-bold tracking-widest uppercase text-primary-500 dark:text-warning-500"
				>
					Explore
				</h2>
				<ul class="mt-4 flex flex-col gap-2.5">
					{#each currentMenu as menu (menu.title)}
						<li>
							<a
								href={menu.link}
								class={`text-[15px] transition duration-300 ease-in-out ${
									currentPage === menu.link
										? 'text-dark-theme dark:text-warning-500'
										: 'text-gray-600 hover:text-primary-500 dark:text-gray-300 dark:hover:text-warning-500'
								}`}
							>
								{menu.title}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<div>
				<h2
					class="text-sm font-bold tracking-widest uppercase text-primary-500 dark:text-warning-500"
				>
					Elsewhere
				</h2>
				<div class="mt-4 grid w-max grid-cols-4 gap-3">
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
				</div>
				<a
					href={`mailto:${resumeContact.email}`}
					class="mt-5 inline-block text-[15px] text-gray-600 underline underline-offset-4 transition duration-300 hover:text-primary-500 dark:text-gray-300 dark:hover:text-warning-500"
				>
					{resumeContact.email}
				</a>
			</div>
		</div>

		<div
			class="mt-12 flex flex-col items-center gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:justify-between dark:border-primary-600"
		>
			<p class="text-sm text-gray-600 dark:text-gray-300">
				&copy; {currentYear} Ayomide Odewale (Maestro)
			</p>

			<div class="flex items-center gap-5">
				<span
					class="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400"
				>
					Built with
					<img src="/svgs/svelte.svg" width="18" height="18" alt="Svelte" title="Svelte" />
					<img
						src="/svgs/tailwindcss.svg"
						width="18"
						height="18"
						alt="TailwindCSS"
						title="TailwindCSS"
					/>
				</span>
				<a
					class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-bold transition duration-300 hover:border-gray-500 hover:text-gray-700 dark:border-primary-600 dark:hover:border-warning-500 dark:hover:text-warning-500"
					href="https://github.com/Maestroharyor/ayomideodewale.com"
					target="_blank"
					rel="noreferrer"
				>
					<img src="/svgs/github.svg" width="16" height="16" alt="" />
					<span>View source</span>
				</a>
			</div>
		</div>
	</div>
</footer>
