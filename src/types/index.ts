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
}

export interface Experience {
	year: string;
	role: string;
	company: string;
	isCurrent: boolean;
	description: string;
	stacks: string[];
	link?: string;
}

// Redux state interfaces
export interface ThemeData {
	lightMode: boolean;
}

export interface ModalData {
	opened: boolean;
}
