<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { homeMenuData } from '../../../data/menu';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { fade, slide } from 'svelte/transition';
	import { quartInOut } from 'svelte/easing';

	let currentMenu = homeMenuData;
	let currentPage = '/';

	onMount(() => {
		page.subscribe((page) => {
			currentPage = page.route.id as string;
			if (currentPage === '/') {
				currentMenu = homeMenuData.filter((menu) => menu.link.toLowerCase() !== '/');
			} else {
				currentMenu = homeMenuData.filter((menu) => !menu.isHomeLink);
			}
		});
	});

	const modal: ModalSettings = {
		type: 'component',
		// Pass the component registry key as a string:
		component: 'contactComponent'
	};

	const openModal = () => {
		modalStore.trigger(modal);
	};

	let showMobileNav = false;
	const toggleMobileNav = (value: boolean) => {
		showMobileNav = value;
	};
</script>

{#if showMobileNav}
	<div
		class="fixed w-full h-full top-0 left-0 backdrop-blur-lg z-[100]"
		transition:fade={{ duration: 300, easing: quartInOut }}
		on:click={() => toggleMobileNav(false)}
		on:keyup={() => toggleMobileNav(false)}
		on:keydown={() => toggleMobileNav(false)}
	/>

	<div
		transition:slide={{ axis: 'x', delay: 100, duration: 300, easing: quartInOut }}
		class="fixed z-[1000] h-full bg-white top-0 left-0 dark:bg-primary-500 shadow w-[calc(100%-40px)] sm:w-[calc(100%-100px)] text-white flex flex-col gap-4 py-10 px-5"
	>
		<button
			class="text-red-500 hover:text-danger-hov dark:text-light hover:dark:text-warning-500 absolute right-3 text-2xl top-2 transition duration-300 ease-in-out"
			on:click={() => toggleMobileNav(false)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 384 512"
				fill="currentColor"
				stroke="currentColor"
				><path
					d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
				/></svg
			>
		</button>
		<ul class="flex flex-col gap-5">
			{#each currentMenu as item, index}
				<li>
					<a
						href={item.link}
						class={`text-lg list-none transition duration-300 ease-in-out ${
							currentPage === item.link
								? 'text-dark-theme dark:text-warning-500'
								: 'text-primary-500 dark:text-white dark:hover:text-warning-500 hover:text-dark-theme'
						}`}
					>
						{item.title}
					</a>
				</li>
			{/each}
			<li>
				<a
					href="https://thelifetechfacts.com"
					target="_blank"
					class="inline-flex gap-2 items-center text-lg list-none transition duration-300 ease-in-out text-primary-500 dark:text-white dark:hover:text-warning-500 hover:text-dark-theme"
				>
					<span>My Blog</span>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none"
						aria-hidden="true"
						><path
							fill-rule="evenodd"
							d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
							clip-rule="evenodd"
						/></svg
					>
				</a>
			</li>
		</ul>
	</div>
{/if}

<header id="header" class=" pt-5 pb-3 px-5 sticky top-0 z-[50] backdrop-blur">
	<nav class="flex justify-between items-center">
		<ul>
			<li class="list-none font-bold text-lg cursor-pointer">
				<!-- <li
			class="list-none font-bold text-lg cursor-pointer"
			let:initial={{ opacity: 0, y: -30 }}
			let:animate={{ opacity: 1, y: 0 }}
			let:transition={{ duration: 0.5, delay: 0.5, stiffness: 500, type: 'spring' }}
		> -->
				<a href="/" class="font -black text-xl flex items-center gap-1.5">
					<img
						src={'/logos/light_logo.svg'}
						alt="Ayomide Odewale Logo"
						width={40}
						height={40}
						class="transform hover:rotate-[360deg] hover:scale-75 transition-transform duration-500"
					/>
					<!-- <img
					src={$theme?.lightMode ? '/static/logos/light_logo.svg' : '/static/logos/dark_logo.svg'}
					alt="Ayomide Odewale Logo"
					width={40}
					height={40}
					class="transform hover:rotate-[360deg] hover:scale-75 transition-transform duration-500"
				/> -->
					<!-- <div>
          {Array.from("Maestro").map((letter, index) => (
            <span
              key={index}
              class="text-2xl dark:text-white-dark hover:text-primary-500 dark:hover:text-warning-500 hover:-translate-y-2 transition-all duration-500 hover:duration-100 inline-block"
            >
              {letter}
            </span>
          ))}
        </div> -->
				</a>
			</li>
		</ul>
		<ul class=" items-center gap-x-10 hidden lg:flex">
			<!-- <ul
			class="flex items-center gap-x-10"
			let:initial={{ opacity: 0, y: -30 }}
			let:animate={{ opacity: 1, y: 0 }}
			let:transition={{ duration: 0.5, delay: 0.8, stiffness: 500, type: 'spring' }}
		> -->
			{#each currentMenu as item, index}
				<li>
					<a
						on:click={() => {
							console.log('CLicked');
							// toggleMobileNav(false);
						}}
						href={item.link}
						class={`text-lg list-none transition duration-300 ease-in-out ${
							currentPage === item.link
								? 'text-dark-theme dark:text-warning-500'
								: 'text-primary-500 dark:text-white dark:hover:text-warning-500 hover:text-dark-theme'
						}`}
					>
						{item.title}
					</a>
				</li>
				<!-- <li>
					<a
						href={item.link}
						class={`text-lg list-none transition duration-300 ease-in-out ${
							$router.pathname === item.link
								? 'text-dark-theme dark:text-warning'
								: 'text-primary-500 dark:text-white dark:hover:text-warning-500 hover:text-dark-theme'
						}`}
					>
						{item.title}
					</a>
				</li> -->
			{/each}
			<li>
				<button
					class="border-2 rounded-full px-8 py-2 border-primary-500 hover:border-primary-hov dark:border-white text-lg font-medium text-primary-500 hover:text-dark-theme transition duration-400 ease-in-out dark:text-gray-200 dark:hover:text-warning-500 dark:hover:border-warning-500"
					on:click={openModal}
				>
					Get In Touch
				</button>
			</li>
		</ul>

		<div class="flex gap-3 items-center justify-end">
			<LightSwitch />
			<button
				aria-label="Mobile Menu Navigation Button"
				class="text-2xl text-dark dark:text-white hover:text-primary-500 dark:hover:text-warning-500 transition ease-in-out duration-300 px-2 lg:hidden"
				on:click={() => toggleMobileNav(true)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="1em"
					viewBox="0 0 448 512"
					fill="currentColor"
					><path
						d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
					/></svg
				>
			</button>
		</div>
		<!-- <div
			class="flex gap-6 items-center"
			let:initial={{ opacity: 0, y: -30 }}
			let:animate={{ opacity: 1, y: 0 }}
			let:transition={{ duration: 0.5, delay: 1.1, stiffness: 500, type: 'spring' }}
		/> -->
	</nav>
</header>
