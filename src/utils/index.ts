/**
 * URL-safe slug for a project tag. Tags are authored for display ('React
 * Native', 'SvelteKit'), so lowercasing alone left a literal space in
 * /projects/tag/react native and split 'Sveltekit' from 'SvelteKit'.
 */
export function tagSlug(tag: string): string {
	return tag
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

export function capitalizeString(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toJSONString(data: object | unknown[] | string | number): string {
	return JSON.stringify(data);
}

/** Escapes user input before it is interpolated into the confirmation email HTML. */
export function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}
