<script lang="ts">
	type Props = {
		checked?: boolean;
		label: string;
		name?: string;
	};

	let { checked = $bindable(false), label, name }: Props = $props();
</script>

<label class="inline-flex cursor-pointer items-center">
	<input type="checkbox" class="peer sr-only" {name} aria-label={label} bind:checked />
	<span
		class="relative h-7 w-12 rounded-full bg-gray-300 transition-colors duration-300 ease-in-out peer-checked:bg-primary-hov peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-500 dark:bg-gray-600"
	>
		<span
			class="absolute left-1 top-1 h-5 w-5 rounded-full bg-white transition-transform duration-300 ease-in-out"
			class:translate-x-5={checked}
		></span>
	</span>
</label>
