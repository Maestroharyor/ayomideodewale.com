import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * `/resume` is a shareable alias for the static PDF.
 *
 * A server-side 302 replaces the request rather than adding to the history stack,
 * so Back from the PDF returns to the page the visitor came from. The previous
 * implementation was a page that hid `document.body` and called
 * `window.location.replace()` in `onMount`, which left a blank `/resume` entry
 * behind and re-hid the body whenever the visitor navigated back to it.
 */
export const GET: RequestHandler = () => redirect(302, '/resume.pdf');
