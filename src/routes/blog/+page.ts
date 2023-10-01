import type { PageLoad } from './$types';
import type ArticleMetadata from '$lib/types/ArticleMetadata';

export const load: PageLoad = async ({ url, fetch }): Promise<{ articles: ArticleMetadata[] }> => {
	const response = await fetch('/api/articles?indexed=true&' + url.searchParams);
	console.log('/api/articles?indexed=true&' + url.searchParams);
	const articles = await response.json();
	return { articles };
};
