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

	/**
	 * The portrait tracks the detail control, so picking more detail visibly does
	 * something on both sides of the row rather than only growing the text.
	 * Ranges 430px to 670px; the source is 800x1270, so even the tallest crop is
	 * well inside the image and never upscales.
	 */
	const photoHeight = $derived(370 + value * 60);
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
		class="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-start justify-between gap-5 md:grid-cols-12 md:gap-8 lg:gap-14"
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
		<!--
			A framed photograph now, not a cutout on a dark panel. The previous image
			was a transparent PNG, which is why it sat directly on bg-dark-theme; this
			one has its own background, so the panel behind it would never be seen and
			the border read as a frame drawn around nothing.

			The size no longer tracks the bio length either. Growing the portrait as
			the text got longer made sense for a floating cutout and reads as a glitch
			on a framed photo, so the frame holds one aspect ratio and the image is
			cropped to fill it.
		-->
		<!--
			Two things this column has to do at once.

			It follows the detail control: the portrait grows as the bio gets longer,
			so the two sides of the row stay in proportion instead of the image
			sitting fixed beside a block of text that quadruples in height.

			And it sticks. Even grown, the longest bio is taller than the portrait,
			so without this it would scroll away and leave the reader with an empty
			column. object-top keeps the face in frame as the crop height changes.
		-->
		<div class="hidden md:col-span-4 md:block">
			<div class="md:sticky md:top-28">
				<img
					alt="Ayomide Odewale"
					src="/personal/ayomide-odewale.webp"
					width="800"
					height="1270"
					loading="lazy"
					decoding="async"
					style={`height: ${photoHeight}px`}
					class="w-full rounded-2xl object-cover object-top shadow-lg ring-1 ring-gray-200 transition-[height] duration-500 ease-out motion-reduce:transition-none dark:ring-primary-600"
				/>
			</div>
		</div>
	</div>
</div>
