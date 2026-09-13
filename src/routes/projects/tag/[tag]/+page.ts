import { error } from '@sveltejs/kit';
import { projects } from '../../../../data/projects';
import { tagSlug } from '../../../../utils';
import type { PageLoad } from './$types';

export const load = (({ params }) => {
	const slug = params.tag;

	const filteredProjects = projects.filter((project) =>
		project.tags.some((tag) => tagSlug(tag) === slug)
	);

	// Previously an unknown tag rendered an empty page with a 200, which is a
	// soft 404: crawlable, indexable and useless.
	if (filteredProjects.length === 0) {
		error(404, 'No projects found for that tag');
	}

	// Display form comes from the data, so casing matches how it is authored
	// ('React Native', not 'React native').
	const title =
		filteredProjects.flatMap((p) => p.tags).find((tag) => tagSlug(tag) === slug) ?? slug;

	return { projects: filteredProjects, title };
}) satisfies PageLoad;
