<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import SectionHeading from '../../elements/SectionHeading.svelte';
	import { profileDetails } from '../../../data/profile';

	import VscCircleOutline from 'svelte-icons-pack/vsc/VscCircleOutline';

	import Icon from 'svelte-icons-pack/Icon.svelte';

	let value: number = 3;
</script>

<!-- <div
      initial={{ x: -10000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, type: "tween" }}
      class=" w-full pt-20 pb-40 px-5 bg-dark/10 dark:bg-dark-background/40 "
      id="profile"
      // style={{ maxWidth: "1200px" }}
    > -->
<div class=" w-full pt-20 pb-40 px-5 bg-dark/10 dark:bg-dark-background/40" id="about">
	<div class="max-w-[1200px] mx-auto">
		<SectionHeading title="So, who am I?" />
	</div>

	<div
		class="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-20 w-full items-center justify-between max-w-[1200px] mx-auto"
	>
		<div class="md:col-span-8">
			<div class="profile__selector relative w-full md:max-w-[300px] mx-auto pb-10 mb-10">
				<RadioGroup labelledby="Select profile details">
					<RadioItem bind:group={value} name="justify" value={1} label="Shortest"
						><Icon
							src={VscCircleOutline}
							size={'20'}
							color={value === 1 ? '#42489e' : '#fff'}
						/></RadioItem
					>
					<RadioItem bind:group={value} name="justify" value={2} label="Short"
						><Icon
							src={VscCircleOutline}
							size={'20'}
							color={value === 2 ? '#42489e' : '#fff'}
						/></RadioItem
					>
					<RadioItem bind:group={value} name="justify" value={3} label="Mid"
						><Icon
							src={VscCircleOutline}
							size={'20'}
							color={value === 3 ? '#42489e' : '#fff'}
						/></RadioItem
					>
					<RadioItem bind:group={value} name="justify" value={4} label="Long"
						><Icon
							src={VscCircleOutline}
							size={'20'}
							color={value === 4 ? '#42489e' : '#fff'}
						/></RadioItem
					>
					<RadioItem bind:group={value} name="justify" value={5} label="Longest"
						><Icon
							src={VscCircleOutline}
							size={'20'}
							color={value === 5 ? '#42489e' : '#fff'}
						/></RadioItem
					>
				</RadioGroup>

				<!-- <Radio.Group
              onChange={onChange}
              defaultValue={3}
              value={value}
              class="w-full flex justify-between"
              size="large"
              // aria-label="profile"
            >
              <Radio value={1}></Radio>
              <Radio value={2}></Radio>
              <Radio value={3}></Radio>
              <Radio value={4}></Radio>
              <Radio value={5}></Radio>
            </Radio.Group> -->

				<p class="absolute left-0 bottom-0 tracking-widest">Shortest</p>
				<p class="absolute right-0 bottom-0 tracking-widest">Longest</p>
			</div>
			<div
				class="text-xl font-medium first-letter:text-6xl first-letter:font-bold leading-[45px] profile__details"
			>
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
				height={'auto'}
			/>
		</div>
	</div>
</div>
