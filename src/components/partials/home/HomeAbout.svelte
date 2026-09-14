<script lang="ts">
	import { reveal } from '../../../lib/actions/reveal';
	import SectionHeading from '../../elements/SectionHeading.svelte';
	import { profileDetails } from '../../../data/profile';

	import { Icon } from 'svelte-icons-pack';
	// v3 renamed VscCircleOutline to VscCircle
	import { VscCircle } from 'svelte-icons-pack/vsc';
	import Segment from '../../ui/Segment.svelte';
	import SegmentItem from '../../ui/SegmentItem.svelte';

	let value: number = $state(3);

	// One list rather than five hand-written <SegmentItem> blocks that differed
	// only in their index. profileDetails is ordered shortest to longest.
	const detailLevels = [1, 2, 3, 4, 5];
	const detailLabels = ['Shortest', 'Short', 'Mid', 'Long', 'Longest'];
</script>

<div
	class="w-full px-5 pt-24 pb-24 bg-dark/[0.02] dark:bg-dark-background/40"
	id="about"
	use:reveal
>
	<div class="max-w-[1200px] mx-auto">
		<SectionHeading title="So, who am I?" />
	</div>

	<div
		class="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 lg:gap-20 w-full items-center justify-between max-w-[1200px] mx-auto"
	>
		<div class="md:col-span-8">
			<div class="profile__selector relative mx-auto mb-10 w-full pb-10 md:max-w-[300px]">
				<p
					id="profile-detail-label"
					class="mb-3 text-sm font-medium text-gray-600 dark:text-gray-300"
				>
					How much detail?
				</p>

				<Segment name="justify" labelledby="profile-detail-label" bind:value>
					{#each detailLevels as level (level)}
						<SegmentItem value={level} label={detailLabels[level - 1]}>
							<!-- currentColor with a transition, so the dot fades as the white pill
							     slides under it instead of flipping while the pill is mid-travel. -->
							<span
								class="flex transition-colors duration-300 ease-out motion-reduce:transition-none"
								class:text-primary-500={value === level}
								class:text-white={value !== level}
							>
								<Icon src={VscCircle} size="20" color="currentColor" />
							</span>
						</SegmentItem>
					{/each}
				</Segment>

				<p class="absolute bottom-0 left-0 tracking-widest">Shortest</p>
				<p class="absolute right-0 bottom-0 tracking-widest">Longest</p>
			</div>

			<div
				class="text-xl font-medium first-letter:text-6xl first-letter:font-bold leading-[45px] profile__details"
			>
				<!-- profileDetails is static author-written markup in src/data/profile.ts, never user input -->
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html profileDetails[value - 1]}
			</div>
		</div>
		<div
			class="md:col-span-4 hidden md:flex items-center justify-center bg-dark-theme rounded-t-lg border-2 border-gray-100 shadow-sm shadow-dark-theme"
		>
			<img
				alt="Ayomide Odewale"
				src="/personal/ayomide-odewale-maestro.png"
				width={100 * value}
				height={30 * value}
				loading="lazy"
				class="max-w-full h-auto"
			/>
		</div>
	</div>
</div>
