<script lang="ts">
	import { fly } from 'svelte/transition';
	import { toasts, type ToastType } from './toast-state.svelte';

	// Tailwind's raw defaults sat outside the site's palette, so a toast looked
	// like it came from a different product. success-500 and error-500 are the
	// brand's own; info takes primary, which is the site's voice for neutral.
	const background: Record<ToastType, string> = {
		success: 'bg-success-700 text-white',
		error: 'bg-error-700 text-white',
		info: 'bg-primary-500 text-white'
	};
</script>

<div class="fixed right-4 top-4 z-[200] flex flex-col gap-2" aria-live="polite" aria-atomic="false">
	{#each toasts.items as toast (toast.id)}
		<div
			class="flex max-w-[min(90vw,400px)] items-start gap-3 rounded-lg px-4 py-3 shadow-lg {background[
				toast.type
			]}"
			transition:fly={{ x: 24, duration: 200 }}
			role="alert"
		>
			<span class="flex-1 text-sm">{toast.message}</span>
			<button
				class="shrink-0 opacity-70 transition-opacity hover:opacity-100"
				aria-label="Dismiss notification"
				onclick={() => toasts.dismiss(toast.id)}
			>
				&times;
			</button>
		</div>
	{/each}
</div>
