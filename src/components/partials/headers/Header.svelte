<script lang="ts">
	import { modeCurrent } from '@skeletonlabs/skeleton';
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { onMount, onDestroy } from 'svelte';
	import { menuData } from '../../../data/menu';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	let isLight;

	onMount(() => {
		// isLight = $theme?.lightMode;
		const header = document.querySelector('#desktop_header') as HTMLElement;

		let lastScrollTop = 0;
		const handleScrollBar = () => {
			// console.log('Scrolling');
			if (header !== null) {
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

				if (scrollTop > lastScrollTop) {
					header.style.top = '-80px';
					header.classList.remove('bg-gray-100/90', 'dark:bg-[rgba(0,10,31,0.96)]');
				} else {
					header.style.top = '0px';
					header.classList.add('bg-gray-100/90', 'dark:bg-[rgba(0,10,31,0.96)]');
				}

				if (window.pageYOffset <= 60) {
					header.classList.remove('bg-gray-100/90', 'dark:bg-[rgba(0,10,31,0.96)]');
				}
				lastScrollTop = scrollTop;
			}
		};

		window.addEventListener('scroll', handleScrollBar);

		// onDestroy(() => {
		// 	window.removeEventListener('scroll', handleScrollBar);
		// });
	});

	const modal: ModalSettings = {
		type: 'component',
		// Pass the component registry key as a string:
		component: 'contactComponent'
	};

	const openModal = () => {
		modalStore.trigger(modal);
	};
</script>

<header
	id="desktop_header"
	class="hidden lg:block pt-5 pb-3 px-5 sticky top-0 z-[50] backdrop-blur"
>
	<nav class="flex justify-between items-center">
		<ul>
			<li class="list-none font-bold text-lg cursor-pointer">
				<!-- <li
			class="list-none font-bold text-lg cursor-pointer"
			let:initial={{ opacity: 0, y: -30 }}
			let:animate={{ opacity: 1, y: 0 }}
			let:transition={{ duration: 0.5, delay: 0.5, stiffness: 500, type: 'spring' }}
		> -->
				<a href="/" class="font-black text-xl flex items-center gap-1.5">
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
		<ul class="flex items-center gap-x-10">
			<!-- <ul
			class="flex items-center gap-x-10"
			let:initial={{ opacity: 0, y: -30 }}
			let:animate={{ opacity: 1, y: 0 }}
			let:transition={{ duration: 0.5, delay: 0.8, stiffness: 500, type: 'spring' }}
		> -->
			{#each menuData as item, index}
				<li>
					<a
						href={item.link}
						class={`text-lg list-none transition duration-300 ease-in-out ${'text-primary-500 dark:text-white dark:hover:text-warning-500 hover:text-gray-800'}`}
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

		<div class="flex gap-6 items-center">
			<LightSwitch />
		</div>
		<!-- <div
			class="flex gap-6 items-center"
			let:initial={{ opacity: 0, y: -30 }}
			let:animate={{ opacity: 1, y: 0 }}
			let:transition={{ duration: 0.5, delay: 1.1, stiffness: 500, type: 'spring' }}
		/> -->
	</nav>
</header>
