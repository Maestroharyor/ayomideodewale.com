<script lang="ts">
	import { projects } from '../../data/projects';
	import { tagSlug } from '../../utils';

	// Same rule as the case studies: a chip links only where a tag page exists.
	// Terraform and Django are real skills here but tag no project, so they stay
	// plain rather than inviting a click that 404s.
	const tagPages = new Set(projects.flatMap((project) => project.tags).map(tagSlug));

	import type { Experience } from '../../types';

	let { experience }: { experience: Experience } = $props();
</script>

<!--
	One entry on the experience timeline.

	The year lives on the spine, aligned with its own dot, rather than floating in
	a wide gutter. A filled dot means the role is current; hollow means past,
	which reads faster than a "PRESENT" label in the date column.

	Below `sm` the gutter collapses and the year moves above the role title.
-->
<li class="relative grid grid-cols-[56px_1fr] sm:grid-cols-[108px_1fr] gap-x-4 sm:gap-x-6 pb-10">
	<!-- Spine. Sits under the dot, drawn per item so the last one can stop short. -->
	<span
		class="absolute top-2 bottom-0 left-[55px] sm:left-[107px] w-px bg-gray-300 dark:bg-primary-600"
		aria-hidden="true"
	></span>

	<div class="hidden sm:block text-right pr-5 pt-px">
		<span class="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
			{experience.year}
		</span>
	</div>

	<span
		class="absolute left-[52px] sm:left-[104px] top-[7px] h-[9px] w-[9px] rounded-full border-2 {experience.isCurrent
			? 'bg-primary-500 border-primary-500 dark:bg-warning-500 dark:border-warning-500'
			: 'bg-page dark:bg-page-dark border-gray-400 dark:border-gray-500'}"
		aria-hidden="true"
	></span>

	<div class="col-start-2 min-w-0 space-y-1.5">
		<p
			class="sm:hidden text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400"
		>
			{experience.year}
		</p>

		<h3 class="text-xl font-bold text-primary-500 dark:text-warning-500">
			{#if experience.link}
				<a
					href={experience.link}
					target="_blank"
					rel="noreferrer"
					class="group/link inline-flex items-start gap-1 hover:underline underline-offset-4"
				>
					<span>{experience.role}</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="mt-1.5 h-4 w-4 shrink-0 transition-transform duration-300 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
							clip-rule="evenodd"
						/>
					</svg>
				</a>
			{:else}
				{experience.role}
			{/if}
		</h3>

		<p class="text-[15px] text-slate-600 dark:text-slate-300">
			{experience.company} · {experience.location}
		</p>

		<p class="text-[16px] leading-normal">{experience.description}</p>

		<ul class="flex flex-wrap gap-2 pt-1" aria-label="Technologies used">
			{#each experience.stacks as stack (stack)}
				<li>
					{#if tagPages.has(tagSlug(stack))}
						<a
							href={`/projects/tag/${tagSlug(stack)}`}
							class="inline-block cursor-pointer rounded-lg bg-primary-500 px-2 py-1 text-sm text-white hover:text-white hover:opacity-75 dark:bg-primary-hov"
						>
							{stack}
						</a>
					{:else}
						<span
							class="inline-block rounded-lg bg-primary-500 px-2 py-1 text-sm text-white dark:bg-primary-hov"
						>
							{stack}
						</span>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</li>
