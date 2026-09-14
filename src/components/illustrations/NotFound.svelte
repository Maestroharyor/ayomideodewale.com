<script lang="ts">
	/**
	 * A map pin that has come loose from its map: the page exists as an address,
	 * but nothing is at it. Same stroke language as the doodles in static/doodles.
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
	<!-- folded map -->
	<path d="M24 44 68 30l44 14 44-14v86l-44 14-44-14-44 14V44Z" />
	<path d="M68 30v86M112 44v86" opacity="0.5" />

	<!-- a route that stops short -->
	<path d="M44 96c14-10 22 6 34-4s14-20 26-14" opacity="0.6" stroke-dasharray="1 9" />

	<!-- the pin, tilted, sitting off the map -->
	<g transform="rotate(14 150 64)">
		<path d="M150 26c12.7 0 23 10.3 23 23 0 17-23 41-23 41s-23-24-23-41c0-12.7 10.3-23 23-23Z" />
		<circle cx="150" cy="49" r="8" />
	</g>

	<!-- puzzled marks -->
	<path d="M176 22c3-6 11-5 11 1 0 5-6 4-6 9" opacity="0.65" />
	<path d="M181 40h.01" opacity="0.65" />
</svg>
