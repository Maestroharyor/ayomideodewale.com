<script lang="ts">
	import type { Design } from '../../types';

	export let design: Design;
</script>

<!-- <div class="w-full">
	<a href={design.link} target="_blank" class="w-full">
		<figure>
			<img
				class="w-full h-96 hover:opacity-75 transition-opacity object-cover"
				src={design.image}
				alt={design.label}
			/>

			<div>
				<p>{design.label}</p>
			</div>
		</figure>
	</a>
</div> -->

<a
	href={design.link}
	target="_blank"
	class=" mx-auto flex flex-col md:flex-row items-start gap-5 group project_card px-5 py-5 h-full rounded-[16px] hover:bg-[rgba(0,0,0,0.02)] hover:dark:bg-[rgba(0,0,0,0.15)] hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.15)] hover:drop-shadow-md hover:backdrop-blur-[3.2px] hover:-translate-y-[2px] transition-all duration-300 cursor-pointer w-full"
>
	<div
		class=" max-w-[500px] relative rounded-xl border-gray-400 dark:border-gray-600 border-2 p-2 transition group-hover:border-primary-hov dark:group-hover:border-warning-500"
	>
		<img
			class="w-full h-auto hover:opacity-75 transition rounded-md"
			src={design.image}
			alt={design.label}
			loading="lazy"
			width="300"
		/>
	</div>

	<div class="w-full mt-5 flex-1 space-y-3">
		<div class="flex projects-center justify-between mb-1">
			<h3
				class="text-primary-500 dark:text-warning-500 text-xl md:text-2xl lg:text-3xl leading-snug font-bold"
			>
				{design.label}
			</h3>

			<div
				class="inline-flex items-center gap-3 group-hover:translate-x-1 group-hover:-translate-y-1 duration-300 ease-in-out"
			>
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
			</div>
		</div>
		<p class="text-fun-gray text-left text-lg">{design.desc}</p>
	</div>
</a>
