import { describe, expect, it } from 'vitest';
import {
	PERSON_ID,
	WEBSITE_ID,
	breadcrumbNode,
	caseStudyNode,
	graph,
	itemListNode,
	personNode,
	webPageNode,
	webSiteNode
} from './schema';
import { caseStudies } from '../data/case-studies';
import { resumeRoles } from '../data/resume/roles';
import { resumeEducation } from '../data/resume/shared';
import { SOCIAL_PROFILES } from '../data/site';
import type { CaseStudy } from '../types/case-study';

/** Every value reachable in the tree, so we can assert on the whole document. */
const walk = (value: unknown): unknown[] => {
	if (Array.isArray(value)) return value.flatMap(walk);
	if (value && typeof value === 'object') return [value, ...Object.values(value).flatMap(walk)];
	return [value];
};

const study = (overrides: Partial<CaseStudy> = {}): CaseStudy => ({
	slug: 'example',
	title: 'Example',
	tagline: 'A tagline.',
	img: '/projects/example.webp',
	stacks: ['TypeScript', 'Go'],
	stats: [],
	sections: [],
	metadescription: 'A description.',
	...overrides
});

describe('personNode', () => {
	it('anchors on the shared @id so other nodes can reference it', () => {
		expect(personNode()['@id']).toBe(PERSON_ID);
	});

	it('carries every social profile as sameAs', () => {
		expect(personNode().sameAs).toEqual(SOCIAL_PROFILES);
	});

	it('omits email, which is a scrape target rather than a ranking signal', () => {
		expect(personNode()).not.toHaveProperty('email');
	});

	it('carries every role as a dated OrganizationRole', () => {
		const roles = personNode(resumeRoles).worksFor as Record<string, unknown>[];
		expect(roles).toHaveLength(resumeRoles.length);
		for (const role of roles) {
			expect(role['@type']).toBe('OrganizationRole');
			expect(role.startDate).toBeTruthy();
		}
	});

	it('leaves endDate off a current role rather than emitting null', () => {
		const roles = personNode(resumeRoles).worksFor as Record<string, unknown>[];
		const current = roles.filter((role) => !('endDate' in role));
		expect(current).toHaveLength(resumeRoles.filter((role) => role.end === null).length);
	});

	it('uses alumniOf for education, not for past employers', () => {
		const node = personNode(resumeRoles, resumeEducation);
		const alumni = node.alumniOf as Record<string, unknown>[];
		expect(alumni).toHaveLength(resumeEducation.length);
		expect(alumni[0]['@type']).toBe('EducationalOrganization');
		// The bug this guards: past employers were landing here, which in
		// Schema.org asserts he studied at them.
		const companies = resumeRoles.map((role) => role.company);
		for (const entry of alumni) {
			expect(companies).not.toContain(entry.name);
		}
	});

	it('drops worksFor and alumniOf entirely when there is nothing to say', () => {
		expect(personNode([])).not.toHaveProperty('worksFor');
		expect(personNode([])).not.toHaveProperty('alumniOf');
	});
});

describe('webPageNode', () => {
	it('links the page to the website and the person', () => {
		const node = webPageNode({ path: '/projects', title: 'Projects', description: 'd' });
		expect(node.isPartOf).toEqual({ '@id': WEBSITE_ID });
		expect(node.about).toEqual({ '@id': PERSON_ID });
	});

	it('is a ProfilePage with a mainEntity only when the page is about the person', () => {
		const profile = webPageNode({ path: '/', title: 'Home', description: 'd', isProfile: true });
		expect(profile['@type']).toBe('ProfilePage');
		expect(profile.mainEntity).toEqual({ '@id': PERSON_ID });

		const list = webPageNode({ path: '/projects', title: 'Projects', description: 'd' });
		expect(list['@type']).toBe('WebPage');
		expect(list).not.toHaveProperty('mainEntity');
	});
});

describe('caseStudyNode', () => {
	it('is a SoftwareApplication only when there is a live URL to use', () => {
		expect(caseStudyNode(study({ link: 'https://example.com' }))['@type']).toBe(
			'SoftwareApplication'
		);
		expect(caseStudyNode(study())['@type']).toBe('CreativeWork');
	});

	it('does not claim applicationCategory for a plain CreativeWork', () => {
		expect(caseStudyNode(study())).not.toHaveProperty('applicationCategory');
	});

	it('attributes the work to the person by reference', () => {
		expect(caseStudyNode(study()).author).toEqual({ '@id': PERSON_ID });
	});

	it('omits dateModified when the study has no recorded date', () => {
		expect(caseStudyNode(study())).not.toHaveProperty('dateModified');
		expect(caseStudyNode(study({ updated: '2026-01-02' })).dateModified).toBe('2026-01-02');
	});
});

describe('breadcrumbNode', () => {
	it('numbers positions from one and resolves absolute items', () => {
		const node = breadcrumbNode([
			{ name: 'Home', path: '/' },
			{ name: 'Projects', path: '/projects' }
		]);
		const items = node.itemListElement as Record<string, unknown>[];
		expect(items.map((item) => item.position)).toEqual([1, 2]);
		expect(items[1].item).toBe('https://www.ayomideodewale.com/projects');
	});
});

describe('graph', () => {
	it('drops undefined nodes rather than emitting holes', () => {
		expect(graph([webSiteNode(), undefined])['@graph']).toHaveLength(1);
	});

	it('never serialises a null or undefined anywhere in a real page graph', () => {
		const document = graph([
			personNode(resumeRoles, resumeEducation),
			webSiteNode(),
			webPageNode({ path: '/projects', title: 'Projects', description: 'd' }),
			itemListNode('/projects', caseStudies),
			...caseStudies.map(caseStudyNode)
		]);
		expect(JSON.stringify(document)).not.toContain('null');
		for (const value of walk(document)) {
			expect(value).not.toBeUndefined();
		}
	});

	it('gives every node in a real page graph a @type', () => {
		const document = graph([
			personNode(resumeRoles, resumeEducation),
			webSiteNode(),
			...caseStudies.map(caseStudyNode)
		]);
		for (const node of document['@graph']) {
			expect(node['@type']).toBeTruthy();
		}
	});

	it('survives a case study containing a closing script tag', () => {
		// The failure this guards: JSON.stringify does not escape `<`, and the graph
		// now carries every study's title, tagline and description. A `</script` in
		// any of that prose would close the element early and spill the rest of the
		// graph into the page body. SEOMeta escapes `<` before injecting.
		const hostile = study({ tagline: 'Closes the tag: </script><img src=x>' });
		const serialised = JSON.stringify(graph([caseStudyNode(hostile)])).replace(/</g, '\\u003c');
		expect(serialised).not.toContain('</script');
		expect(serialised).not.toContain('<');
		expect(JSON.parse(serialised.replace(/\\u003c/g, '<'))).toBeTruthy();
	});

	it('produces a unique @id per node so nothing silently overwrites', () => {
		const ids = graph([
			personNode(resumeRoles, resumeEducation),
			webSiteNode(),
			...caseStudies.map(caseStudyNode)
		])['@graph'].map((node) => node['@id']);
		expect(new Set(ids).size).toBe(ids.length);
	});
});
