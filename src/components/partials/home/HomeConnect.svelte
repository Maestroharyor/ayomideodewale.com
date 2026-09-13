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
	import { socialMenu } from '../../../data/menu';
	import BraandlyIcon from '../../elements/BraandlyIcon.svelte';
	import Tooltip from '../../elements/Tooltip.svelte';

	// One source for the links (src/data/menu.ts); the icon is presentation and
	// is mapped here. This block used to be a second hardcoded copy of the list.
	const socialIcons: Record<string, typeof FaBrandsGithub> = {
		GitHub: FaBrandsGithub,
		LinkedIn: FaBrandsLinkedin,
		X: FaBrandsXTwitter,
		Instagram: FaBrandsInstagram,
		TikTok: FaBrandsTiktok,
		Facebook: FaBrandsFacebook
	};
</script>

<div class="pt-20 relative max-w-[1200px] mx-auto px-5">
	<img
		class="w-30 m-auto mb-2 h-[20px]"
		src="/doodles/lineBreak.svg"
		alt="doodle-line"
		loading="lazy"
	/>
	<div class="pt-14 pb-28 flex flex-col justify-center items-center">
		<div class="max-w-[600px] mx-auto text-center">
			<h2 class="text-4xl md:text-5xl font-bold mb-3 text-primary-500 dark:text-warning-500">
				Connect With Me
			</h2>
			<p class="text-xl mb-8">
				Got a question or proposal, or just want to say hello? You can connect with me on Social:
			</p>
			<div class="flex gap-5 text-3xl mb-8 justify-center flex-wrap">
				{#each socialMenu as social (social.link)}
					<Tooltip tooltip={social.title}>
						<a
							href={social.link}
							target="_blank"
							rel="noreferrer"
							class="block text-primary-500 hover:text-primary-hov dark:text-white dark:hover:text-warning-500"
							aria-label={social.title}
						>
							<!-- currentColor, so the anchor's text-primary-500 / dark:text-white classes drive
					 it. A hardcoded #fff rendered these invisible in light mode. -->
							{#if social.title === 'Braandly'}
								<BraandlyIcon size={35} />
							{:else}
								<Icon src={socialIcons[social.title]} size="35" color="currentColor" />
							{/if}
						</a>
					</Tooltip>
				{/each}
			</div>
		</div>

		<p class="mb-9 text-lg text-gray-600 dark:text-gray-200">OR</p>

		<a
			href="/contact"
			class="inline-block rounded-full border-2 border-primary-500 px-8 py-2 text-lg font-medium text-primary-500 transition duration-300 ease-in-out hover:border-primary-hov hover:text-dark-theme dark:border-white dark:text-gray-200 dark:hover:border-warning-500 dark:hover:text-warning-500"
		>
			Send me a message
		</a>
	</div>
</div>
