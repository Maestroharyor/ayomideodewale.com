<script module lang="ts">
	import { particlesInit } from '@tsparticles/svelte';
	import { loadSlim } from '@tsparticles/slim';

	/**
	 * Engine registration, once per module and never on the server.
	 *
	 * `loadSlim` registers plugins on the tsParticles singleton, and the library
	 * refuses to register after anything has called `load()`. The call used to sit
	 * in the instance script, which runs on every server render, so the first
	 * render registered and every one after it threw
	 * "Register plugins can only be done before calling tsParticles.load()".
	 *
	 * Module scope rather than instance scope so a hot reload, or any remount of
	 * the root layout, reuses the same promise instead of registering twice.
	 * Called from an $effect below, which never runs on the server.
	 */
	let enginePromise: Promise<void> | null = null;

	function initParticleEngine(): Promise<void> {
		enginePromise ??= particlesInit(async (engine) => {
			await loadSlim(engine);
		});
		return enginePromise;
	}
</script>

<script lang="ts">
	// 200 and 300 were imported and used by nothing: a grep across src finds zero
	// font-thin, font-extralight and font-light. Each was a render-blocking
	// stylesheet and a woff2 fetch for a weight that never painted.
	import '@fontsource/koho/400.css';
	import '@fontsource/koho/500.css';
	import '@fontsource/koho/600.css';
	import '@fontsource/koho/700.css';
	// ?url so Vite resolves the hashed build path; preloaded in <svelte:head>
	// below because the LCP element on / is the hero <h1>, which is font-bold, so
	// this file sits directly on the LCP path.
	import koho700 from '@fontsource/koho/files/koho-latin-700-normal.woff2?url';
	import '../app.css';

	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { ModeWatcher, mode } from 'mode-watcher';
	import Particles from '@tsparticles/svelte';

	import Header from '../components/partials/headers/Header.svelte';
	import Footer from '../components/partials/footers/Footer.svelte';
	import Toast from '../components/ui/Toast.svelte';
	import CursorTrail from '../components/ui/CursorTrail.svelte';

	let { children } = $props();

	// The resume routes print to PDF. Site chrome (header, footer, particles) has
	// no place in that document, and the footer was spilling onto a third page of
	// every export.
	const isPrintRoute = $derived(
		page.route.id === '/resume' || (page.route.id?.startsWith('/r/') ?? false)
	);

	// app.css sets `scroll-behavior: smooth` on html, which is what makes the
	// in-page #about / #experience anchors glide. The side effect is that
	// SvelteKit's scroll reset animates too, and a fast navigation cancels it
	// part-way — so landing on a new page kept the old scroll position. Reset
	// explicitly and instantly, and leave anchor links to the smooth default.
	afterNavigate(({ to, type }) => {
		if (type === 'popstate') return; // Browser back/forward restores its own position.
		if (to?.url.hash) return; // Anchor targets should keep the smooth scroll.
		window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
	});

	// A continuously drifting background is exactly what this setting asks us not
	// to paint, so the canvas is never mounted rather than mounted and stilled.
	let allowsMotion = $state(true);
	$effect(() => {
		const query = window.matchMedia('(prefers-reduced-motion: reduce)');
		const sync = () => (allowsMotion = !query.matches);
		sync();
		query.addEventListener('change', sync);
		return () => query.removeEventListener('change', sync);
	});

	// Must resolve before <Particles /> mounts, so we gate the component on it
	// rather than racing it. Inside an $effect so it is client-only.
	let engineReady = $state(false);
	$effect(() => {
		initParticleEngine()
			.then(() => (engineReady = true))
			.catch((err) => console.error('Failed to initialise tsParticles', err));
	});

	// A plain function, not $derived: @tsparticles/svelte is a legacy-mode component
	// whose reactive block reloads (and destroys) the container every time the
	// `options` identity changes. A $derived object churns that identity and the
	// container ends up destroyed without ever painting. Built once per mount instead.
	const buildParticlesConfig = (lightMode: boolean) => ({
		detectRetina: false,
		detectsOn: 'canvas',
		fpsLimit: 30,
		interactivity: {
			events: {
				resize: { enable: true }
			}
		},
		particles: {
			// v4 renamed `particles.color` to `particles.paint.color`. The old key is
			// silently dropped, which left every particle the default white: fine on
			// the dark background, invisible on the light one.
			paint: {
				color: {
					// Light mode gets a mid grey, not near-black: 400 dark dots over white
					// read as a grey wash rather than texture, and the page stops looking white.
					value: lightMode ? '#9ca3af' : '#f3f4f6'
				}
			},
			number: {
				density: {
					enable: true,
					area: 1080
				},
				value: 400
			},
			opacity: {
				animation: {
					enable: true,
					minimumOpacity: 0.05,
					speed: 0.25,
					sync: false
				},
				value: { min: 0.05, max: 0.45 }
			},
			shape: {
				type: 'circle'
			},
			// A slow drift rather than a static field. Speed is deliberately well
			// under 1: at 400 particles anything faster reads as snow and pulls the
			// eye away from the copy. `outModes: out` lets them leave and re-enter
			// instead of bouncing off an invisible wall at the viewport edge.
			move: {
				enable: true,
				speed: 0.6,
				direction: 'none' as const,
				random: true,
				straight: false,
				outModes: { default: 'out' as const }
			},
			size: {
				value: { min: 0.5, max: 2 }
			}
		},
		fullScreen: {
			enable: true,
			// if you set this to -1, set `detectsOn` to "window" for mouse interactions
			zIndex: -1
		}
	});
</script>

<svelte:head>
	<link rel="preload" href={koho700} as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

{#if isPrintRoute}
	{@render children()}
{:else}
	<!-- The site is designed dark first; light is the deliberate opt-out rather
	     than whatever the visitor's OS happens to be set to. `track` stays on so
	     an explicit "system" choice still follows the OS. -->
	<ModeWatcher defaultMode="dark" />

	<!-- Gated on the engine and the resolved mode, then keyed on the mode: exactly one
	     mount per theme, with a stable options object for the life of that instance. -->
	{#if engineReady && allowsMotion && mode.current}
		{#key mode.current}
			<Particles id="tsparticles" options={buildParticlesConfig(mode.current === 'light')} />
		{/key}
	{/if}

	<!--
		First focusable element on the page, which is the whole point: anything
		focusable before it defeats it. With a sticky header and a full-viewport
		hero, a keyboard visitor previously had to tab through the entire nav on
		every route before reaching the content.

		Hidden with sr-only rather than display:none, which would take it out of
		the tab order along with everything else.
	-->
	<a
		href="#main"
		class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-primary-500 focus:px-6 focus:py-3 focus:font-medium focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-warning-500"
	>
		Skip to main content
	</a>

	<Toast />
	<!-- Inside the non-print branch: a printed resume has no pointer, and the
	     component's own class is what applies `cursor: none`. -->
	<CursorTrail />
	<Header />
	{@render children()}
	<Footer />
{/if}
