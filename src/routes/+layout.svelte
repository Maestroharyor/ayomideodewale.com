<script lang="ts">
	import '@fontsource/koho/200.css';
	import '@fontsource/koho/300.css';
	import '@fontsource/koho/400.css';
	import '@fontsource/koho/500.css';
	import '@fontsource/koho/600.css';
	import '@fontsource/koho/700.css';
	import '../app.css';

	import { ModeWatcher, mode } from 'mode-watcher';
	import Particles, { particlesInit } from '@tsparticles/svelte';
	import { loadSlim } from '@tsparticles/slim';

	import Header from '../components/partials/headers/Header.svelte';
	import Footer from '../components/partials/footers/Footer.svelte';
	import ContactMe from '../components/elements/ContactMe.svelte';
	import Modal from '../components/ui/Modal.svelte';
	import Toast from '../components/ui/Toast.svelte';

	let { children } = $props();

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
					value: lightMode ? '#111827' : '#f3f4f6'
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
				value: { min: 0.05, max: 0.5 }
			},
			shape: {
				type: 'circle'
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

<ModeWatcher />

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
