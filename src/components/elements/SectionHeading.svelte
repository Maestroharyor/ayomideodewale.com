<script lang="ts">
	let { title }: { title: string } = $props();
</script>

<div class="overflow-x-hidden w-full pt-5">
	<!--
		`w-max` sizes the heading to its content so the ::before rule in app.css can
		start just past the last word. It needs `max-w-full` beside it: without the
		cap a long title lays out wider than the container and the overflow rule
		above silently clips the end of it, which is what happened to "Here are some
		of my favourite projects". With the cap the text wraps instead, and the
		decorative rule falls outside the container and is clipped rather than the
		words. The type scales down too, so wrapping is the exception.
	-->
	<h2
		class="section__title relative mx-auto mb-10 max-w-full w-max pt-4 text-center text-3xl font-bold leading-snug text-primary-500 sm:text-4xl md:mx-0 md:pt-0 md:text-left lg:text-5xl dark:text-warning-500"
	>
		{title}
	</h2>
</div>
