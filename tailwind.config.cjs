import { join } from 'path';
import skeleton from '@skeletonlabs/skeleton/tailwind/skeleton.cjs';

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			colors: {
				'warning-2': '#FCA61F',
				info: '#39C0ED',
				light: '#FBFBFB',
				'primary-hov': '#0c56d0',
				'secondary-hov': '#a316fd',
				'success-hov': '#00913b',
				'danger-hov': '#f80c35',
				'warning-hov': '#d99000',
				'info-hov': '#16b5ea',
				'light-hov': '#e8e8e8',
				dark: '#262626',
				'dark-theme': '#000A1F',
				'white-dark': '#CDCDCD',
				'dark-background': '#181818'
			}
		}
	},
	plugins: [...skeleton()]
};
