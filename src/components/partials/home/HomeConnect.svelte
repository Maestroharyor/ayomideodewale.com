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
	import { modal } from '../../ui/modal-state.svelte';
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

	const openModal = () => {
		modal.open();
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
					<!-- <Tooltip title={social.title} class=""> -->
					<Tooltip tooltip={social.title}>
						<a
							href={social.link}
							target="_blank"
							rel="noreferrer"
							class="block text-primary-500 hover:text-primary-hov dark:text-white dark:hover:text-warning-500"
							aria-label={social.title}
						>
							<!-- <div class="card p-4 variant-filled" data-popup="popupHover">
								<p class="text-lg">{social.title}</p>
								<div class="arrow variant-filled-secondary" />
							</div> -->

							<!-- currentColor, so the anchor's text-primary-500 / dark:text-white classes drive
					 it. A hardcoded #fff rendered these invisible in light mode. -->
							{#if social.title === 'Braandly'}
								<BraandlyIcon size={35} />
							{:else}
								<Icon src={socialIcons[social.title]} size="35" color="currentColor" />
							{/if}
						</a>
					</Tooltip>
					<!-- </Tooltip> -->
				{/each}
			</div>
		</div>

		<p class="mb-9 text-lg text-gray-600 dark:text-gray-200">OR</p>

		<button
			class="border-2 rounded-full px-8 py-2 border-primary-500 hover:border-primary-hov dark:border-white text-lg font-medium text-primary-500 hover:text-dark-theme transition duration-400 ease-in-out dark:text-gray-200 dark:hover:text-warning-500 dark:hover:border-warning-500"
			onclick={() => openModal()}
		>
			Get in Touch
		</button>
	</div>
</div>
