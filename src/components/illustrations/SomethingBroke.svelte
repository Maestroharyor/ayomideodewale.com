<script lang="ts">
	/**
	 * A server rack with one unit dropped out of it and sparking.
	 *
	 * Replaces an unplugged cable, which at display size read as two unrelated
	 * hooks either side of a lightning bolt: nothing in the outline said "cable",
	 * so the drawing carried no meaning the heading was not already carrying.
	 * A rack with a gap in it is legible as a silhouette, which is the test an
	 * illustration at 220px has to pass.
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
	<!-- cabinet -->
	<path d="M46 22h84a6 6 0 0 1 6 6v104a6 6 0 0 1-6 6H46a6 6 0 0 1-6-6V28a6 6 0 0 1 6-6Z" />

	<!-- healthy units: a status lamp and vent lines -->
	<path d="M54 40h68" opacity="0.5" />
	<circle cx="60" cy="54" r="3" />
	<path d="M74 54h48" opacity="0.5" />
	<circle cx="60" cy="76" r="3" />
	<path d="M74 76h48" opacity="0.5" />

	<!-- the failed unit: pulled proud of the rack and tilted -->
	<g transform="rotate(-7 96 104)">
		<path d="M52 92h74a5 5 0 0 1 5 5v16a5 5 0 0 1-5 5H52a5 5 0 0 1-5-5V97a5 5 0 0 1 5-5Z" />
		<path d="m88 98-7 9h10l-7 9" />
		<path d="M104 105h18" opacity="0.5" />
	</g>

	<!-- feet -->
	<path d="M56 138v8M120 138v8" opacity="0.6" />

	<!-- sparks escaping the gap -->
	<path d="M148 78h10M152 62l8-6M152 94l8 6" opacity="0.65" />
</svg>
