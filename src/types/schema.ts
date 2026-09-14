/**
 * Minimal structural types for the Schema.org JSON-LD this site emits.
 *
 * Deliberately not a full Schema.org type model: the vocabulary is enormous and
 * almost entirely optional, so a complete model would be mostly `?` fields that
 * document nothing. These describe the shapes actually produced by
 * `src/lib/schema.ts`, which is what the tests assert against.
 */

/** Every node carries a stable `@id` so other nodes can reference it. */
export interface SchemaNode {
	'@type': string | string[];
	'@id'?: string;
	[key: string]: unknown;
}

/** A reference to a node defined elsewhere in the same `@graph`. */
export interface SchemaRef {
	'@id': string;
}

export interface SchemaGraph {
	'@context': 'https://schema.org';
	'@graph': SchemaNode[];
}
