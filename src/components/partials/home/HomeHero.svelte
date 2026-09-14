<script lang="ts">
	import { AVAILABILITY } from '../../../data/site';
	import { Icon } from 'svelte-icons-pack';
	import {
		FaSolidCode as FaCode,
		FaBrandsNodeJs as FaNodeJs,
		FaBrandsGit as FaGit,
		FaBrandsReact as FaReact,
		FaBrandsPython as FaPython,
		FaBrandsVuejs as FaVue,
		FaBrandsGolang as FaGolang,
		FaBrandsAws as FaAws
	} from 'svelte-icons-pack/fa';
	// Terraform has no Font Awesome glyph, so it comes from Simple Icons.
	import { SiTerraform, SiTypescript, SiSvelte } from 'svelte-icons-pack/si';
</script>

<!-- <div
	initial={{ scale: 0, opacity: 0 }}
	animate={{ scale: 1, opacity: 1 }}
	transition={{ duration: 1.5, type: 'spring', stiffness: 100 }}
	class="relative min-h-[100vh] w-full pt-20 pb-52 px-5 m-auto flex justify-center text-center flex-col items-center z-1 max-w-[1200px]"
> -->
<div
	class="relative min-h-[100vh] w-full overflow-x-hidden pt-20 pb-52 px-5 m-auto flex justify-center text-center flex-col items-center z-1 max-w-[1200px]"
