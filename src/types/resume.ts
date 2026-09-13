/**
 * `YYYY-MM`. Stored as a string rather than a Date because lexicographic order
 * equals chronological order and there is no timezone to get wrong: parsing
 * '2026-01' as a Date gives UTC midnight, which renders as December 2025 in any
 * negative-offset locale and would ship a wrong start date.
 */
export type YearMonth = `${number}-${'0' | '1'}${number}`;

export type ResumeVariantId = 'fullstack' | 'backend' | 'frontend' | 'mobile' | 'cloud';

/** Per-role overrides for the website's leaner experience grid. */
export interface SiteExperienceOverride {
	/** Include this role in the website's experience section. */
	show: boolean;
	/** Display order in the grid; lower first. */
	order?: number;
	/** Shorter card copy when the resume sentence runs long. */
	description?: string;
	/** Trimmed badge list; the card shows a handful, the resume shows all. */
	stacks?: string[];
	/**
	 * Summarised in a single "Earlier:" line beneath the timeline instead of
	 * getting an entry of its own. Keeps the section lean while still closing
	 * the arithmetic gap between "7+ years" and the visible date range.
	 */
	earlier?: boolean;
}

export interface ResumeRole {
	/** Stable slug. Keyed by variant overrides and by the site derivation. */
	id: string;
	/** Canonical title, matching LinkedIn unless a variant explicitly overrides it. */
	role: string;
	company: string;
	/** Kept separate so the site can recombine it as 'Company (Location)'. */
	location: string;
	link?: string;
	start: YearMonth;
	/** `null` means present. */
	end: YearMonth | null;
	employmentType?: 'full-time' | 'part-time' | 'contract' | 'freelance';
	/** Shown next to the dates, e.g. 'Contract, concurrent'. */
	engagementNote?: string;
	/** One-sentence base description. Reused verbatim by the website card. */
	description: string;
	/** Full technology list. The site card shows `site.stacks` instead when set. */
	stacks: string[];
	/** Bullets used by any variant that does not override. */
	bullets: string[];
	/** Per-variant bullet sets. A variant absent here inherits `bullets`. */
	variantBullets?: Partial<Record<ResumeVariantId, string[]>>;
	/** Per-variant title overrides, for the rare case the emphasis genuinely differs. */
	variantRole?: Partial<Record<ResumeVariantId, string>>;
	/** Absent, or `{ show: false }`, means the role is resume-only. */
	site?: SiteExperienceOverride;
}

export interface ResumeLink {
	label: string;
	href: string;
	/** Shown in print, where the href itself is invisible. */
	display: string;
}

export interface ResumeContact {
	name: string;
	location: string;
	email: string;
	phone: string;
	website: string;
	links: ResumeLink[];
}

export interface ResumeEducation {
	institution: string;
	credential: string;
	year: string;
}

export interface ResumeCertification {
	name: string;
	status: string;
}

export interface ResumeProject {
	name: string;
	/** Resume voice: one line of substance, not the site's marketing copy. */
	summary: string;
	stacks: string[];
	href?: string;
}

export interface ResumeSkillGroup {
	label: string;
	items: string[];
}

export interface ResumeVariant {
	id: ResumeVariantId;
	/** Line under the name. */
	titleLine: string;
	summary: string;
	skills: ResumeSkillGroup[];
	/** Project names, in render order. An empty array hides the section. */
	projectNames: string[];
	/** Role ids in render order. Omitted means all roles, reverse-chronological. */
	roleIds?: string[];
	/** Output stem: static/resume.pdf for the canonical one, static/r/*.pdf otherwise. */
	pdfName: string;
	meta: { title: string; description: string };
	/** Only the canonical variant is reachable as a page and listed in the sitemap. */
	canonical: boolean;
}

/** A role with dates formatted and bullets resolved, ready to render. */
export interface ResumeRoleView {
	id: string;
	role: string;
	company: string;
	location: string;
	link?: string;
	/** 'Oct 2023 – Apr 2026' */
	period: string;
	engagementNote?: string;
	description: string;
	stacks: string[];
	bullets: string[];
}

/** The fully composed document a route hands to <ResumeDocument />. */
export interface ResumeDocument {
	variant: ResumeVariantId;
	titleLine: string;
	summary: string;
	contact: ResumeContact;
	skills: ResumeSkillGroup[];
	roles: ResumeRoleView[];
	projects: ResumeProject[];
	education: ResumeEducation[];
	certifications: ResumeCertification[];
	meta: { title: string; description: string };
	/** Public URL of this variant's PDF, for the download button. */
	pdfHref: string;
	canonical: boolean;
}
