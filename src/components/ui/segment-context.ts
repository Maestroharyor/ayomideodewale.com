import { getContext, setContext } from 'svelte';

export type SegmentContext<T> = {
	readonly name: string;
	readonly value: T | undefined;
	select: (next: T) => void;
};

const KEY = Symbol('segment');

export function setSegmentContext<T>(ctx: SegmentContext<T>) {
	setContext(KEY, ctx);
}

/**
 * Reads the context a parent `<Segment>` set.
 *
 * `T` is asserted, not checked: Svelte context is untyped at runtime, so a
 * `<SegmentItem value={'a'}>` nested in a `<Segment bind:value={someNumber}>`
 * compiles. In practice both infer `T` from the same `value` in one parent
 * component, which is where the safety actually comes from.
 */
export function getSegmentContext<T>(): SegmentContext<T> {
	const ctx = getContext<SegmentContext<T> | undefined>(KEY);
	if (!ctx) throw new Error('<SegmentItem> must be used inside a <Segment>');
	return ctx;
}
