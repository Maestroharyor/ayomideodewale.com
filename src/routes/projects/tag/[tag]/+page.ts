import { error } from '@sveltejs/kit';
import { projects } from '../../../../data/projects';
import { tagSlug } from '../../../../utils';
import type { EntryGenerator, PageLoad } from './$types';

/**
 * Every tag that actually has projects behind it. Without this the prerenderer
 * cannot know which [tag] values exist, and the route would have to fall back to
 * a serverless function. These pages are noindex, but they are still linked from
 * every project card, so they should be as fast as the rest of the site.
 */
export const entries: EntryGenerator = () => {
	const slugs = new Set(projects.flatMap((project) => project.tags).map(tagSlug));
	return [...slugs].map((tag) => ({ tag }));
};

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
