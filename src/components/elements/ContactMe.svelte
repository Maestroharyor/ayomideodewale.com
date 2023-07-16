<script lang="ts">
	// your script goes here
	import {
		useForm,
		Hint,
		HintGroup,
		validators,
		minLength,
		email,
		required
	} from 'svelte-use-form';
	import { modalStore, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { openToast } from '../../utils';

	const form = useForm();

	let formData = {
		name: '',
		email: '',
		message: ''
	}; //we store the form values here

	const closeModal = () => {
		modalStore.clear();
	};

	let isSubmitLoading = false;

	const handleSubmit = async (event: SubmitEvent) => {
		$form.touched = true;
		console.log(formData);
		console.log($form.valid);
		if ($form.valid) {
			isSubmitLoading = true;

			try {
				const response: any = await fetch('/api/contact', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formData)
				});

				isSubmitLoading = false;
				closeModal();

				openToast({
					message: response.message || 'Message sent successfully',
					type: 'success'
				});
			} catch (error: any) {
				// Handle error

				closeModal();
				openToast({
					message: error.message || 'An error occured while sending the message',
					type: 'error'
				});
				isSubmitLoading = false;
			}
		} else {
			console.log(formData);
		}
	};
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
			use:form
		>
			<div class="">
				<label class="text-sm text-primary-500 dark:text-primary-300" for="name">Your Name</label>
				<input
					placeholder="Enter Your Name"
					class="border-b border-primary-600 dark:border-primary-200 py-3 text-lg bg-white dark:bg-primary-500 focus:outline-none w-full placeholder:text-primary-600 placeholder:dark:text-primary-200"
					id="name"
					name="name"
					bind:value={formData.name}
					use:validators={[required, minLength(5)]}
				/>
				<HintGroup for="name">
					<div class="text-red-500 dark:text-300 mt-2">
						<Hint on="required">Name is required</Hint>
						<Hint on="minLength" hideWhenRequired let:value>
							Name requires at least {value} characters.</Hint
						>
					</div>
				</HintGroup>
			</div>
			<div class="">
				<label class="text-sm text-primary-500 dark:text-primary-300" for="email"
					>Email Address</label
				>
				<input
					type="email"
					placeholder="Enter Your Email Address"
					class="border-b border-primary-600 dark:border-primary-200 py-3 text-lg bg-white dark:bg-primary-500 focus:outline-none w-full placeholder:text-primary-600 placeholder:dark:text-primary-200"
					id="email"
					name="email"
					use:validators={[required, email]}
					bind:value={formData.email}
				/>
				<HintGroup for="email">
					<div class="text-red-500 dark:text-red-300 mt-2">
						<Hint on="required">Email is required</Hint>
						<Hint on="email" hideWhenRequired>Email is not valid</Hint>
					</div>
				</HintGroup>
			</div>
			<div class="md:col-span-2">
				<label class="text-sm text-primary-500 dark:text-primary-300" for="message">Message</label>
				<textarea
					placeholder="Hi Ayomide, I think we need to discuss about a project I have in mind. When can we hop on to discuss it?"
					name="message"
					id="message"
					cols="30"
					class="border-b border-primary-600 dark:border-primary-200 py-3 text-lg bg-white dark:bg-primary-500 focus:outline-none w-full resize-none placeholder:text-primary-600 placeholder:dark:text-primary-200"
					bind:value={formData.message}
					use:validators={[required, minLength(10)]}
				/>
				<HintGroup for="message">
					<div class="text-red-500 dark:text-red-300 mt-2">
						<Hint on="required">Message is required</Hint>
						<Hint on="minLength" hideWhenRequired let:value>
							Message requires at least {value} characters.</Hint
						>
					</div>
				</HintGroup>
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
