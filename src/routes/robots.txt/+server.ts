import { SITE_URL } from '../../data/site';
import type { RequestHandler } from './$types';

export const prerender = true;

/**
 * Every AI crawler is allowed, training bots included. For a personal-brand site
 * being in the training data is the point: it is how a model answers "who is
 * Ayomide Odewale" without having to search first.
 *
 * They are named explicitly rather than left to `User-agent: *` so the policy is
 * auditable, and so revoking one later is a one-line change against a list that
 * already exists. Note each block has to repeat `Disallow: /r/`: a named
 * User-agent group fully replaces the wildcard group rather than extending it,
 * which is the easiest way to get this file wrong.
 */
const AI_CRAWLERS = [
	// OpenAI
	'GPTBot',
	'OAI-SearchBot',
	'ChatGPT-User',
	// Anthropic
	'ClaudeBot',
	'Claude-User',
	'Claude-SearchBot',
	// Perplexity
	'PerplexityBot',
	'Perplexity-User',
	// Google, Apple, Meta — these opt into AI use specifically, separately from
	// Googlebot and Applebot, which are covered by the wildcard group.
	'Google-Extended',
	'Applebot-Extended',
	'Meta-ExternalAgent',
	// Everyone else
	'cohere-ai',
	'Amazonbot',
	'Bytespider',
	'CCBot',
	'Diffbot',
	'Timpibot'
];

export const GET: RequestHandler = () => {
	/**
	 * `Disallow: /r/` alone, with no X-Robots-Tag alongside it. Pairing the two
	 * is self-defeating: a disallowed path is never crawled, so a noindex header
	 * on it is never read, and the URL can still surface with no way to suppress
	 * it. Nothing links to these files, so Disallow is the right single control.
	 */
	const group = (agent: string) => `User-agent: ${agent}\nAllow: /\nDisallow: /r/\n`;

	const body = `${group('*')}
${AI_CRAWLERS.map(group).join('\n')}
Sitemap: ${SITE_URL}/sitemap.xml
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain' }
	});
};
