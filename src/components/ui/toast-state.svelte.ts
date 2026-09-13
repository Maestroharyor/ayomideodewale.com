export type ToastType = 'success' | 'error' | 'info';

export type Toast = {
	id: number;
	message: string;
	type: ToastType;
};

const DISMISS_AFTER_MS = 5000;

let items = $state<Toast[]>([]);
let nextId = 0;

export const toasts = {
	get items() {
		return items;
	},
	dismiss: (id: number) => {
		items = items.filter((t) => t.id !== id);
	},
	push: (message: string, type: ToastType = 'info') => {
		const id = nextId++;
		items = [...items, { id, message, type }];
		setTimeout(() => toasts.dismiss(id), DISMISS_AFTER_MS);
	}
};

/**
 * Convenience wrapper kept for call sites that predate the Skeleton removal.
 *
 * This lives here rather than in `src/utils` because the contact endpoint imports
 * that module, which would drag this client-only state into the server bundle.
 */
export const openToast = ({ message, type }: { message: string; type?: ToastType }) => {
	toasts.push(message, type ?? 'info');
};
