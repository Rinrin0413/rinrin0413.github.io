import type { RequestHandler } from './$types';
import { fetchArticles } from '$lib/scripts/fetchers';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const limit = parseInt(url.searchParams.get('l') ?? '0');
	const tags = url.searchParams.get('t')?.split(',') ?? [];
	const isOnlyIndexed = url.searchParams.get('indexed') === 'true';
	return json(await fetchArticles({ limit, tags, isOnlyIndexed }));
};
