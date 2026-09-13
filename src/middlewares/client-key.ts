import type { RequestEvent } from '@sveltejs/kit';
import { UNKNOWN_KEY } from './rate-limit.js';

let warned = false;

/**
 * Rate-limiting key for a request.
 *
 * `getClientAddress()` throws on adapters that cannot resolve an address. Falling
 * back to a shared key would otherwise be invisible, so warn once — a silent
 * collapse of every visitor into one bucket is exactly the kind of outage that is
 * painful to diagnose later.
 */
export function clientKey(event: RequestEvent): string {
	try {
		return event.getClientAddress();
	} catch {
		if (!warned) {
			warned = true;
			console.warn(
				'[rate-limit] getClientAddress() is unavailable on this adapter; ' +
					'all callers share one bucket. Rate limiting is degraded.'
			);
		}
		return UNKNOWN_KEY;
	}
}
