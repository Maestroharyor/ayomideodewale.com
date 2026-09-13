<script lang="ts">
	import { skillsFull, skillsSummary } from '../../../data/skills';

	import { Icon } from 'svelte-icons-pack';
	import {
		FaSolidCode as FaCode,
		FaSolidCodeBranch as FaCodeBranch,
		FaSolidLaptopCode as FaLaptopCode,
		FaSolidLaptop as FaLaptop,
		FaStar
	} from 'svelte-icons-pack/fa';
	import Switch from '../../ui/Switch.svelte';

	let fullSkills = $state(false);
	const skills = $derived(fullSkills ? skillsFull : skillsSummary);
</script>

<!-- `gray-200` is not a class, so the colour fell through to Tailwind's default
     border-colour of currentColor and the rule rendered near-black in light mode. -->
<hr class="border-t border-gray-300 dark:border-gray-600" />
<div
	class="grid grid-cols-1 md:grid-cols-2 justify-between relative max-w-[1200px] mx-auto pt-24 pb-24 px-5 gap-10 items-center"
>
	<div>
		<div>
			<h2 class="text-5xl font-bold mb-2 text-primary-500 dark:text-warning-500">
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
			class="_floating hidden md:block opacity-90 text-primary-500 top-[100px] left-[50px] rotate-[70deg]"
			style="animation-delay: 0.4s;"
		>
			<Icon src={FaCode} size="50" color="#4F46E5" />
		</div>
		<div
			class="_floating hidden md:block opacity-90 text-primary-500 bottom-[100px] left-[calc(50%-70px)] rotate-[70deg]"
			style="animation-delay: 0.2s;"
		>
			<Icon src={FaCodeBranch} size="50" color="#4F46E5" />
		</div>
		<div
			class="_floating hidden md:block opacity-90 text-primary-500 bottom-[70px] left-[60px] rotate-[70deg]"
			style="animation-delay: 0.6s;"
		>
			<Icon src={FaLaptop} size="50" color="#4F46E5" />
		</div>
		<div
			class="_floating hidden md:block opacity-90 text-primary-500 top-[50px] left-[400px] rotate-[70deg]"
			style="animation-delay: 0.2s;"
		>
			<Icon src={FaLaptopCode} size="50" color="#4F46E5" />
		</div>
		<div
			class="_floating hidden md:block text-primary-500 top-[50%] -left-[50px] rotate-[70deg]"
			style="animation-delay: 0.7s;"
		>
			<Icon src={FaStar} size="50" color="#4F46E5" />
		</div>
	</div>
	<div>
		<div class="flex items-center justify-center gap-3 mb-8 w-full">
			<p>Favourite Tech Stacks</p>
			<Switch name="Tech Stacks" label="Tech Stacks" bind:checked={fullSkills} />

			<p>All Tech Stacks</p>
		</div>
		<div
			class="relative max-w-lg w-full mx-auto md:mx-none grid gap-x-8 gap-y-12 sm:gap-8 md:gap-12 grid-cols-3 sm:grid-cols-5 items-center place-content-center"
		>
			{#each skills as item (item.skill)}
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
<hr class="border-t border-gray-300 dark:border-gray-600" />
