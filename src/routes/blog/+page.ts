import type { PageLoad } from './$types';
import type ArticleMetadata from '$lib/types/ArticleMetadata';
import type ArticleTagWithCount from '$lib/types/ArticleTagWithCount';
import type ArticleThumbnailImgFmts from '$lib/types/ArticleThumbnailImgFmts';

export const load: PageLoad = async ({
	url,
	fetch
}): Promise<{
	articles: ArticleMetadata[];
	tags: string[];
	allTags: ArticleTagWithCount[];
	thumbnailImgFmts: ArticleThumbnailImgFmts;
}> => {
	const articles = await (await fetch('/api/articles?indexed=true&' + url.searchParams)).json();
	const tags = url.searchParams.get('t')?.split(',') ?? [];
	const allTags = await (await fetch('/api/articles/tags')).json();
	const thumbnailImgFmts = await (await fetch('/api/articles/thumbnail-imgs')).json();
	return { articles, tags, allTags, thumbnailImgFmts };
};
