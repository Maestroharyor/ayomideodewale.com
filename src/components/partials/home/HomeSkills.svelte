<script lang="ts">
	import { skillsFull, skillsSummary } from '../../../data/skills';
	import { reveal } from '../../../lib/actions/reveal';

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

	const ICON_BASE = 'h-11 w-11 object-contain';

	// Solid black marks: legible on white, invisible on the navy. Inverting them
	// unconditionally was the old bug, which made them vanish in light mode
	// instead, so the inversion is dark-mode only.
	const MONOCHROME_MARKS = new Set(['nextjs', 'solidity', 'expressjs', 'prisma', 'ansible']);

	// Dark but coloured marks, which inverting would wreck: Django is #004d40,
	// Postgres #336791, Node a mix down to #2e7d32. All of them read as mud
	// against the #20234d page. A brightness lift keeps the hue and the shape.
	const DARK_MARKS = new Set(['django', 'nodejs', 'postgres']);

	const iconClass = (skill: string) => {
		const key = skill.toLowerCase();
		if (MONOCHROME_MARKS.has(key)) return `${ICON_BASE} dark:invert`;
		if (DARK_MARKS.has(key)) return `${ICON_BASE} dark:brightness-[1.75]`;
		return ICON_BASE;
	};

	// Decorations only. They are absolutely positioned against the section
	// container, not the heading column, which is what spreads them over the full
	// height of the band instead of piling them onto the heading.
	const doodles = [
		{ icon: FaCode, class: 'top-[100px] left-[50px] rotate-[70deg]', delay: '0.4s' },
		{
			icon: FaCodeBranch,
			class: 'bottom-[100px] left-[calc(50%-70px)] rotate-[70deg]',
			delay: '0.2s'
		},
		{ icon: FaLaptop, class: 'bottom-[70px] left-[60px] rotate-[70deg]', delay: '0.6s' },
		{ icon: FaLaptopCode, class: 'top-[50px] left-[400px] rotate-[70deg]', delay: '0.2s' },
		{ icon: FaStar, class: 'top-[50%] -left-[50px] rotate-[70deg]', delay: '0.7s' }
	];
</script>

<!-- `gray-200` is not a class, so the colour fell through to Tailwind's default
     border-colour of currentColor and the rule rendered near-black in light mode. -->
<hr class="border-t border-gray-300 dark:border-gray-600" />
<div
	class="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-5 pt-24 pb-24 md:grid-cols-2 md:gap-10"
>
	<div>
		<!-- Centred on mobile to match SectionHeading, which every other band uses. -->
		<div class="text-center md:text-left">
			<h2
				class="mb-2 text-3xl font-bold text-primary-500 sm:text-4xl lg:text-5xl dark:text-warning-500"
			>
				{fullSkills ? 'The Top Tech Stacks I use' : 'My Favourite Dev. Stacks'}
			</h2>
			<p class="text-lg text-gray-600 dark:text-gray-300">
				{fullSkills
					? 'Everything I reach for, across the stack.'
					: 'The tools I reach for first, across the stack.'}
			</p>
		</div>

		{#each doodles as doodle (doodle.class)}
			<div
				class="_floating hidden text-primary-500 opacity-90 md:block dark:text-primary-400 {doodle.class}"
				style={`animation-delay: ${doodle.delay};`}
				aria-hidden="true"
			>
				<Icon src={doodle.icon} size="50" color="currentColor" />
			</div>
		{/each}
	</div>

	<div>
		<div class="mb-10 flex items-center justify-center gap-3">
			<span
				class="text-sm font-medium transition-colors"
				class:text-primary-500={!fullSkills}
				class:dark:text-warning-500={!fullSkills}
				class:text-gray-500={fullSkills}
			>
				Favourites
			</span>
			<Switch name="Tech Stacks" label="Tech Stacks" bind:checked={fullSkills} />
			<span
				class="text-sm font-medium transition-colors"
				class:text-primary-500={fullSkills}
				class:dark:text-warning-500={fullSkills}
				class:text-gray-500={!fullSkills}
			>
				Everything
			</span>
		</div>

		<!-- auto-fill over a minimum track rather than a fixed column count: the cell
		     is sized off the label, which runs 60-90px, not off the 44px icon. The
		     old `w-10` cell let "React Native" wrap while its row neighbours did not. -->
		<ul
			use:reveal
			class="grid list-none grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-x-4 gap-y-10 sm:grid-cols-[repeat(auto-fill,minmax(104px,1fr))]"
		>
			{#each skills as item (item.skill)}
				<li class="flex flex-col items-center justify-start gap-3 text-center">
					<img src={item.src} alt="" width={44} height={44} class={iconClass(item.skill)} />
					<span class="text-sm font-bold text-gray-600 dark:text-gray-100">{item.skill}</span>
				</li>
			{/each}
		</ul>
	</div>
</div>
<hr class="border-t border-gray-300 dark:border-gray-600" />
