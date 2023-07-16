<script>
	import { experiences } from '../../../data/experience';
	import ExperienceCard from '../../elements/ExperienceCard.svelte';
	import SectionHeading from '../../elements/SectionHeading.svelte';
</script>

<div class=" pt-20 pb-20 relative" id="experience">
	<div class="flex flex-col text-left justify-between px-5 max-w-[1200px] mx-auto">
		<div>
			<SectionHeading title="Some Recent Work Experience" />
		</div>
		<div class="grid grid-cols-1 gap-5 md:gap-x-10 md:gap-y-16 lg:grid-cols-2 items-start pt-10">
			{#each experiences as experience}
				<ExperienceCard {experience} />
			{/each}
		</div>
		<div class="relative w-full mt-10 flex items-center justify-center">
			<a
				href={'/resume'}
				class="border-2 rounded-full px-5 md:px-32 py-2 border-primary-500 dark:border-white text-lg font-medium text-primary-500 hover:text-dark-theme hover:border-dark-theme transition duration-400 ease-in-out dark:text-gray-200 dark:hover:text-warning-500 dark:hover:border-warning-500"
				aria-label="see more projects"
			>
				See Resume
			</a>
		</div>
	</div>
</div>
