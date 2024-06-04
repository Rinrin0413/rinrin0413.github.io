import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import mdsvex from './mdsvex.config.js';

const CLOUDFLARE_ROUTES_EXCLUDE = [
	// ▼ Build Artifacts ▼
	'<build>',

	// ▼ Static Assets ▼
	// "<files>",
	'/.well-known/*',
	'/favicon.ico',
	'/images/*',
	'/manifest.json',
	'/robots.txt',
	'/scripts/*',
	'/stylesheets/*',

	// ▼ Pre-rendered Pages ▼
	// "<prerendered>",
	'/api/articles/tags',
	'/api/articles/thumbnail-imgs',
	'/creations',
	'/feed',
	'/profile',
	'/projects',
	'/sitemap.xml',
	'/social',
	'/tools'
];

function onWarn(warning, handler) {
	const IGNORED_WARNS = ['a11y-no-noninteractive-tabindex'];
	if (IGNORED_WARNS.includes(warning.code)) return;
	handler(warning);
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
		adapter: adapter({ routes: { exclude: CLOUDFLARE_ROUTES_EXCLUDE } })
	},

	extensions: ['.svelte', '.md'],

	onwarn: onWarn
};

export default config;
