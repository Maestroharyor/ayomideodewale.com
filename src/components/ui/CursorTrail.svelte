<script lang="ts">
	/**
	 * A dot that tracks the pointer, a ring that chases it, and a short tail.
	 *
	 * Deliberately narrow about when it runs at all:
	 *
	 *  - **Fine pointer only.** `(hover: hover) and (pointer: fine)` keeps it off
	 *    touch and stylus, where there is no cursor to replace and a stuck dot in
	 *    the corner is the usual result of forgetting this.
	 *  - **Not under prefers-reduced-motion.** A trail is the exact kind of
	 *    incidental movement that setting asks us to drop, so the native cursor
	 *    comes back rather than the trail merely slowing down.
	 *  - **Only once mounted.** `cursor: none` is applied by a class this component
	 *    adds, so a visitor without JS keeps their pointer instead of losing it.
	 *
	 * One rAF loop drives everything and writes only transforms, so it never reads
	 * layout and cannot thrash.
	 */
	type Dot = { x: number; y: number; el?: HTMLDivElement };

	const TAIL = 6;

	let active = $state(false);
	let pressed = $state(false);
	let overInteractive = $state(false);

	let dotEl = $state<HTMLDivElement | null>(null);
	let ringEl = $state<HTMLDivElement | null>(null);
	const tail: Dot[] = Array.from({ length: TAIL }, () => ({ x: 0, y: 0 }));

	$effect(() => {
		const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

		const sync = () => {
			active = fine.matches && !reduced.matches;
		};
		sync();
		fine.addEventListener('change', sync);
		reduced.addEventListener('change', sync);
		return () => {
			fine.removeEventListener('change', sync);
			reduced.removeEventListener('change', sync);
		};
	});

	$effect(() => {
		if (!active) return;

		let pointerX = window.innerWidth / 2;
		let pointerY = window.innerHeight / 2;
		let ringX = pointerX;
		let ringY = pointerY;
		let visible = false;
		let frame = 0;
		let lastTarget: Element | null = null;

		for (const dot of tail) {
			dot.x = pointerX;
			dot.y = pointerY;
		}

		/**
		 * Writes position only, via the independent `translate` property rather than
		 * `transform`.
		 *
		 * That separation is the point: scale lives in CSS, keyed off the state
		 * classes, so it can transition. Folding both into one `transform` string
		 * meant a transition on it would fight this loop, which rewrites the value
		 * every frame — the size would never ease, and the position would lag.
		 */
		const place = (el: HTMLElement | null | undefined, x: number, y: number) => {
			if (el) el.style.translate = `${x}px ${y}px`;
		};

		const onMove = (event: PointerEvent) => {
			pointerX = event.clientX;
			pointerY = event.clientY;

			if (!visible) {
				visible = true;
				// Jump the chasers to the pointer on first sight, so nothing streaks
				// in from wherever the page happened to start.
				ringX = pointerX;
				ringY = pointerY;
				for (const dot of tail) {
					dot.x = pointerX;
					dot.y = pointerY;
				}
			}

			// Stashed, not resolved. `closest()` walks the ancestor chain against a
			// seven-selector list, and pointermove fires around 120 times a second;
			// the frame loop needs the answer at most 60 times a second.
			lastTarget = event.target instanceof Element ? event.target : null;
		};

		const onLeave = () => {
			visible = false;
			// Release the node: there is no reason to pin a removed element until
			// the pointer happens to move again.
			lastTarget = null;
		};
		const onEnter = () => {
			visible = true;
		};
		const onDown = () => (pressed = true);
		const onUp = () => (pressed = false);

		const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, summary';

		const tick = () => {
			overInteractive = lastTarget !== null && lastTarget.closest(INTERACTIVE) !== null;

			// Each follower eases toward the one in front. A single lerp factor per
			// layer is what produces the tail without storing a position history.
			ringX += (pointerX - ringX) * 0.18;
			ringY += (pointerY - ringY) * 0.18;

			let leadX = pointerX;
			let leadY = pointerY;
			for (const dot of tail) {
				dot.x += (leadX - dot.x) * 0.32;
				dot.y += (leadY - dot.y) * 0.32;
				leadX = dot.x;
				leadY = dot.y;
			}

			place(dotEl, pointerX, pointerY);
			place(ringEl, ringX, ringY);
			for (const dot of tail) place(dot.el, dot.x, dot.y);

			frame = requestAnimationFrame(tick);
		};

		frame = requestAnimationFrame(tick);
		window.addEventListener('pointermove', onMove, { passive: true });
		// Added only once the listeners are attached and the loop is running: if
		// anything above threw, `cursor: none` would be left applied with nothing
		// drawing a replacement.
		document.documentElement.classList.add('has-cursor-trail');
		window.addEventListener('pointerdown', onDown, { passive: true });
		window.addEventListener('pointerup', onUp, { passive: true });
		document.addEventListener('pointerleave', onLeave);
		document.addEventListener('pointerenter', onEnter);

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('pointermove', onMove);
			window.removeEventListener('pointerdown', onDown);
			window.removeEventListener('pointerup', onUp);
			document.removeEventListener('pointerleave', onLeave);
			document.removeEventListener('pointerenter', onEnter);
			document.documentElement.classList.remove('has-cursor-trail');
		};
	});
</script>

{#if active}
	<!-- aria-hidden throughout: this is a pointer decoration and has nothing to
	     announce. pointer-events:none so it never intercepts a click. -->
	<div class="cursor-layer" aria-hidden="true">
		{#each tail as dot, i (i)}
			<div
				bind:this={dot.el}
				class="cursor-tail"
				style={`opacity: ${0.3 - i * 0.04}; width: ${8 - i}px; height: ${8 - i}px; margin: ${-(8 - i) / 2}px 0 0 ${-(8 - i) / 2}px;`}
			></div>
		{/each}
		<div
			bind:this={ringEl}
			class="cursor-ring"
			class:is-over={overInteractive}
			class:is-pressed={pressed}
		></div>
		<div bind:this={dotEl} class="cursor-dot" class:is-pressed={pressed}></div>
	</div>
{/if}
