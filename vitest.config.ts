import { defineConfig } from 'vitest/config';

/**
 * Separate from vite.config.ts on purpose.
 *
 * Putting `test` in the main config means importing `defineConfig` from
 * `vitest/config` there, which makes the production build depend on a
 * devDependency. Vercel can prune those, and the deploy would fail on a config
 * import rather than anything to do with the site. Vitest picks this file up on
 * its own, so the build config stays untouched.
 *
 * No SvelteKit plugin here either: everything under test is plain TypeScript
 * that runs on the server — escaping, validation and classification. None of it
 * imports `$app/*` or touches a component.
 */
export default defineConfig({
	test: {
		environment: 'node',
		include: ['src/**/*.test.ts']
	}
});
