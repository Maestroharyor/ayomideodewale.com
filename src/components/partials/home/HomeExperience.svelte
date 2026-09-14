<script lang="ts">
	import { slide } from 'svelte/transition';
	import { earlierExperiences, experiences } from '../../../data/experience';
	import ExperienceCard from '../../elements/ExperienceCard.svelte';
	import SectionHeading from '../../elements/SectionHeading.svelte';

	// Lean by default, with the rest one click away rather than left off.
	const INITIAL_COUNT = 4;

	let expanded = $state(false);
	const visible = $derived(expanded ? experiences : experiences.slice(0, INITIAL_COUNT));
	const remaining = $derived(experiences.length - INITIAL_COUNT);

	// Collapsing must not leave a silent gap in the chronology: the roles the
	// collapse hides fold into the "Earlier" line until they get their own card.
	const earlierLine = $derived(
		[...(expanded ? [] : experiences.slice(INITIAL_COUNT)), ...earlierExperiences].map(
			(role) => `${role.company} (${role.year})`
		)
	);
</script>

<div class="relative pt-24 pb-24" id="experience">
	<div class="flex flex-col text-left justify-between px-5 max-w-[900px] mx-auto">
		<div>
			<SectionHeading title="Some Recent Work Experience" />
		</div>

		<!--
			A single-column timeline rather than a two-column grid. Chronology is
			linear: a grid made the reading order ambiguous (down the left, or across
			each row?) and padded every row to its tallest card. It also could not
			express the Kikokushijo/BPOSeats overlap, which is real and deliberate.
		-->
		<ol class="pt-10 list-none">
			{#each visible as experience (`${experience.company}-${experience.role}`)}
				<div transition:slide={{ duration: 250 }}>
					<ExperienceCard {experience} />
				</div>
			{/each}

			{#if earlierLine.length}
				<li class="relative grid grid-cols-[56px_1fr] sm:grid-cols-[108px_1fr] gap-x-4 sm:gap-x-6">
					<span
						class="absolute left-[53px] sm:left-[105px] top-[7px] h-[5px] w-[5px] rounded-full bg-gray-400 dark:bg-gray-500"
						aria-hidden="true"
					></span>
					<div></div>
					<p class="col-start-2 text-[15px] text-slate-600 dark:text-slate-400">
						Earlier: {earlierLine.join(' · ')}
					</p>
				</li>
			{/if}
		</ol>

		{#if remaining > 0}
			<div class="relative w-full mt-8 flex items-center justify-center">
				<button
					type="button"
					onclick={() => (expanded = !expanded)}
					aria-expanded={expanded}
					class="inline-flex items-center gap-2 text-lg font-medium text-primary-500 hover:text-dark-theme dark:text-gray-200 dark:hover:text-warning-500 transition duration-300 ease-in-out underline underline-offset-4"
				>
					{expanded ? 'Show less' : `Show ${remaining} more ${remaining === 1 ? 'role' : 'roles'}`}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="h-4 w-4 transition-transform duration-300 {expanded ? 'rotate-180' : ''}"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>
		{/if}

		<div class="relative w-full mt-10 flex items-center justify-center">
			<a
				href="/resume"
				class="border-2 rounded-full px-5 md:px-32 py-2 border-primary-500 dark:border-white text-lg font-medium text-primary-500 hover:text-dark-theme hover:border-dark-theme transition duration-400 ease-in-out dark:text-gray-200 dark:hover:text-warning-500 dark:hover:border-warning-500"
				aria-label="See my full resume"
			>
				See Resume
			</a>
		</div>
	</div>
</div>
