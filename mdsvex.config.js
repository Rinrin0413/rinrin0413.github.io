import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import shiki from 'shiki';
import { escapeSvelte } from 'mdsvex';

export default mdsvex({
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
});

async function highlighter(code, lang) {
	const theme = await shiki.getHighlighter({ theme: 'dracula' });
	return escapeSvelte(theme.codeToHtml(code, { lang }));
}
