/** Replaces Skeleton's `modalStore`. The old registry only ever held one entry,
 *  so the component is passed as a child rather than looked up by string key. */
let open = $state(false);

export const modal = {
	get isOpen() {
		return open;
	},
	open: () => (open = true),
	close: () => (open = false)
};
