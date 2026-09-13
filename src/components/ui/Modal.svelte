<script lang="ts">
	import type { Snippet } from 'svelte';
	import { modal } from './modal-state.svelte';

	let { children }: { children: Snippet } = $props();

	let dialog = $state<HTMLDialogElement | null>(null);
	let pressedBackdrop = false;

	// showModal()/close() give us focus trapping, Esc and the ::backdrop for free,
	// which Skeleton's <Modal> hand-rolled.
	$effect(() => {
		if (!dialog) return;
		if (modal.isOpen && !dialog.open) dialog.showModal();
		else if (!modal.isOpen && dialog.open) dialog.close();
	});
</script>

<!-- m-auto is load-bearing: Tailwind 4 preflight sets `margin: 0` on `*`, which
	 overrides the UA stylesheet's `dialog:modal { margin: auto }` and would pin the
	 dialog to the top-left of the viewport instead of centring it. -->
<dialog
	bind:this={dialog}
	onclose={() => modal.close()}
	onpointerdown={(e) => {
		// A click only counts as "on the backdrop" when both press and release land
		// on the dialog itself. Tracking both ends means dragging a text selection
		// out of the form, or grabbing the dialog's scrollbar, no longer discards
		// what the visitor typed.
		pressedBackdrop = e.target === dialog;
	}}
	onclick={(e) => {
		if (pressedBackdrop && e.target === dialog) modal.close();
		pressedBackdrop = false;
	}}
	class="m-auto max-h-[90dvh] w-full max-w-[1000px] overflow-y-auto bg-transparent p-4 backdrop:bg-black/60 backdrop:backdrop-blur-sm"
>
	{#if modal.isOpen}
		{@render children()}
	{/if}
</dialog>

<style>
	dialog[open] {
		animation: fade-in 200ms ease-out;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		dialog[open] {
			animation: none;
		}
	}
</style>
