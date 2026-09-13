<script lang="ts">
	import { modal } from '../ui/modal-state.svelte';
	import ContactForm from './ContactForm.svelte';

	const closeModal = () => {
		modal.close();
	};
</script>

<div
	class="max-w-[1000px] mx-auto bg-white dark:bg-primary-500 w-full relative rounded-xl px-10 py-20"
>
	<button
		onclick={closeModal}
		type="button"
		aria-label="Close contact form"
		class="absolute right-2 top-2 group"
		><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M9.17 14.83L14.83 9.17M14.83 14.83L9.17 9.17M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
				stroke="#333333"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="stroke-red-500 group-hover:stroke-red-700 dark:stroke-gray-100 dark:group-hover:stroke-red-500 transition-all duration-300 ease-in-out"
			/>
		</svg>
	</button>

	<div class="space-y-16 max-w-[800px] mx-auto">
		<div class="space-y-3 text-center max-w-[500px] mx-auto">
			<h3 class="text-2xl md:text-5xl font-bold text-primary-500 dark:text-warning-300">
				Send me a message!
			</h3>
			<p class="text-lg text-primary-500 dark:text-primary-200 max-w-[400px] mx-auto">
				Got a question or proposal, or just want to say hello? Go ahead.
			</p>
		</div>

		<ContactForm onSettled={closeModal} />
	</div>
</div>
