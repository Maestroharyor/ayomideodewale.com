import { buildResume } from '../../data/resume';
import type { PageLoad } from './$types';

export const prerender = true;

/**
 * No client JS on this route. ModeWatcher never mounts so `.dark` can never
 * apply, tsParticles never paints over the page, and SvelteKit omits the
 * hydration payload that would otherwise serialise the whole document into a
 * <script> tag a second time. It is print source, not an app.
 */
export const csr = false;

export const load = (() => ({ doc: buildResume('fullstack') })) satisfies PageLoad;
