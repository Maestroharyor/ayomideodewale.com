<script lang="ts">
	import { userPrefersMode, setMode, resetMode } from 'mode-watcher';

	// mode-watcher does not re-export its `Mode` type from the package root; this is
	// the same union, so `userPrefersMode.current` assigns to it without a cast.
	type Choice = 'system' | 'light' | 'dark';

	const choices: { value: Choice; label: string }[] = [
		{ value: 'system', label: 'System' },
		{ value: 'light', label: 'Light' },
		{ value: 'dark', label: 'Dark' }
	];

	let open = $state(false);
	let root = $state<HTMLDivElement | null>(null);

	// `userPrefersMode` is the three-way preference; `mode` is the resolved
	// light/dark, which is not what should show as the selected option.
	const current = $derived(userPrefersMode.current);
	const currentLabel = $derived(choices.find((c) => c.value === current)?.label ?? 'System');

	const select = (choice: Choice) => {
		if (choice === 'system') resetMode();
		else setMode(choice);
		open = false;
	};

	$effect(() => {
		if (!open) return;

		const onPointerDown = (e: PointerEvent) => {
			if (root && !root.contains(e.target as Node)) open = false;
		};
		const onKeydown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') open = false;
		};

		document.addEventListener('pointerdown', onPointerDown);
		document.addEventListener('keydown', onKeydown);
		return () => {
			document.removeEventListener('pointerdown', onPointerDown);
			document.removeEventListener('keydown', onKeydown);
		};
	});
</script>

{#snippet icon(which: Choice, size: number)}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		{#if which === 'system'}
			<rect x="2" y="3" width="20" height="14" rx="2" />
			<path d="M8 21h8M12 17v4" />
		{:else if which === 'light'}
			<circle cx="12" cy="12" r="4" />
			<path
				d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
			/>
		{:else}
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
		{/if}
	</svg>
{/snippet}

<div class="relative" bind:this={root}>
	<button
		type="button"
		onclick={() => (open = !open)}
		aria-label="Theme: {currentLabel}"
		title="Theme: {currentLabel}"
		aria-haspopup="menu"
		aria-expanded={open}
		class="rounded-full p-2 text-dark transition duration-300 ease-in-out hover:text-primary-500 dark:text-white dark:hover:text-warning-500"
	>
		{@render icon(current, 20)}
	</button>

	{#if open}
		<div
			role="menu"
			aria-label="Theme preference"
			class="absolute right-0 top-full z-[1100] mt-2 min-w-[10rem] overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-primary-600 dark:bg-primary-500"
		>
			{#each choices as choice (choice.value)}
				<button
					type="button"
					role="menuitemradio"
					aria-checked={current === choice.value}
					onclick={() => select(choice.value)}
					class="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-dark transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-primary-600"
				>
					<span class="shrink-0 opacity-80">{@render icon(choice.value, 16)}</span>
					<span class="flex-1">{choice.label}</span>
					{#if current === choice.value}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="shrink-0 text-primary-500 dark:text-warning-500"
							aria-hidden="true"
						>
							<path d="M20 6 9 17l-5-5" />
						</svg>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>
