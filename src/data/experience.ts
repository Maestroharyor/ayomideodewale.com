import type { EarlierExperience, Experience } from '../types';
import { formatYearRange } from './resume/dates';
import { resumeRoles } from './resume/roles';

/**
 * Derived from src/data/resume/roles.ts rather than maintained by hand.
 *
 * The website shows a curated subset at year granularity; the resumes show all
 * roles at month level. Both read the same source, so the two surfaces cannot
 * drift apart the way they previously had.
 */
export const experiences: Experience[] = resumeRoles
	.filter((role) => role.site?.show)
	.sort(
		(a, b) =>
			(a.site?.order ?? Number.MAX_SAFE_INTEGER) - (b.site?.order ?? Number.MAX_SAFE_INTEGER) ||
			b.start.localeCompare(a.start)
	)
	.map((role) => ({
		year: formatYearRange(role.start, role.end),
		role: role.role,
		company: role.company,
		location: role.location,
		isCurrent: role.end === null,
		description: role.site?.description ?? role.description,
		stacks: role.site?.stacks ?? role.stacks,
		link: role.link
	}));

/**
 * Roles too old to warrant a timeline entry, summarised in one line beneath it.
 *
 * Without this the visible range starts at 2022, which reads as four years next
 * to the "7+ years" in the bio. One line of plain text closes that gap without
 * adding cards or abandoning the lean layout.
 */
export const earlierExperiences: EarlierExperience[] = resumeRoles
	.filter((role) => role.site?.earlier)
	.sort((a, b) => b.start.localeCompare(a.start))
	.map((role) => ({
		company: role.company,
		year: formatYearRange(role.start, role.end)
	}));
