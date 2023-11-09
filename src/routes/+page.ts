import type { PageLoad } from './$types';
import type { ArticleMetadata } from '$lib/types';

export const load: PageLoad = async ({ fetch }): Promise<{ articles: ArticleMetadata[] }> => {
	const ARTICLE_LIMIT = 3;
	const articles = await (await fetch('/api/articles?indexed=true&l=' + ARTICLE_LIMIT)).json();
	return { articles };
};
