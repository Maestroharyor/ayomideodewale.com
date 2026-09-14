<script lang="ts">
	/**
	 * An unplugged cable, for errors that are not a 404: something was connected
	 * and is not any more. Same stroke language as the doodles in static/doodles.
	 *
	 * `currentColor` throughout, so the parent's text colour drives it and it
	 * follows the theme.
	 */
	let { size = 200 }: { size?: number } = $props();
</script>

<svg
	width={size}
	height={Math.round(size * 0.8)}
	viewBox="0 0 200 160"
	fill="none"
	stroke="currentColor"
	stroke-width="3"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	focusable="false"
>
	<!-- socket, left -->
	<path d="M16 96h34c9.9 0 18-8.1 18-18v-8c0-9.9-8.1-18-18-18H16" />
	<path d="M44 66v6M44 84v6" opacity="0.7" />

	<!-- plug, right, pulled clear -->
	<path d="M184 96h-30c-9.9 0-18-8.1-18-18v-8c0-9.9 8.1-18 18-18h30" />
	<path d="M136 62h-14M136 86h-14" opacity="0.7" />

	<!-- the gap, with a spark -->
	<path d="M86 74h10M104 74h10" opacity="0.5" />
	<path d="m100 50-8 16h14l-8 16" />

	<!-- slack cable falling away -->
	<path d="M16 96c-8 14 6 26 22 22s18 14 30 12" opacity="0.45" />
	<path d="M184 96c8 14-6 26-22 22s-18 14-30 12" opacity="0.45" />
</svg>
