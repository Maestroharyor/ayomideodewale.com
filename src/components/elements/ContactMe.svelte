<script lang="ts">
	// your script goes here
	import { modalStore, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	const closeModal = () => {
		modalStore.clear();
	};

	let name = '';
	let email = '';
	let message = '';
	let isSubmitLoading = false;

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		const formData = {
			name,
			email,
			message
		};
		isSubmitLoading = true;

		try {
			const response: any = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			// Handle the API response here
			// console.log('API response:', response);
			const t: ToastSettings = {
				message: response?.message || 'Message received successfully'
			};
			toastStore.trigger(t);
			isSubmitLoading = false;
		} catch (error: any) {
			// Handle error
			isSubmitLoading = false;

			const t: ToastSettings = {
				message: error?.message || 'An error occured'
			};
			toastStore.trigger(t);
		}
	}
</script>

<div
	class="max-w-[1000px] mx-auto bg-white dark:bg-primary-500 w-full relative rounded-xl px-10 py-20"
>
	<button on:click={closeModal} class="absolute right-2 top-2 group"
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
			<p class="text-lg text-primary-500 dark:text-primary-300 max-w-[400px] mx-auto">
				Got a question or proposal, or just want to say hello? Go ahead.
			</p>
		</div>
		<form
			class="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2"
			on:submit|preventDefault={handleSubmit}
		>
			<div class="">
				<label class="text-sm text-primary-500 dark:text-primary-300" for="name">Your Name</label>
				<input
					placeholder="Enter Your Name"
					class="border-b border-primary-600 dark:border-primary-200 py-3 text-lg bg-white dark:bg-primary-500 focus:outline-none w-full placeholder:text-primary-600 placeholder:dark:text-primary-200"
					id="name"
					name="name"
					bind:value={name}
				/>
			</div>
			<div class="">
				<label class="text-sm text-primary-500 dark:text-primary-300" for="email"
					>Email Address</label
				>
				<input
					type="email"
					placeholder="Enter Your Email Address"
					class="border-b border-primary-600 dark:border-primary-200 py-3 text-lg bg-white dark:bg-primary-500 focus:outline-none w-full placeholder:text-primary-600 placeholder:dark:text-primary-200"
					id="name"
					name="name"
					bind:value={email}
				/>
			</div>
			<div class="md:col-span-2">
				<label class="text-sm text-primary-500 dark:text-primary-300" for="message">Message</label>
				<textarea
					placeholder="Hi Ayomide, I think we need to discuss about a project I have in mind. When can we hop on to discuss it?"
					name="message"
					id="message"
					cols="30"
					class="border-b border-primary-600 dark:border-primary-200 py-3 text-lg bg-white dark:bg-primary-500 focus:outline-none w-full resize-none placeholder:text-primary-600 placeholder:dark:text-primary-200"
					bind:value={message}
				/>
			</div>
			<div class="md:col-span-2 flex justify-center items-center">
				<button
					class="border-2 rounded-full px-20 py-3 border-primary-500 dark:border-white text-lg font-medium text-primary hover:text-dark-theme hover:border-dark-theme transition-all duration-400 ease-in-out dark:text-gray-200 dark:hover:text-warning-500 dark:hover:border-warning-500 disabled:opacity-50"
					type="submit"
					disabled={isSubmitLoading}
				>
					{isSubmitLoading ? 'Submitting...' : 'Get Started'}
				</button>
			</div>
		</form>
	</div>
</div>
