import type { Handle } from '@sveltejs/kit';
import { createRateLimiter } from './middlewares/rate-limit.js';
import { clientKey } from './middlewares/client-key.js';

/**
 * Outer flood guard for `/api/contact`.
 *
 * Deliberately generous and applied before the body is parsed: it exists to stop
 * raw request flooding, including malformed payloads that never reach validation.
 * The strict per-visitor allowance lives in the endpoint itself and is only
 * charged for submissions that actually attempt to send mail.
 */
const floodLimiter = createRateLimiter({ max: 30, windowMs: 60 * 60 * 1000 });

export const handle: Handle = async ({ event, resolve }) => {
	// Tolerate a trailing slash rather than depending on SvelteKit's normalisation
	// setting to keep this guard reachable.
	const path = event.url.pathname.replace(/\/+$/, '');

	if (path === '/api/contact' && event.request.method === 'POST') {
		if (!floodLimiter.consume(clientKey(event))) {
			return new Response(
				JSON.stringify({ success: false, message: 'Too many requests. Please try again later.' }),
				{ status: 429, headers: { 'content-type': 'application/json' } }
			);
		}
	}

	return resolve(event);
};
