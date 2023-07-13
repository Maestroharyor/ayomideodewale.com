<script lang="ts">
	import type { Experience } from '../../types';
	import FaExternalLinkAlt from 'svelte-icons-pack/fa/FaSolidExternalLinkAlt';
	import FaGithub from 'svelte-icons-pack/fa/FaBrandsGithub';

	export let experience: Experience;
</script>

<a
	href={experience.link}
	target="_blank"
	class="group relative grid sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 px-5 py-5 rounded-[16px] hover:bg-[rgba(0,0,0,0.02)] hover:dark:bg-[rgba(0,0,0,0.15)] hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.15)] hover:drop-shadow-md hover:backdrop-blur-[3.2px] hover:-translate-y-[2px] transition-all duration-300 cursor-pointer w-full"
>
	<div
		class="z-10 mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400 sm:col-span-2"
		aria-label="2018 to Present"
	>
		{experience.year}
	</div>
	<div class="z-10 sm:col-span-6 space-y-2">
		<h3 class="font-medium leading-snug text-slate-200">
			<div>
				<a
					class="group/link text-primary-500 dark:text-warning-500 text-xl font-bold"
					href={experience.link}
					target="_blank"
					rel="noreferrer"
					aria-label={`${experience.role} at ${experience.company}`}
					><span
						class=" -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"
					/><span
						>{experience.role} ·<!-- -->
						<span class="inline-block"
							>{experience.company}<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="ml-1 inline-block h-4 w-4 group-hover:-translate-y-2 group-hover:translate-x-2 transition-all duration-300"
								aria-hidden="true"
								><path
									fill-rule="evenodd"
									d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
									clip-rule="evenodd"
								/></svg
							></span
						></span
					></a
				>
			</div>
		</h3>
		<p class=" text-[16px] leading-normal">
			{experience.description}
		</p>
		<ul class=" flex flex-wrap gap-x-2 gap-y-2 mt-1" aria-label="Technologies used">
			{#each experience.stacks as stack}
				<!-- content here -->
				<li class="">
					<div
						class="rounded-lg text-sm bg-primary-500 text-white dark:bg-primary-hov hover:text-white py-1 px-2 block"
					>
						{stack}
					</div>
				</li>
			{/each}
		</ul>
	</div>
</a>
