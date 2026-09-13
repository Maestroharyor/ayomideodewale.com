/**
 * Fixed-window rate limiter, server-only.
 *
 * Imported exclusively from `+server.ts` / `hooks.server.ts`, so its module-level
 * state never reaches the client bundle. On a serverless platform each instance
 * keeps its own window, which bounds abuse per instance rather than globally — a
 * hard guarantee needs a shared store (KV/Redis).
 */

export type RateLimiterOptions = {
	/** Requests permitted per key, per window. */
	max: number;
	windowMs: number;
	/**
	 * Ceiling for the shared bucket used when the client address cannot be
	 * resolved. Deliberately far higher than `max`: that bucket holds every such
	 * caller at once, so reusing `max` would lock out all visitors instead of
	 * throttling abusers.
	 */
	unknownMax?: number;
	/** Hard cap on tracked keys, so a flood of distinct addresses cannot grow the map without bound. */
	maxKeys?: number;
};

export const UNKNOWN_KEY = 'unknown';

export function createRateLimiter({
	max,
	windowMs,
	unknownMax = max * 20,
	maxKeys = 10_000
}: RateLimiterOptions) {
	const hits = new Map<string, number[]>();
	let lastPrune = Date.now();

	/**
	 * Full sweep once per window, rather than only when the map happens to be large.
	 * Rewriting a surviving key in place keeps its position, so LRU order is preserved.
	 */
	function prune(now: number): void {
		for (const [key, times] of hits) {
			const recent = times.filter((t) => now - t < windowMs);
			if (recent.length === 0) hits.delete(key);
			else hits.set(key, recent);
		}
		lastPrune = now;
	}

	return {
		/** Records a hit and reports whether the caller has exceeded its allowance. */
		consume(key: string): boolean {
			const now = Date.now();

			if (now - lastPrune >= windowMs) prune(now);

			// Still oversized after a sweep means genuinely active keys, so evict the
			// least recently used. Map preserves insertion order and every touch
			// re-inserts at the end, which makes the first key the LRU one — an O(1)
			// lookup. Sorting the map here instead cost ~0.89ms per request at the
			// cap versus ~0.0004ms below it, turning the limiter into an amplifier
			// under exactly the load it exists to absorb.
			if (hits.size >= maxKeys) {
				const oldest = hits.keys().next().value;
				if (oldest !== undefined) hits.delete(oldest);
			}

			const limit = key === UNKNOWN_KEY ? unknownMax : max;
			const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

			// delete before set so the key moves to the end of the insertion order.
			hits.delete(key);

			if (recent.length >= limit) {
				hits.set(key, recent);
				return false;
			}

			recent.push(now);
			hits.set(key, recent);
			return true;
		}
	};
}
