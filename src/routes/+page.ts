import type { PageLoad } from './$types';
import type { ArticleMetadata, ArticleThumbnailImgFmts } from '$lib/types';

export const load: PageLoad = async ({
	fetch
}): Promise<{
	articles: ArticleMetadata[];
	thumbnailImgFmts: ArticleThumbnailImgFmts;
}> => {
	const articles = await (await fetch('/api/articles?indexed=true&l=4')).json();
	const thumbnailImgFmts = await (await fetch('/api/articles/thumbnail-imgs')).json();
	return { articles, thumbnailImgFmts };
};
