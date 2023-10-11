import type ArticleMetadata from '$lib/types/ArticleMetadata';
import type ArticleTagWithCount from '$lib/types/ArticleTagWithCount';

export async function load({ url, fetch }): Promise<{
	articles: ArticleMetadata[];
	tags: string[];
	allTags: ArticleTagWithCount[];
}> {
	const articles = await (await fetch('/api/articles?indexed=true&' + url.searchParams)).json();
	const tags = url.searchParams.get('t')?.split(',') ?? [];

	const allTags = await (await fetch('/api/articles/tags')).json();

	return { articles, tags, allTags };
}
