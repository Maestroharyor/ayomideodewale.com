import type { Action } from 'svelte/action';

/**
 * Fades an element in the first time it scrolls into view.
 *
 *   <section use:reveal>…</section>
 *   <div use:reveal={{ delay: 120 }}>…</div>
 *
 * An action rather than a library: the whole behaviour is one observer and one
 * attribute, and a dependency for that would be more code than this file.
 *
 * The hidden and shown states live in app.css keyed off `data-reveal`, not in
 * inline styles here. That is what lets `@media print` override them in one
 * rule — otherwise anything below the fold prints blank, because it has never
 * been scrolled into view and is still at `opacity: 0`.
 *
 * Two more things it has to avoid doing harm with:
 *
 *  - **Nothing is hidden until this runs.** The attribute is set in script, so if
 *    the action never executes — no JS, an older browser, a crawler — the content
 *    is simply visible rather than permanently transparent.
 *  - **prefers-reduced-motion opts out entirely**, matching the guard in app.css,
 *    and it unobserves after firing so nothing re-animates on every scroll past.
 */
type Options = { delay?: number };

export const reveal: Action<HTMLElement, Options | undefined> = (node, options) => {
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduced || typeof IntersectionObserver === 'undefined') return;

	const delay = options?.delay ?? 0;
	if (delay) node.style.transitionDelay = `${delay}ms`;

	node.dataset.reveal = 'pending';

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				node.dataset.reveal = 'in';
				observer.unobserve(node);
			}
		},
		// A little way in, so something entering at the very bottom edge does not
		// animate while it is still a sliver.
		{ rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
