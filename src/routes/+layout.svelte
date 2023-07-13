<script lang="ts">
	import { modeCurrent } from '@skeletonlabs/skeleton';
	import { Modal, modalStore, Toast, toastStore } from '@skeletonlabs/skeleton';

	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';

	let lightMode = $modeCurrent.valueOf();
	// onMount(() => {
	// 	modeCurrent.subscribe((mode) => {
	// 		lightMode = mode;
	// 	});
	// });

	afterUpdate(() => {
		lightMode = $modeCurrent.valueOf();
	
	});
	// console.log($modeCurrent.valueOf());

	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { autoModeWatcher } from '@skeletonlabs/skeleton';
	import Header from '../components/partials/headers/Header.svelte';
	import Footer from '../components/partials/footers/Footer.svelte';

	import { afterUpdate, onMount } from 'svelte';
	import { loadFull } from 'tsparticles';
	import ContactMe from '../components/elements/ContactMe.svelte';

	let ParticlesComponent: any;

	onMount(async () => {
		const module = await import('svelte-particles');

		ParticlesComponent = module.default;
	});

	// let particlesUrl = "http://foo.bar/particles.json"; // placeholder, replace it with a real url

	let particlesConfig = {
		// particles: {
		// 	color: {
		// 		value: '#000'
		// 	},
		// 	links: {
		// 		enable: true,
		// 		color: '#000'
		// 	},
		// 	move: {
		// 		enable: true
		// 	},
		// 	number: {
		// 		value: 100
		// 	}
		// }
		background: {
			// color: lightMode ? '#f3f4f6' : '#000A1F'
			// color: '#000A1F'
		},
		detectRetina: false,
		fpsLimit: 30,
		interactivity: {
			detectsOn: 'canvas',
			events: {
				resize: true
			}
		},

		particles: {
			color: {
				// value: $modeCurrent.valueOf() ? '#42489E' : '#f3f4f6'
				value: lightMode ? '#000' : '#f3f4f6'
				// value: '#f3f4f6'
			},
			number: {
				density: {
					enable: true,
					area: 1080
				},
				limit: 0,
				value: 400
			},
			opacity: {
				animation: {
					enable: true,
					minimumValue: 0.05,
					speed: 0.25,
					sync: false
				},
				random: {
					enable: true,
					minimumValue: 0.05
				},
				value: 1
			},
			shape: {
				type: 'circle'
			},
			size: {
				random: {
					enable: true,
					minimumValue: 0.5
				},
				value: 2
			}
		},
		fullScreen: {
			enable: true,
			zIndex: -1 // or any value is good for you, if you use -1 set `interactivity.detectsOn` to `"window"` if you need mouse interactions
		}
	};

	let onParticlesLoaded = (event: any) => {
		const particlesContainer = event.detail.particles;

		// you can use particlesContainer to call all the Container class
		// (from the core library) methods like play, pause, refresh, start, stop
	};

	let particlesInit = async (main: any) => {
		// you can use main to customize the tsParticles instance adding presets or custom shapes
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(main);
	};

	const modalComponentRegistry: Record<string, ModalComponent> = {
		// Custom Modal 1
		contactComponent: {
			// Pass a reference to your custom component
			ref: ContactMe
		}
	};
</script>

<svelte:component
	this={ParticlesComponent}
	id="tsparticles"
	class="foo bar"
	style=""
	options={particlesConfig}
	on:particlesLoaded={onParticlesLoaded}
	{particlesInit}
/>
<!-- App Shell -->
<svelte:head
	>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head
>
<Toast />
<Modal components={modalComponentRegistry} />
<AppShell>
	<svelte:fragment slot="header">
		<!-- Header -->

		<Header />
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
	<Footer />
</AppShell>
