import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

export default ts.config(
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	},
	{
		files: ['**/*.svelte'],
		rules: {
			// The site is served from the root, so `base` is always '' and plain
			// absolute hrefs are correct. resolve() would add indirection, not safety.
			'svelte/no-navigation-without-resolve': 'off'
		}
	},
	{
		// '.vercel/' holds minified adapter output from `vercel build`; linting it
		// produced 1382 errors and made this script permanently fail.
		ignores: ['build/', '.svelte-kit/', '.vercel/', 'dist/', 'node_modules/', 'static/']
	}
);
