/**
 * JSON-LD builders.
 *
 * Pure functions returning plain objects, kept out of the component so they can
 * be unit tested — a malformed graph is invisible in the browser and only shows
 * up weeks later as a Search Console warning.
 *
 * Everything lives in one `@graph` per page with stable `@id` anchors, so the
 * nodes reference each other instead of repeating themselves. A crawler that
 * sees `WebPage -> isPartOf -> #website -> publisher -> #person` reads one
 * person and their body of work; a page of disconnected nodes does not.
 */
import type { SchemaGraph, SchemaNode, SchemaRef } from '../types/schema';
import type { CaseStudy } from '../types/case-study';
import type { ResumeEducation, ResumeRole } from '../types/resume';
import {
	DEFAULT_DESCRIPTION,
	JOB_TITLE,
	KNOWS_ABOUT,
	LOCATION,
	OG_IMAGE_HEIGHT,
	OG_IMAGE_WIDTH,
	PROFILE_IMAGE,
	PROFILE_IMAGE_SIZE,
	SITE_NAME,
	SITE_URL,
	SOCIAL_PROFILES,
	absoluteUrl
} from '../data/site';

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const personRef: SchemaRef = { '@id': PERSON_ID };
const websiteRef: SchemaRef = { '@id': WEBSITE_ID };

/** `#webpage` anchor for a route, hung off its canonical URL. */
const webPageId = (path: string) => `${absoluteUrl(path)}#webpage`;

/**
 * Drops keys whose value is undefined or an empty array. Schema.org treats an
 * absent property and a null one very differently, and `JSON.stringify` happily
 * emits `"endDate": null` for a role that is simply current.
 */
const compact = (node: Record<string, unknown>): SchemaNode => {
	const out: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(node)) {
		if (value === undefined || value === null) continue;
		if (Array.isArray(value) && value.length === 0) continue;
		out[key] = value;
	}
	return out as SchemaNode;
};

/**
 * Schema.org's Role pattern: to attach a start and end date to a property, the
 * value is wrapped in a Role rather than the dates being hung off the
 * Organization, which would claim the company itself started in 2023.
 *
 * `YYYY-MM` as stored is already valid ISO 8601, so no conversion is needed.
 */
const employmentNode = (role: ResumeRole): SchemaNode =>
	compact({
		'@type': 'OrganizationRole',
		roleName: role.role,
		startDate: role.start,
		endDate: role.end ?? undefined,
		worksFor: compact({
			'@type': 'Organization',
			name: role.company,
			url: role.link
		})
	});

const educationNode = (entry: ResumeEducation): SchemaNode => ({
	'@type': 'EducationalOrganization',
	name: entry.institution
});

/**
 * The Person. Emitted in full on `/` and `/resume`, referenced by `@id`
 * everywhere else.
 *
 * Both rather than only `/`: Google resolves an `@id` reference reliably within
 * a document and inconsistently across documents, so a ProfilePage on /resume
 * whose mainEntity points at a node defined only on / risks dangling. The
 * identical `@id` means it is still one entity, so repeating it costs nothing.
 *
 * No `email`. The contact form is the intended path, and an address in JSON-LD
 * is a scrape target rather than a ranking signal.
 */
export const personNode = (
	roles: ResumeRole[] = [],
	education: ResumeEducation[] = []
): SchemaNode =>
	compact({
		'@type': 'Person',
		'@id': PERSON_ID,
		name: SITE_NAME,
		url: SITE_URL,
		jobTitle: JOB_TITLE,
		description: DEFAULT_DESCRIPTION,
		image: compact({
			'@type': 'ImageObject',
			url: PROFILE_IMAGE,
			width: PROFILE_IMAGE_SIZE,
			height: PROFILE_IMAGE_SIZE
		}),
		address: {
			'@type': 'PostalAddress',
			addressLocality: LOCATION.locality,
			addressCountry: LOCATION.country
		},
		knowsAbout: KNOWS_ABOUT,
		knowsLanguage: ['en'],
		nationality: { '@type': 'Country', name: 'Nigeria' },
		hasOccupation: compact({
			'@type': 'Occupation',
			name: JOB_TITLE,
			skills: KNOWS_ABOUT.join(', ')
		}),
		// Every role, current and past, as a dated OrganizationRole. Past employers
		// were briefly in `alumniOf`, which is wrong: in Schema.org that property
		// means an educational institution, and it is used for exactly that below.
		worksFor: roles.map(employmentNode),
		alumniOf: education.map(educationNode),
		sameAs: SOCIAL_PROFILES
	});

