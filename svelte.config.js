import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import mdsvex from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		preprocess({
			scss: { sourceMap: true },
			sourceMap: true
		}),
		mdsvex
	],

	kit: {
		adapter: adapter(),
		files: {
			assets: 'assets'
		}
	},

	extensions: ['.svelte', '.md']
};

export default config;
