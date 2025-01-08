import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import mdsvexConf from './mdsvex.config.js';

const CLOUDFLARE_ROUTES_EXCLUDE = [
	// ▼ Build Artifacts ▼
	'<build>',

	// ▼ Static Assets ▼
	// "<files>",
	"/.well-known/*",
	"/favicon.ico",
	"/images/*",
	"/manifest.json",
	"/robots.txt",
	"/scripts/*",

	// ▼ Pre-rendered Pages ▼
	// "<prerendered>",
	"/acknowledgments",
	"/api/articles/tags",
	"/api/articles/thumbnail-imgs",
	"/api/tools/tags",
	"/creations",
	"/feed",
	"/privacy",
	"/profile",
	"/projects",
	"/sitemap.xml",
	"/social"
	// "/tools/bmi" // DBG
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
	preprocess: [mdsvex(mdsvexConf), vitePreprocess(), preprocess()],

	kit: {
		adapter: adapter({ routes: { exclude: CLOUDFLARE_ROUTES_EXCLUDE } })
	},

	extensions: ['.svelte', ...mdsvexConf.extensions],

	onwarn: onWarn
};

export default config;
