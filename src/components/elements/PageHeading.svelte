<script lang="ts">
	export let title: string;
	export let description: string;
</script>

<div class="max-w-[700px] mx-auto py-20 flex flex-col gap-10 items-center justify-center px-5">
	<h1
		class="max-w-sm md:max-w-max mx-auto md:mx-0 text-center md:text-left relative text-5xl font-bold pt-4 md:pt-0 md:w-max text-primary dark:text-warning"
	>
		{title}
	</h1>
	<p class="text-2xl text-center">{description}</p>
</div>