>
	<!--
		The availability line, first thing in the reading order after the header.
		A recruiter landing cold had no way to tell whether I was looking.
	-->
	<p
		class="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50/70 px-4 py-1.5 text-sm font-medium text-primary-700 dark:border-primary-600 dark:bg-primary-900/40 dark:text-gray-200"
	>
		<span class="relative flex h-2 w-2">
			<!-- The ping is decorative and stops under prefers-reduced-motion via app.css. -->
			<span class="_pulse absolute inline-flex h-full w-full rounded-full bg-success-500 opacity-75"
			></span>
			<span class="relative inline-flex h-2 w-2 rounded-full bg-success-500"></span>
		</span>
		{AVAILABILITY}
	</p>

	<p class="text-xl mb-5">Hello, I&apos;m Ayomide (Maestro).</p>
	<h1
		class="heroTitle relative mb-10 inline-block w-auto max-w-2xl text-[1.9rem] font-bold tracking-tighter leading-snug sm:max-w-4xl sm:text-[clamp(1.5rem,6.2vw,4rem)] dark:text-white"
	>
		<!-- From sm up the clause holds together on one line, so the type is sized
		     off the viewport rather than in fixed breakpoint steps: at text-7xl it
		     measured 987px inside an 896px container and was silently clipped by
		     overflow-x-hidden. The 4rem cap is what keeps that line inside the
		     container at full width.

		     Below sm that cap works against us: sizing 37 characters to fit one
		     phone-width line drove the headline down to ~24px, smaller than the
		     body copy under it. So the clause wraps there and takes a fixed size
		     instead, which is the whole point of a hero line. -->
		<span class="sm:whitespace-nowrap"
			>I build and ship <span class="text-primary-500 dark:text-warning-500"
				>fullstack solutions</span
			>,</span
		>
		front end to <span class="text-primary-500 dark:text-warning-500">infrastructure</span>.
	</h1>

	<div
		class="_floating opacity-50 text-primary-500 dark:text-primary-400 bottom-[188px] right-[calc(50%-300px)] lg:right-[calc(50%-400px)] rotate-[70deg]"
		style="animation-delay: 0.2s;"
	>
		<Icon src={FaNodeJs} size="100" color="currentColor" />
	</div>

	<div
		class="_floating opacity-80 text-primary-500 dark:text-primary-400 bottom-[188px] left-[calc(50%-300px)] lg:left-[calc(50%-400px)]"
		style="animation-delay: 0.6s;"
	>
		<Icon src={SiTypescript} size="90" color="currentColor" />
	</div>

	<div
		class="_floating opacity-50 text-primary-500 dark:text-primary-400 bottom-[192px] left-[10px] rotate-[70deg]"
	>
		<Icon src={FaGit} size="100" color="currentColor" />
	</div>
	<div
		class="_floating opacity-30 md:opacity-50 text-primary-500 top-[192px] md:top-[92px] left-[-50px] sm:left-[10px] rotate-[70deg]"
		style="animation-delay: 0.6s;"
	>
		<Icon src={FaReact} size="100" color="currentColor" />
	</div>
	<div
		class="_floating opacity-30 md:opacity-50 text-primary-500 top-[192px] md:top-[92px] right-[-50px] sm:right-[10px] rotate-[70deg]"
		style="animation-delay: 0.4s;"
	>
		<Icon src={FaVue} size="100" color="currentColor" />
	</div>
	<div
		class="_floating opacity-50 text-primary-500 dark:text-primary-400 bottom-[192px] right-[10px] rotate-[70deg]"
	>
		<Icon src={FaPython} size="100" color="currentColor" />
	</div>
	<div
		class="_floating opacity-90 text-primary-500 dark:text-primary-400 top-[10px] left-[calc(50%-30px)] rotate-45"
		style="animation-delay: 0.4s;"
	>
		<Icon src={FaCode} size="100" color="currentColor" />
	</div>

	<!-- Go, Terraform and AWS: current working stack, and the direction the
		 rest of the site now points at. Hidden below sm alongside the other
		 decorations so they cannot collide on a narrow screen.

		 The bottom four sit on two rings rather than one band: Go and Svelte
		 inner, TypeScript and Node out on the shoulders. At equal height and
		 spacing they read as a crowded row with a hole in the middle. Offsets
		 widen at lg, where there is room. -->
	<div
		class="_floating hidden sm:block opacity-50 text-primary-500 bottom-[110px] left-[calc(50%-150px)] lg:left-[calc(50%-190px)]"
		style="animation-delay: 1s;"
	>
		<Icon src={FaGolang} size="100" color="currentColor" />
	</div>
	<div
		class="_floating hidden sm:block opacity-50 text-primary-500 bottom-[110px] right-[calc(50%-150px)] lg:right-[calc(50%-190px)] rotate-[70deg]"
		style="animation-delay: 0.9s;"
	>
		<Icon src={SiSvelte} size="80" color="currentColor" />
	</div>
	<div
		class="_floating hidden md:block opacity-40 text-primary-500 top-[132px] left-[calc(50%-260px)] rotate-[70deg]"
		style="animation-delay: 0.3s;"
	>
		<Icon src={SiTerraform} size="72" color="currentColor" />
	</div>
	<div
		class="_floating hidden md:block opacity-40 text-primary-500 top-[132px] right-[calc(50%-260px)] rotate-[70deg]"
		style="animation-delay: 0.7s;"
	>
		<Icon src={FaAws} size="90" color="currentColor" />
	</div>

	<!-- <ScrollLink
          activeClass="active"
          to="profile"
          spy={true}
          offset={-30}
          smooth={true}
          duration={500}
          aria-label="More"
        > -->
	<!--
		Two calls to action. The resume was reachable only from the nav, which is
		the thing a recruiter opens first and the thing the page never offered.
	-->
	<div class="flex flex-wrap items-center justify-center gap-4">
		<a
			href="#about"
			class="rounded-full border-2 border-primary-500 px-8 py-2 text-lg font-medium text-primary-500 transition duration-300 ease-in-out hover:border-dark-theme hover:text-dark-theme dark:border-white dark:text-gray-200 dark:hover:border-warning-500 dark:hover:text-warning-500"
		>
			Tell me more
		</a>
		<a
			href="/resume"
			class="rounded-full bg-primary-500 px-8 py-2 text-lg font-medium text-white transition duration-300 ease-in-out hover:bg-primary-600 dark:bg-warning-500 dark:text-primary-900 dark:hover:bg-warning-hov"
		>
			See my resume
		</a>
	</div>
	<!-- </ScrollLink> -->
</div>
