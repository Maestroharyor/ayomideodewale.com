import { describe, expect, it } from 'vitest';
import { caseStudies } from './case-studies';

/**
 * Google truncates a result description near 155 characters. Thirteen of these
 * had drifted between 156 and 199 and were being cut mid-clause, which is
 * invisible locally — the string looks fine in the editor and only fails in a
 * search result nobody is watching. Asserted so the limit cannot drift back.
 */
const SEARCH_LIMIT = 155;

describe('case study metadescriptions', () => {
	it.each(caseStudies.map((study) => [study.slug, study.metadescription] as const))(
		'%s fits a search result',
		(_slug, description) => {
			expect(description.length).toBeLessThanOrEqual(SEARCH_LIMIT);
		}
	);

	it('are all present and non-trivial', () => {
		for (const study of caseStudies) {
			expect(study.metadescription.length).toBeGreaterThan(50);
		}
	});
});
