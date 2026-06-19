import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import { codeToHtml } from 'shiki';
import { escapeSvelte } from 'mdsvex';

export default {
	extensions: ['.md'],
	rehypePlugins: [
		rehypeSlug,
		rehypeAutolinkHeadings,
		[
			rehypeExternalLinks,
			{
				target: '_blank',
				rel: ['noopener', 'noreferrer']
			}
		]
	],
	highlight: { highlighter }
};

async function highlighter(code, lang) {
	return escapeSvelte(await codeToHtml(code, { lang, theme: 'rose-pine-moon' }));
}
