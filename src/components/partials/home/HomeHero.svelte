<script lang="ts">
	import FaCode from 'svelte-icons-pack/fa/FaSolidCode';
	import FaPalette from 'svelte-icons-pack/fa/FaSolidPalette';
	import FaNodeJs from 'svelte-icons-pack/fa/FaBrandsNodeJs';
	import FaJs from 'svelte-icons-pack/fa/FaBrandsJs';
	import FaGit from 'svelte-icons-pack/fa/FaBrandsGit';
	import FaReact from 'svelte-icons-pack/fa/FaBrandsReact';
	import FaPython from 'svelte-icons-pack/fa/FaBrandsPython';
	import FaVue from 'svelte-icons-pack/fa/FaBrandsVuejs';

	import Icon from 'svelte-icons-pack/Icon.svelte';
</script>

<!-- <div
	initial={{ scale: 0, opacity: 0 }}
	animate={{ scale: 1, opacity: 1 }}
	transition={{ duration: 1.5, type: 'spring', stiffness: 100 }}
	class="relative min-h-[100vh] w-full pt-20 pb-52 px-5 m-auto flex justify-center text-center flex-col items-center z-1 max-w-[1200px]"
> -->
<div
	class="relative min-h-[100vh] w-full pt-20 pb-52 px-5 m-auto flex justify-center text-center flex-col items-center z-1 max-w-[1200px]"
>
	<p class="text-xl mb-5">Hello, I&apos;m Ayomide (Maestro).</p>
	<h1
		class="heroTitle inline-block max-w-2xl lg:max-w-4xl w-auto relative text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-snug mb-10 font-bold dark:text-white"
	>
		I love{' '}
		<span class="text-primary-500 dark:text-warning-500">designing</span> and
		<span class="text-primary-500 dark:text-warning-500"> building</span> web and software solutions.
	</h1>

	<div
		class="_floating opacity-50 text-primary-500 bottom-[227px] left-[307px] rotate-[70deg]"
		style="animation-delay: 0.8s;"
	>
		<Icon src={FaPalette} size={'100'} color={'#4F46E5'} />
	</div>

	<div
		class="_floating opacity-50 text-primary-500 bottom-[227px] right-[307px] rotate-[70deg]"
		style="animation-delay: 0.2s;"
	>
		<Icon src={FaNodeJs} size={'100'} color={'#4F46E5'} />
	</div>

	<div
		class="_floating opacity-80 text-primary-500 bottom-[147px] right-[557px] rotate-[70deg]"
		style="animation-delay: 0.6s;"
	>
		<Icon src={FaJs} size={'100'} color={'#4F46E5'} />
	</div>

	<div class="_floating opacity-50 text-primary-500 bottom-[192px] left-[10px] rotate-[70deg]">
		<Icon src={FaGit} size={'100'} color={'#4F46E5'} />
	</div>
	<div
		class="_floating opacity-30 md:opacity-50 text-primary-500 top-[192px] md:top-[92px] left-[-50px] sm:left-[10px] rotate-[70deg]"
		style="animation-delay: 0.6s;"
	>
		<Icon src={FaReact} size={'100'} color={'#4F46E5'} />
	</div>
	<div
		class="_floating opacity-30 md:opacity-50 text-primary-500 top-[192px] md:top-[92px] right-[-50px] sm:right-[10px] rotate-[70deg]"
		style="animation-delay: 0.4s;"
	>
		<Icon src={FaVue} size={'100'} color={'#4F46E5'} />
	</div>
	<div class="_floating opacity-50 text-primary-500 bottom-[192px] right-[10px] rotate-[70deg]">
		<Icon src={FaPython} size={'100'} color={'#4F46E5'} />
	</div>
	<div
		class="_floating opacity-90 text-primary-500 top-[10px] left-[calc(50%-30px)] rotate-45"
		style="animation-delay: 0.4s;"
	>
		<Icon src={FaCode} size={'100'} color={'#4F46E5'} />
	</div>

	<!-- <FaPalette
		class="_floating opacity-50 text-primary-500 bottom-[227px]  left-[307px] rotate-[70deg]"
		size={100}
		style={{ animationDelay: '0.8s' }}
	/>
	<FaNodeJs
		class="_floating opacity-50 text-primary-500 bottom-[227px]  right-[307px] rotate-[70deg]"
		size={100}
		style={{ animationDelay: '0.2s' }}
	/>
	<FaJs
		class="_floating opacity-80 text-primary-500 bottom-[147px]  right-[557px] rotate-[70deg]"
		size={100}
		style={{ animationDelay: '0.6s' }}
	/>
	<FaGit
		class="_floating opacity-50 text-primary-500 bottom-[192px]  left-[10px] rotate-[70deg]"
		size={100}
	/>

	<FaReact
		class="_floating opacity-30 md:opacity-50 text-primary-500  top-[192px] md:top-[92px] left-[-50px] sm:left-[10px] rotate-[70deg]"
		size={100}
		style={{ animationDelay: '0.6s' }}
	/>
	<FaVuejs
		class="_floating opacity-30 md:opacity-50 text-primary-500 top-[192px] md:top-[92px] right-[-50px] sm:right-[10px] rotate-[70deg]"
		size={100}
		style={{ animationDelay: '0.4s' }}
	/>
	<FaPython
		class="_floating opacity-50 text-primary-500 bottom-[192px]  right-[10px] rotate-[70deg]"
		size={100}
	/>
	<FaCode
		class="_floating opacity-90 text-primary-500 top-[10px] left-[calc(50%-30px)] rotate-45"
		size={50}
		style={{ animationDelay: '0.4s' }}
	/> -->
	<!-- <ScrollLink
          activeClass="active"
          to="profile"
          spy={true}
          offset={-30}
          smooth={true}
          duration={500}
          aria-label="More"
        > -->
	<div
		class="border-2 rounded-full px-8 py-2 border-primary-500 dark:border-white text-lg font-medium text-primary-500 hover:text-dark-theme hover:border-dark-theme transition duration-400 ease-in-out dark:text-gray-200 dark:hover:text-warning-500 dark:hover:border-warning-500"
	>
		Tell me more
	</div>
	<!-- </ScrollLink> -->
</div>
