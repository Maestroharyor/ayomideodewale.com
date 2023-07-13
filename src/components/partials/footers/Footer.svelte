<script>
	import FaSolidExternalLinkAlt from 'svelte-icons-pack/fa/FaSolidExternalLinkAlt';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import { onMount } from 'svelte';
	import { footerMenu } from '../../../data/menu';

	let currentYear = new Date().getFullYear();

	//   onMount(() => {
	//     const sr = ScrollReveal();
	//     sr.reveal(".reveal-bottom", {
	//       origin: "bottom",
	//       distance: "20px",
	//       duration: 800,
	//       delay: 200,
	//       easing: "cubic-bezier(0.5, 0, 0, 1)",
	//       opacity: 0,
	//       useDelay: "onload",
	//       reset: true,
	//     });
	//   });
</script>

<footer
	class="border-t border-gray-200 dark:border-primary-600 dark:text-white pt-20 pb-20 relative"
>
	<div class="max-w-[800px] mx-auto">
		<div class="mb-10">
			<p class="uppercase text-lg font-bold text-center dark:text-warning-500 mb-10">MENU LINKS:</p>
			<div class="flex flex-col md:flex-row flex-wrap gap-3 justify-between px-5">
				{#each footerMenu as menu (menu.title)}
					<div class="">
						{#if menu.external}
							<a
								href={menu.link}
								target="_blank"
								rel="noreferrer"
								class="inline-flex items-center gap-2 text-xl hover:text-warning-500 dark:hover:text-warning-500 transition-all duration-300"
							>
								<span>{menu.title}</span>
								<!-- <FaSolidExternalLinkAlt /> -->
								<Icon
									src={FaSolidExternalLinkAlt}
									size={'10'}
									className="text-gray-500 dark:text-gray-100"
								/>
							</a>
						{:else}
							<a
								href={menu.link}
								class="text-xl hover:text-warning-500 dark:hover:text-warning-500 transition-all duration-300"
							>
								{menu.title}
							</a>
						{/if}
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