/**
 * No `SearchAction`. There is no site search, and declaring a search endpoint
 * that 404s is worse than omitting the property.
 */
export const webSiteNode = (): SchemaNode => ({
	'@type': 'WebSite',
	'@id': WEBSITE_ID,
	url: SITE_URL,
	name: SITE_NAME,
	description: DEFAULT_DESCRIPTION,
	inLanguage: 'en',
	publisher: personRef
});

interface PageOptions {
	path: string;
	title: string;
	description: string;
	image?: string;
	/** ProfilePage for pages that represent the person; WebPage otherwise. */
	isProfile?: boolean;
	dateModified?: string;
}

export const webPageNode = ({
	path,
	title,
	description,
	image,
	isProfile = false,
	dateModified
}: PageOptions): SchemaNode =>
	compact({
		'@type': isProfile ? 'ProfilePage' : 'WebPage',
		'@id': webPageId(path),
		url: absoluteUrl(path),
		name: title,
		description,
		isPartOf: websiteRef,
		about: personRef,
		// mainEntity only where the page genuinely is about the person. On
		// /projects it would claim the list page is a biography.
		mainEntity: isProfile ? personRef : undefined,
		primaryImageOfPage: image
			? compact({
					'@type': 'ImageObject',
					url: image,
					width: OG_IMAGE_WIDTH,
					height: OG_IMAGE_HEIGHT
				})
			: undefined,
		dateModified,
		inLanguage: 'en'
	});

export interface Crumb {
	name: string;
	path: string;
}

export const breadcrumbNode = (crumbs: Crumb[]): SchemaNode => ({
	'@type': 'BreadcrumbList',
	'@id': `${absoluteUrl(crumbs[crumbs.length - 1].path)}#breadcrumb`,
	itemListElement: crumbs.map((crumb, index) => ({
		'@type': 'ListItem',
		position: index + 1,
		name: crumb.name,
		item: absoluteUrl(crumb.path)
	}))
});

/**
 * A case study describes a thing that was built, so the work itself is the
 * entity and the study is the page about it. `SoftwareApplication` where the
 * study has a live URL to install or use, `CreativeWork` otherwise — claiming
 * SoftwareApplication for something with no application URL earns a warning.
 */
export const caseStudyNode = (study: CaseStudy): SchemaNode => {
	const url = absoluteUrl(`/projects/${study.slug}`);
	const isApp = Boolean(study.link);
	return compact({
		'@type': isApp ? 'SoftwareApplication' : 'CreativeWork',
		'@id': `${url}#work`,
		name: study.title,
		headline: study.title,
		description: study.metadescription || study.tagline,
		abstract: study.tagline,
		url,
		image: absoluteUrl(study.img),
		author: personRef,
		creator: personRef,
		keywords: study.stacks.join(', '),
		applicationCategory: isApp ? 'WebApplication' : undefined,
		operatingSystem: isApp ? 'Web' : undefined,
		codeRepository: study.github,
		dateModified: study.updated,
		isPartOf: websiteRef,
		mainEntityOfPage: { '@id': `${url}#webpage` }
	});
};

export const itemListNode = (path: string, studies: CaseStudy[]): SchemaNode => ({
	'@type': 'ItemList',
	'@id': `${absoluteUrl(path)}#list`,
	numberOfItems: studies.length,
	itemListOrder: 'https://schema.org/ItemListOrderAscending',
	itemListElement: studies.map((study, index) => ({
		'@type': 'ListItem',
		position: index + 1,
		url: absoluteUrl(`/projects/${study.slug}`),
		name: study.title
	}))
});

/** Wraps nodes in the single `@context` + `@graph` envelope a page emits. */
export const graph = (nodes: (SchemaNode | undefined)[]): SchemaGraph => ({
	'@context': 'https://schema.org',
	'@graph': nodes.filter((node): node is SchemaNode => node !== undefined)
});
