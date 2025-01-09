import type { PageLoad } from './$types';
import type {
	ArticleMetadata,
	TagWithCount,
	ArticleThumbnailImgFmts
} from '$lib/btpc/scripts/types';
import { getTags } from '$lib/btpc/scripts/utils';

export const load: PageLoad = async ({
	url,
	fetch
}): Promise<{
	articles: ArticleMetadata[];
	tags: string[];
	allTags: TagWithCount[];
	thumbnailImgFmts: ArticleThumbnailImgFmts;
}> => {
	const articles = await (await fetch('/api/articles?indexed=true&' + url.searchParams)).json();
	const tags = getTags(url);
	const allTags = await (await fetch('/api/articles/tags')).json();
	const thumbnailImgFmts = await (await fetch('/api/articles/thumbnail-imgs')).json();
	return { articles, tags, allTags, thumbnailImgFmts };
};
