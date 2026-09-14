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
	 * The portrait answers to the detail control in shape, and to the prose in
	 * height.
	 *
	 * At the two shortest settings the bio is a couple of lines, and any full
	 * portrait beside it leaves most of the row empty however it is sized. Those
	 * get the circular crop at avatar size, which is what two lines of text want
	 * next to them, centred against it rather than hung from its top edge: the
	 * circle is taller than the prose at those levels, so aligning tops leaves the
	 * text floating at the top of a much taller cell.
	 *
	 * Beyond that it takes a 3:4 crop, which lands within a few pixels of the
	 * prose height at level three and stays shorter than it above that.
	 *
	 * It is a ratio rather than `h-full` because `h-full` never resolved: the grid
	 * row is sized by its content and the image is that content, so the height was
	 * circular and the image fell back to its natural 1:1.59, rendering 576px tall
	 * against 469px of text. Sticky covers the longer levels, where the text is
	 * taller than the image by design.
	 */
	const isCompact = $derived(value <= 2);
	const avatarSize = $derived(180 + value * 50);
</script>

<div
	class="w-full px-5 pt-24 pb-24 bg-dark/[0.02] dark:bg-dark-background/40"
	id="about"
	use:reveal
>
	<div class="max-w-[1200px] mx-auto">
		<SectionHeading title="So, who am I?" />
	</div>

	<!--
		The control sits above the row, not inside the text column. While it was the
		first child of that column, `items-start` aligned the portrait's top edge to
		the control rather than to the prose beside it. `md:w-2/3` keeps it over the
		text column, matching the 8-of-12 split below.
	-->
	<div class="mx-auto w-full max-w-[1200px]">
		<div class="md:w-2/3">
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
		</div>
	</div>

	<div
		class={`mx-auto grid w-full max-w-[1200px] grid-cols-1 justify-between gap-5 md:grid-cols-12 md:gap-8 lg:gap-14 ${
			isCompact ? 'md:items-center' : 'md:items-stretch'
		}`}
	>
		<div class="md:col-span-8">
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
			{#if isCompact}
				<div class="md:sticky md:top-28">
					<img
						alt="Ayomide Odewale"
						src="/personal/profile.webp"
						width="1024"
						height="1024"
						loading="lazy"
						decoding="async"
						style={`width: ${avatarSize}px; height: ${avatarSize}px`}
						class="mx-auto rounded-full object-cover shadow-lg transition-[width,height] duration-500 ease-out motion-reduce:transition-none"
					/>
				</div>
			{:else}
				<div class="md:sticky md:top-28">
					<img
						alt="Ayomide Odewale"
						src="/personal/ayomide-odewale.webp"
						width="800"
						height="1270"
						loading="lazy"
						decoding="async"
						class="aspect-[3/4] w-full rounded-2xl object-cover object-top shadow-lg ring-1 ring-gray-200 dark:ring-primary-600"
					/>
				</div>
			{/if}
		</div>
	</div>
</div>
