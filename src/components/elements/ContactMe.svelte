<script lang="ts">
	import { modal } from '../ui/modal-state.svelte';
	import { openToast } from '../ui/toast-state.svelte';

	const NAME_MIN = 5;
	const MESSAGE_MIN = 10;
	const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	let formData = $state({
		name: '',
		email: '',
		message: ''
	});

	let submitted = $state(false);
	let isSubmitLoading = $state(false);

	const errors = $derived({
		name: !formData.name
			? 'Name is required'
			: formData.name.length < NAME_MIN
				? `Name requires at least ${NAME_MIN} characters.`
				: '',
		email: !formData.email
			? 'Email is required'
			: !EMAIL_RE.test(formData.email)
				? 'Email is not valid'
				: '',
		message: !formData.message
			? 'Message is required'
			: formData.message.length < MESSAGE_MIN
				? `Message requires at least ${MESSAGE_MIN} characters.`
				: ''
	});

	const isValid = $derived(!errors.name && !errors.email && !errors.message);

	const closeModal = () => {
		modal.close();
	};

	const handleSubmit = async () => {
		submitted = true;
		if (!isValid) return;

		isSubmitLoading = true;

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			// fetch only rejects on network failure, so a 4xx/5xx lands here too
			// and has to be checked explicitly.
			const body = await response.json().catch(() => ({}));

			if (!response.ok) {
				throw new Error(body.message || 'An error occured while sending the message');
			}

			// The modal unmounts this component on close, so there is no state to
			// reset afterwards - the next open starts from fresh $state.
			closeModal();
			openToast({
				message: body.message || 'Message sent successfully',
				type: 'success'
			});
		} catch (error) {
			closeModal();
			openToast({
				message:
					error instanceof Error ? error.message : 'An error occured while sending the message',
				type: 'error'
			});
		} finally {
			isSubmitLoading = false;
		}
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
		<form
			class="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2"
			onsubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			<div class="">
				<label class="text-sm text-primary-500 dark:text-primary-200" for="name">Your Name</label>
				<input
					placeholder="Enter Your Name"
					class="border-b border-primary-600 dark:border-primary-200 py-3 text-lg bg-white dark:bg-primary-500 focus:outline-none w-full text-primary-900 dark:text-white placeholder:text-primary-500 dark:placeholder:text-primary-200"
					id="name"
					name="name"
					bind:value={formData.name}
				/>
				{#if submitted && errors.name}
					<div class="text-red-500 dark:text-red-300 mt-2">{errors.name}</div>
				{/if}
			</div>
			<div class="">
				<label class="text-sm text-primary-500 dark:text-primary-200" for="email"
					>Email Address</label
				>
				<input
					type="email"
					placeholder="Enter Your Email Address"
					class="border-b border-primary-600 dark:border-primary-200 py-3 text-lg bg-white dark:bg-primary-500 focus:outline-none w-full text-primary-900 dark:text-white placeholder:text-primary-500 dark:placeholder:text-primary-200"
					id="email"
					name="email"
					bind:value={formData.email}
				/>
				{#if submitted && errors.email}
					<div class="text-red-500 dark:text-red-300 mt-2">{errors.email}</div>
				{/if}
			</div>
			<div class="md:col-span-2">
				<label class="text-sm text-primary-500 dark:text-primary-200" for="message">Message</label>
				<textarea
					placeholder="Hi Ayomide, I think we need to discuss about a project I have in mind. When can we hop on to discuss it?"
					name="message"
					id="message"
					cols="30"
					class="border-b border-primary-600 dark:border-primary-200 py-3 text-lg bg-white dark:bg-primary-500 focus:outline-none w-full resize-none text-primary-900 dark:text-white placeholder:text-primary-500 dark:placeholder:text-primary-200"
					bind:value={formData.message}></textarea>
				{#if submitted && errors.message}
					<div class="text-red-500 dark:text-red-300 mt-2">{errors.message}</div>
				{/if}
			</div>
			<div class="md:col-span-2 flex justify-center items-center">
				<button
					class="border-2 rounded-full px-20 py-3 border-primary-500 dark:border-white text-lg font-medium text-primary-500 hover:text-dark-theme hover:border-dark-theme transition-all duration-400 ease-in-out dark:text-gray-200 dark:hover:text-warning-500 dark:hover:border-warning-500 disabled:opacity-50 flex gap-3 items-center disabled:hover:border-primary-500 disabled:dark:hover:border-white disabled:hover:text-primary-500 disabled:dark:hover:text-white"
					type="submit"
					disabled={isSubmitLoading}
				>
					<span>{isSubmitLoading ? 'Sending...' : 'Get Started'}</span>

					{#if isSubmitLoading}
						<div class="animate-spin">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="1em"
								viewBox="0 0 512 512"
								stroke="currentColor"
								><path
									d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z"
								/></svg
							>
						</div>
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>
