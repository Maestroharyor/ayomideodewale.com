import { caseStudies } from '../../data/case-studies';
import { designs } from '../../data/designs';
import { experiences } from '../../data/experience';
import {
	DEFAULT_DESCRIPTION,
	JOB_TITLE,
	KNOWS_ABOUT,
	SITE_NAME,
	SITE_URL,
	SOCIAL_PROFILES
} from '../../data/site';
import type { RequestHandler } from './$types';

export const prerender = true;

/**
 * llms.txt is a proposal, not a standard, and no major AI vendor has confirmed
 * they read it. It is here because it is generated from the same data as the
 * site — so it cannot drift — and costs nothing. The load-bearing work for AI
 * visibility is the prerendered HTML and the JSON-LD graph, not this file.
 */
export const GET: RequestHandler = () => {
	const url = (path: string) => `${SITE_URL}${path}`;

	const body = `# ${SITE_NAME}

> ${DEFAULT_DESCRIPTION}

${SITE_NAME} is a ${JOB_TITLE.toLowerCase()} based in Lagos, Nigeria, working remotely.
This site is a portfolio: written case studies of shipped work, a resume, and
interface design work. Everything on it is first-hand; the case studies describe
projects he built or led.

## Pages

- [Home](${url('/')}): Introduction, experience timeline, featured projects and skills.
- [Projects](${url('/projects')}): Every project, each linking to a written case study.
- [Cloud & Platform](${url('/cloud')}): Infrastructure and platform work — AWS, Terraform, Docker, CI, self-hosted monitoring in Go.
- [Designs](${url('/designs')}): UI design work, ${designs.length} interface concepts and product screens.
- [Resume](${url('/resume')}): Full work history, also available as a PDF.
- [Contact](${url('/contact')}): Contact form.

## Case studies

${caseStudies
	.map((study) => `- [${study.title}](${url(`/projects/${study.slug}`)}): ${study.tagline}`)
	.join('\n')}

## Experience

${experiences
	.map((role) => `- ${role.role}, ${role.company} (${role.year}): ${role.description}`)
	.join('\n')}

## Technologies

${KNOWS_ABOUT.join(', ')}

## Elsewhere

${SOCIAL_PROFILES.map((profile) => `- ${profile}`).join('\n')}
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
};
