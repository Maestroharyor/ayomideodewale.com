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
}
