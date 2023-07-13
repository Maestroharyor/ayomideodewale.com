import { projects } from '../../../../data/projects';
import { capitalizeString } from '../../../../utils';
import type { PageLoad } from './$types';

export const load = (({ params }) => {
	const { tag } = params;

	const filteredProjects = projects.filter((project) =>
		project.tags.map((tag) => tag.toLowerCase()).includes(tag)
	);

	return {
		projects: filteredProjects,
		title: capitalizeString(tag)
	};
}) satisfies PageLoad;
