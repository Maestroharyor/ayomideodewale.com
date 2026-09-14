<script lang="ts">
	/**
	 * An envelope with a sent paper plane, drawn in the same hand-drawn stroke
	 * language as the doodles in static/doodles.
	 *
	 * Strokes are `currentColor` so the parent's text colour drives it and the
	 * illustration follows the theme. An <img>-loaded SVG cannot do that, which is
	 * why these live as components rather than files.
	 */
	let { size = 180 }: { size?: number } = $props();
</script>

<svg
	width={size}
	height={Math.round(size * 0.72)}
	viewBox="0 0 200 144"
	fill="none"
	stroke="currentColor"
	stroke-width="3"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	focusable="false"
>
	<!-- envelope -->
	<path
		d="M28 46.5C28 42.9 30.9 40 34.5 40h86c3.6 0 6.5 2.9 6.5 6.5v56c0 3.6-2.9 6.5-6.5 6.5h-86c-3.6 0-6.5-2.9-6.5-6.5v-56Z"
	/>
	<path d="M28.5 45 74 78c2.1 1.5 4.9 1.5 7 0l45.5-33" />
	<!-- flap shadow, lighter so the fold reads -->
	<path d="M127 102 96 79M28 102l31-23" opacity="0.45" />

	<!-- paper plane leaving -->
	<path d="M188 20 148 44l-22-7 62-17Z" />
	<path d="m126 37 9 20 13-13" />
	<path d="m135 57 12 9 41-46" opacity="0.75" />

	<!-- motion lines -->
	<path d="M150 74h22M158 86h18M166 98h12" opacity="0.55" />

	<!-- a small tick to say it landed -->
	<path d="M52 122h30" opacity="0.35" />
</svg>
