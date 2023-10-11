import type { RequestHandler } from './$types';
import { fetchArticles } from '$lib/util';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const limit = parseInt(url.searchParams.get('l') ?? '');
	const tags = url.searchParams.get('t')?.split(',') ?? [];
	const only_indexed = url.searchParams.get('indexed') == 'true';
	return json(await fetchArticles({ limit, tags, only_indexed }));
};
