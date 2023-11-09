import type { PageLoad } from './$types';
import type { ArticleMetadata } from '$lib/types';

export const load: PageLoad = async ({
	fetch
}): Promise<{ articles: ArticleMetadata[]; }> => {
	const articles = await (await fetch('/api/articles?indexed=true&l=4')).json();
	return { articles };
};
