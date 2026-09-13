<script lang="ts">
	import '@fontsource/koho/200.css';
	import '@fontsource/koho/300.css';
	import '@fontsource/koho/400.css';
	import '@fontsource/koho/500.css';
	import '@fontsource/koho/600.css';
	import '@fontsource/koho/700.css';
	import '../app.css';

	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { ModeWatcher, mode } from 'mode-watcher';
	import Particles, { particlesInit } from '@tsparticles/svelte';
	import { loadSlim } from '@tsparticles/slim';

	import Header from '../components/partials/headers/Header.svelte';
	import Footer from '../components/partials/footers/Footer.svelte';
	import ContactMe from '../components/elements/ContactMe.svelte';
	import Modal from '../components/ui/Modal.svelte';
	import Toast from '../components/ui/Toast.svelte';

	let { children } = $props();

	// The resume routes print to PDF. Site chrome (header, footer, particles, the
	// contact modal) has no place in that document, and the footer was spilling
	// onto a third page of every export.
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

	// Must resolve before <Particles /> mounts, so we gate the component on it
	// rather than racing it.
	let engineReady = $state(false);
	void particlesInit(async (engine) => {
		await loadSlim(engine);
	})
		.then(() => (engineReady = true))
		.catch((err) => console.error('Failed to initialise tsParticles', err));

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

{#if isPrintRoute}
	{@render children()}
{:else}
	<!-- The site is designed dark first; light is the deliberate opt-out rather
	     than whatever the visitor's OS happens to be set to. `track` stays on so
	     an explicit "system" choice still follows the OS. -->
	<ModeWatcher defaultMode="dark" />

	<!-- Gated on the engine and the resolved mode, then keyed on the mode: exactly one
	     mount per theme, with a stable options object for the life of that instance. -->
	{#if engineReady && mode.current}
		{#key mode.current}
			<Particles id="tsparticles" options={buildParticlesConfig(mode.current === 'light')} />
		{/key}
	{/if}

	<Modal>
		<ContactMe />
	</Modal>
	<Toast />
	<Header />
	{@render children()}
	<Footer />
{/if}
