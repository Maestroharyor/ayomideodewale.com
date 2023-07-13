<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { skillsFull, skillsSummary } from '../../../data/skills';
	// import { afterUpdate, onMount } from 'svelte/types/runtime/internal/lifecycle';

	import FaCode from 'svelte-icons-pack/fa/FaSolidCode';
	import FaCodeBranch from 'svelte-icons-pack/fa/FaSolidCodeBranch';
	import FaLaptopCode from 'svelte-icons-pack/fa/FaSolidLaptopCode';
	import FaLaptop from 'svelte-icons-pack/fa/FaSolidLaptop';
	import FaStar from 'svelte-icons-pack/fa/FaStar';

	import Icon from 'svelte-icons-pack/Icon.svelte';

	let fullSkills = false;
	let skills = skillsSummary;

	// afterUpdate(() => {
	// 	skills = fullSkills ? skillsFull : skillsSummary;
	// });

	const handleChange = () => {
		skills = fullSkills ? skillsFull : skillsSummary;
	};
</script>

<hr class="border-1 gray-200 dark:border-gray-800" />
<div
	class="grid grid-cols-1 md:grid-cols-2 justify-between relative max-w-[1200px] mx-auto pt-24 pb-24 px-5 gap-10 items-center"
>
	<div>
		<div>
			<h2 class="text-5xl font-bold mb-2 text-primary dark:text-warning">
				{#if fullSkills}
					The Top Tech Stacks I use
				{:else}
					My Favourite Dev. Stacks
				{/if}
			</h2>
			<p class="text-lg">
				{#if fullSkills}
					(Here are the tools I use to implement my software solutions)
				{:else}
					(Some of the tools I use to work my magic)
				{/if}
			</p>
		</div>

		<div
			class="_floating hidden md:block opacity-90 text-primary top-[100px] left-[50px] rotate-[70deg]"
			style="animation-delay: 0.4s;"
		>
			<Icon src={FaCode} size={'50'} color={'#4F46E5'} />
		</div>
		<div
			class="_floating hidden md:block opacity-90 text-primary b0ttom-[100px] left-[calc(50%-70px)] rotate-[70deg]"
			style="animation-delay: 0.2s;"
		>
			<Icon src={FaCodeBranch} size={'50'} color={'#4F46E5'} />
		</div>
		<div
			class="_floating hidden md:block opacity-90 text-primary bottom-[70px] left-[60px] rotate-[70deg]"
			style="animation-delay: 0.6s;"
		>
			<Icon src={FaLaptop} size={'50'} color={'#4F46E5'} />
		</div>
		<div
			class="_floating hidden md:block opacity-90 text-primary top-[50px] left-[400px] rotate-[70deg]"
			style="animation-delay: 0.2s;"
		>
			<Icon src={FaLaptopCode} size={'50'} color={'#4F46E5'} />
		</div>
		<div
			class="_floating hidden md:block text-primary top-[50%] -left-[50px] rotate-[70deg]"
			style="animation-delay: 0.7s;"
		>
			<Icon src={FaStar} size={'50'} color={'#4F46E5'} />
		</div>
	</div>
	<div>
		<div class="flex items-center justify-center gap-3 mb-8 w-full">
			<p>Favourite Tech Stacks</p>
			<SlideToggle
				name="Tech Stacks"
				on:change={handleChange}
				bind:checked={fullSkills}
				aria-label="Tech Stacks Button"
				active="bg-primary-hov"
				label="Tech Stacks"
			/>

			<p>All Tech Stacks</p>
		</div>
		<div
			class="relative max-w-lg w-full mx-auto md:mx-none grid gap-x-8 gap-y-12 sm:gap-8 md:gap-12 grid-cols-3 sm:grid-cols-5 items-center place-content-center"
		>
			{#each skills as item, index}
				<div title={item.skill} class="w-10 mx-auto flex items-center flex-col justify-center">
					<img
						src={item.src}
						alt={item.skill}
						width={50}
						height={50}
						class:invert={item.skill.toLowerCase() === 'nextjs' ||
							item.skill.toLowerCase() === 'solidity'}
						loading="lazy"
					/>
					<p class="text-sm text-gray-600 dark:text-gray-100 font-bold mt-3 opacity-80">
						{item.skill}
					</p>
				</div>
			{/each}
		</div>
	</div>
</div>
<hr class="border-1 gray-200 dark:border-gray-800" />
