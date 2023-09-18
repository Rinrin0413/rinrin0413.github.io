import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import shiki from 'shiki';
import { escapeSvelte}  from 'mdsvex';

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
		mdsvex({
			extensions: ['.md'],
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
			highlight: { highlighter }
		})
	],

	kit: {
		adapter: adapter(),
		files: {
			assets: 'assets'
		}
	},

	extensions: ['.svelte', '.md']
};

async function highlighter(code, lang) {
	const theme = await shiki.getHighlighter({ theme: 'dark-plus' });
	return escapeSvelte(theme.codeToHtml(code, {lang}));
}

export default config;
