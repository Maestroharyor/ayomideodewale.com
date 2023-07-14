<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';

	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FaGithub from 'svelte-icons-pack/fa/FaBrandsGithub';
	import FaLinkedin from 'svelte-icons-pack/fa/FaBrandsLinkedin';
	import FaTwitter from 'svelte-icons-pack/fa/FaBrandsTwitter';
	import FaFacebook from 'svelte-icons-pack/fa/FaBrandsFacebook';
	import FaInstagram from 'svelte-icons-pack/fa/FaBrandsInstagram';
	import Tooltip from '../../elements/Tooltip.svelte';

	const socials = [
		{
			title: 'Github',
			icon: FaGithub,
			link: 'https://github.com/MaestroHaryor'
		},
		{
			title: 'LinkedIn',
			icon: FaLinkedin,
			link: 'https://www.linkedin.com/in/ayomide-odewale/'
		},
		{
			title: 'Twitter',
			icon: FaTwitter,
			link: 'https://twitter.com/MaestroHaryor'
		},
		{
			title: 'Facebook',
			icon: FaFacebook,
			link: 'https://web.facebook.com/ayomide.odewale.125'
		},
		{
			title: 'Instagram',
			icon: FaInstagram,
			link: 'https://instagram.com/maestroharyorjoshua'
		}
	];

	const modal: ModalSettings = {
		type: 'component',
		// Pass the component registry key as a string:
		component: 'contactComponent'
	};

	const openModal = () => {
		modalStore.trigger(modal);
	};
</script>

<div class="pt-20 relative max-w-[1200px] mx-auto px-5">
	<img class="w-30 m-auto mb-2" src="/doodles/lineBreak.svg" alt="doodle-line" />
	<div class="pt-14 pb-28 flex flex-col justify-center items-center">
		<div class="max-w-[600px] mx-auto text-center">
			<h2 class="text-4xl md:text-5xl font-bold mb-3 text-primary dark:text-warning">
				Connect With Me
			</h2>
			<p class="text-xl mb-8">
				Got a question or proposal, or just want to say hello? You can connect with me on Social:
			</p>
			<div class="flex gap-5 text-white dark:text-dark text-3xl mb-8 justify-center flex-wrap">
				{#each socials as social (social.link)}
					<!-- <Tooltip title={social.title} class=""> -->
					<Tooltip tooltip={social.title}>
						<a
							href={social.link}
							target="_blank"
							rel="noreferrer"
							class="block text-primary hover:text-primary-hov dark:text-white dark:hover:text-warning"
							aria-label={social.title}
						>
							<!-- <div class="card p-4 variant-filled" data-popup="popupHover">
								<p class="text-lg">{social.title}</p>
								<div class="arrow variant-filled-secondary" />
							</div> -->

							<Icon src={social.icon} size={'35'} color={'#fff'} />
						</a>
					</Tooltip>
					<!-- </Tooltip> -->
				{/each}
			</div>
		</div>

		<p class="mb-9 text-lg text-gray-600 dark:text-gray-200">OR</p>

		<button
			class="border-2 rounded-full px-8 py-2 border-primary-500 hover:border-primary-hov dark:border-white text-lg font-medium text-primary-500 hover:text-dark-theme transition duration-400 ease-in-out dark:text-gray-200 dark:hover:text-warning-500 dark:hover:border-warning-500"
			on:click={openModal}
		>
			Get in Touch
		</button>
	</div>
</div>
