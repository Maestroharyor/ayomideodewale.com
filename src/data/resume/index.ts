import type { ResumeDocument, ResumeRoleView, ResumeVariantId } from '../../types';
import { formatPeriod } from './dates';
import { resumeRoles } from './roles';
import { resumeCertifications, resumeContact, resumeEducation, resumeProjects } from './shared';
import { resumeVariants } from './variants';

export { resumeRoles } from './roles';
export { resumeVariants, resumeVariantIds, canonicalVariant } from './variants';
export { formatMonth, formatPeriod, formatYearRange } from './dates';

/** Newest first. Ties break on end date so concurrent roles stay stable. */
function byRecency(a: (typeof resumeRoles)[number], b: (typeof resumeRoles)[number]) {
	return b.start.localeCompare(a.start);
}

/**
 * Composes one variant into a render-ready document: dates formatted, bullets
 * resolved against the variant, shared blocks injected once.
 */
export function buildResume(id: ResumeVariantId): ResumeDocument {
	const variant = resumeVariants[id];

	const ordered = variant.roleIds
		? variant.roleIds.map((roleId) => {
				const role = resumeRoles.find((r) => r.id === roleId);
				if (!role) throw new Error(`Unknown role id "${roleId}" in variant "${id}"`);
				return role;
			})
		: [...resumeRoles].sort(byRecency);

	const roles: ResumeRoleView[] = ordered.map((role) => ({
		id: role.id,
		role: role.variantRole?.[id] ?? role.role,
		company: role.company,
		location: role.location,
		link: role.link,
		period: formatPeriod(role.start, role.end),
		engagementNote: role.engagementNote,
		description: role.description,
		stacks: role.stacks,
		// The single override point: a variant without its own bullets inherits.
		bullets: role.variantBullets?.[id] ?? role.bullets
	}));

	const projects = variant.projectNames.map((name) => {
		const project = resumeProjects.find((p) => p.name === name);
		if (!project) throw new Error(`Unknown project "${name}" in variant "${id}"`);
		return project;
	});

	return {
		variant: variant.id,
		titleLine: variant.titleLine,
		summary: variant.summary,
		contact: resumeContact,
		skills: variant.skills,
		roles,
		projects,
		education: resumeEducation,
		certifications: resumeCertifications,
		meta: variant.meta,
		pdfHref: variant.canonical ? `/${variant.pdfName}.pdf` : `/r/${variant.pdfName}.pdf`,
		canonical: variant.canonical
	};
}
