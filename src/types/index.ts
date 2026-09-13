export * from './resume';

type SubmenuMenus = {
	title: string;
	link: string;
	external?: boolean;
};

export interface Menus {
	title: string;
	link: string;
	hasSubmenu: boolean;
	external?: boolean;
	submenus?: SubmenuMenus[];
	isHomeLink?: boolean;
}

export interface Skill {
	skill: string;
	src: string;
}

export interface Project {
	id: number;
	title: string;
	desc: string;
	img: string;
	inDevelopment?: boolean;
	featured?: boolean;
	link?: string;
	github?: string;
	/** Slug of a write-up in case-studies.ts. The card links here in preference
	 *  to the live site, because the write-up is the stronger evidence. */
	caseStudy?: string;
	tags: string[];
}

export interface Testimonial {
	quote: string;
	name: string;
	job: string;
}

export interface Design {
	label: string;
	image: string;
	link?: string;
	desc?: string;
}

export interface Experience {
	year: string;
	role: string;
	/** Company name alone. Location is a separate field so the timeline can
	 *  render them on one line without the heading wrapping badly. */
	company: string;
	location: string;
	isCurrent: boolean;
	description: string;
	stacks: string[];
	link?: string;
}

/** One line summarising roles too old to warrant their own timeline entry. */
export interface EarlierExperience {
	company: string;
	year: string;
}

export interface ContactErrorResponse {
	name?: string;
	email?: string;
	message?: string;
}
