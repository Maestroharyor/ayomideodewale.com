<script lang="ts">
	import { openToast } from '../ui/toast-state.svelte';

	const NAME_MIN = 5;
	const MESSAGE_MIN = 10;
	const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// Called once the request settles, success or failure. The modal passes
	// modal.close here; the /contact page passes nothing and stays put.
	let { onSettled }: { onSettled?: () => void } = $props();

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

			// The modal unmounts this on close, but the /contact page does not, so
			// the reset has to happen here rather than relying on a fresh mount.
			formData = { name: '', email: '', message: '' };
			submitted = false;

			onSettled?.();
			openToast({
				message: body.message || 'Message sent successfully',
				type: 'success'
			});
		} catch (error) {
			onSettled?.();
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

<form
	class="grid grid-cols-1 gap-5 md:grid-cols-2"
	onsubmit={(e) => {
		e.preventDefault();
		handleSubmit();
	}}
>
	<div>
		<label class="mb-2 block text-sm font-medium text-primary-900 dark:text-gray-200" for="name"
			>Your name</label
		>
		<input
			placeholder="Ada Lovelace"
			class="w-full rounded-xl border border-gray-300 bg-white/60 px-4 py-3 text-base text-primary-900 transition duration-200 outline-none placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 dark:border-primary-600 dark:bg-primary-900/40 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-warning-500 dark:focus:ring-warning-500/25"
			id="name"
			name="name"
			autocomplete="name"
			aria-invalid={submitted && !!errors.name}
			aria-describedby={submitted && errors.name ? 'name-error' : undefined}
			bind:value={formData.name}
		/>
		{#if submitted && errors.name}
			<p id="name-error" class="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
		{/if}
	</div>

	<div>
		<label class="mb-2 block text-sm font-medium text-primary-900 dark:text-gray-200" for="email"
			>Email address</label
		>
		<input
			type="email"
			placeholder="you@company.com"
			class="w-full rounded-xl border border-gray-300 bg-white/60 px-4 py-3 text-base text-primary-900 transition duration-200 outline-none placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 dark:border-primary-600 dark:bg-primary-900/40 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-warning-500 dark:focus:ring-warning-500/25"
			id="email"
			name="email"
			autocomplete="email"
			aria-invalid={submitted && !!errors.email}
			aria-describedby={submitted && errors.email ? 'email-error' : undefined}
			bind:value={formData.email}
		/>
		{#if submitted && errors.email}
			<p id="email-error" class="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
		{/if}
	</div>

	<div class="md:col-span-2">
		<label class="mb-2 block text-sm font-medium text-primary-900 dark:text-gray-200" for="message"
			>Message</label
		>
		<textarea
			placeholder="A little about the role or the project, and what you need."
			name="message"
			id="message"
			rows="6"
			class="w-full rounded-xl border border-gray-300 bg-white/60 px-4 py-3 text-base text-primary-900 transition duration-200 outline-none placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 dark:border-primary-600 dark:bg-primary-900/40 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-warning-500 dark:focus:ring-warning-500/25 resize-y"
			aria-invalid={submitted && !!errors.message}
			aria-describedby={submitted && errors.message ? 'message-error' : undefined}
			bind:value={formData.message}></textarea>
		{#if submitted && errors.message}
			<p id="message-error" class="mt-2 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
		{/if}
	</div>

	<div class="md:col-span-2">
		<button
			class="flex w-full items-center justify-center gap-3 rounded-xl bg-primary-500 px-6 py-3.5 text-base font-semibold text-white transition duration-300 hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-warning-500 dark:text-primary-900 dark:hover:bg-warning-hov"
			type="submit"
			disabled={isSubmitLoading}
		>
			<span>{isSubmitLoading ? 'Sending…' : 'Send message'}</span>

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
		<p class="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
			I read everything and usually reply within a day or two.
		</p>
	</div>
</form>
