import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import mdsvex from './mdsvex.config.js';

function onWarn(warning, handler) {
	const IGNORED_WARNS = ['a11y-no-noninteractive-tabindex'];
	if (IGNORED_WARNS.includes(warning.code)) return;
	handler(warning);

	// console.log(warning.code);
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		mdsvex,
		vitePreprocess(),
		preprocess({
			scss: { sourceMap: true },
			sourceMap: true
		})
	],

	kit: {
		adapter: adapter(),
		files: {
			assets: 'assets'
		}
	},

	extensions: ['.svelte', '.md'],

	onwarn: onWarn
};

export default config;
