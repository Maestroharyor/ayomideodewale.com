<script lang="ts">
	import { homeMenuData } from '../../../data/menu';
	import { page } from '$app/state';
	import { fade, slide } from 'svelte/transition';
	import { quartInOut } from 'svelte/easing';
	import { modal } from '../../ui/modal-state.svelte';
	import ThemeToggle from '../../ui/ThemeToggle.svelte';

	// $derived rather than a page.subscribe() in onMount, so the active menu is
	// correct during SSR and on first paint instead of flashing.
	const currentPage = $derived(page.route.id ?? '/');
	const currentMenu = $derived(
		currentPage === '/'
			? homeMenuData.filter((menu) => menu.link.toLowerCase() !== '/')
			: homeMenuData.filter((menu) => !menu.isHomeLink)
	);

	const openModal = () => {
		modal.open();
	};

	let showMobileNav = $state(false);
	const toggleMobileNav = (value: boolean) => {
		showMobileNav = value;
	};
</script>

{#if showMobileNav}
	<button
		type="button"
		aria-label="Close navigation menu"
		class="fixed w-full h-full top-0 left-0 backdrop-blur-lg z-[100]"
		transition:fade={{ duration: 300, easing: quartInOut }}
		onclick={() => toggleMobileNav(false)}
	></button>

	<div
		transition:slide={{ axis: 'x', delay: 100, duration: 300, easing: quartInOut }}
		class="fixed z-[1000] h-full bg-white top-0 right-0 dark:bg-primary-500 shadow w-[calc(100%-40px)] sm:w-[calc(100%-100px)] text-white flex flex-col gap-4 py-10 px-5"
	>
		<button
			type="button"
			aria-label="Close navigation menu"
			class="text-red-500 hover:text-danger-hov dark:text-light hover:dark:text-warning-500 absolute right-3 text-2xl top-2 transition duration-300 ease-in-out"
			onclick={() => toggleMobileNav(false)}
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
			{#each currentMenu as item (item.link)}
				<li>
					<a
						href={item.link}
						onclick={() => toggleMobileNav(false)}
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
				<!-- The drawer had no contact entry, so the modal was desktop-only. -->
				<button
					type="button"
					class="border-2 rounded-full px-8 py-2 border-primary-500 hover:border-primary-hov dark:border-white text-lg font-medium text-primary-500 hover:text-dark-theme transition duration-400 ease-in-out dark:text-gray-200 dark:hover:text-warning-500 dark:hover:border-warning-500"
					onclick={() => {
						toggleMobileNav(false);
						openModal();
					}}
				>
					Get In Touch
				</button>
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
						src="/logos/light_logo.svg"
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
			{#each currentMenu as item (item.link)}
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
				<!-- <li>
					<a
						href={item.link}
						class={`text-lg list-none transition duration-300 ease-in-out ${
							$router.pathname === item.link
								? 'text-dark-theme dark:text-warning-500'
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
					onclick={openModal}
				>
					Get In Touch
				</button>
			</li>
		</ul>

		<div class="flex gap-3 items-center justify-end">
			<ThemeToggle />
			<button
				aria-label="Mobile Menu Navigation Button"
				class="text-2xl text-dark dark:text-white hover:text-primary-500 dark:hover:text-warning-500 transition ease-in-out duration-300 px-2 lg:hidden"
				onclick={() => toggleMobileNav(true)}
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
