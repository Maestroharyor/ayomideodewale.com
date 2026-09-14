export interface CaseStudySection {
	heading: string;
	/** Paragraphs of body copy. Empty means the section is still unwritten. */
	body: string[];
	/**
	 * Facts only the author can supply. Rendered as a visible warning in dev and
	 * omitted entirely in production, so a half-filled study never ships looking
	 * half-filled.
	 */
	todo?: string[];
}

export interface CaseStudyStat {
	label: string;
	value: string;
}

export interface CaseStudy {
	slug: string;
	title: string;
	tagline: string;
	/** Matches the `img` of the corresponding entry in projects.ts. */
	img: string;
	link?: string;
	github?: string;
	stacks: string[];
	/** Headline numbers. Only include figures that are publicly checkable. */
	stats: CaseStudyStat[];
	sections: CaseStudySection[];
	metadescription: string;
	/**
	 * ISO date the study was last meaningfully revised, for `dateModified` in
	 * structured data and `<lastmod>` in the sitemap. Optional and hand-set: a
	 * date derived from the build would claim every study changed on every
	 * deploy, which is a signal crawlers learn to discount. Studies without one
	 * simply omit the property.
	 */
	updated?: string;
}
