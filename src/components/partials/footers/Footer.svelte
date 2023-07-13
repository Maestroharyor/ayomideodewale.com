<script lang="ts">
	import { onMount } from 'svelte';
	import { footerMenu } from '../../../data/menu';
	import { page } from '$app/stores';

	let currentYear = new Date().getFullYear();
	let currentMenu = footerMenu;
	let currentPage = '/';

	onMount(() => {
		page.subscribe((page) => {
			currentPage = page.route.id as string;
			if (currentPage === '/') {
				currentMenu = footerMenu.filter((menu) => menu.title.toLowerCase() !== '/');
			} else {
				currentMenu = footerMenu.filter((menu) => !menu.isHomeLink);
			}
		});
	});
</script>

<footer
	class="border-t border-gray-200 dark:border-primary-600 dark:text-white pt-20 pb-20 relative"
>
	<div class="max-w-[800px] mx-auto">
		<div class="mb-10">
			<p class="uppercase text-lg font-bold text-center dark:text-warning-500 mb-10">MENU LINKS:</p>
			<div class="flex flex-col md:flex-row flex-wrap gap-3 justify-between px-5">
				{#each currentMenu as menu (menu.title)}
					<div class="">
						<a
							href={menu.link}
							target="_blank"
							rel="noreferrer"
							class={`inline-flex gap-2 items-center text-lg list-none transition duration-300 ease-in-out ${
								currentPage === menu.link
									? 'text-dark-theme dark:text-warning-500'
									: 'text-primary-500 dark:text-white dark:hover:text-warning-500 hover:text-dark-theme'
							}`}
						>
							<span>{menu.title}</span>
							{#if menu.external}
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
							{/if}
						</a>
					</div>
				{/each}
			</div>
		</div>
		<div
			class="max-w-4xl w-full m-auto mt-8 pt-8 sm:mt-4 sm:pt-4 text-center text-fun-gray border-t border-fun-pink-dark"
		>
			<div class="flex flex-col items-center justify-center">
				<div class="inline-flex items-center uppercase text-xs font-bold tracking-widest">
					Made with{' '}
					<div class="space-x-2 inline-flex items-center -mt-1 ml-3">
						<span>
							<img
								src={'/svgs/svelte.svg'}
								width={40}
								height={40}
								class=""
								title="Svelte"
								alt="Svelte"
								loading="lazy"
							/>
							<span class="sr-only">Svelte</span>
						</span>

						<span>
							<img
								src={'/svgs/tailwindcss.svg'}
								width={40}
								height={40}
								class=""
								title="TailwindCSS"
								alt="TailwindCSS"
								loading="lazy"
							/>
							<span class="sr-only">TailwindCSS</span>
						</span>
						<span>
							<img
								src={'/skeleton.png'}
								width={40}
								height={40}
								class=""
								title="Skeleton"
								alt="Skeleton"
								loading="lazy"
							/>
							<span class="sr-only">Skeleton</span>
						</span>
					</div>
				</div>
				<div class="mt-1">
					<span class="text-gray-500">&copy; {currentYear} </span>
					<span>Ayomide Odewale (Maestro)</span>
				</div>
			</div>
			<!-- <button class=" absolute bottom-6 left-6">
				<img
					src={'/rotate.gif'}
					class="w-[100px]"
					title="Spinning button"
					alt="Spinning button"
				/></button
			> -->
			<a
				class=" mt-5 md:mt-0 md:absolute bottom-20 right-6 w-auto inline-flex items-center sm:w-auto font-bold flex-shrink text-xs border border-gray-300 hover:border-gray-500 hover:text-gray-500 dark:border-gray-200 dark:hover:border-warning-500 dark:hover:text-warning-500 px-4 py-2 rounded-xl cursor-pointer opacity-50 transition-all duration-300 ease-in-out"
				href="https://github.com/Maestroharyor/ayomideodewale.com"
				target="_blank"
				rel="nooreferrer"
			>
				<img
					src={'/svgs/github.svg'}
					width={20}
					height={20}
					class=""
					title="Github"
					alt="Github"
				/><span class="ml-2">View Source Code </span></a
			>
		</div>
	</div>
</footer>
