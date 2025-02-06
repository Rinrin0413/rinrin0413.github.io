import type { RequestHandler } from './$types';
import { fetchArtworks } from '$lib/btpc/scripts/fetchers';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const category = url.searchParams.get('c') ?? undefined;
	const tags = url.searchParams.get('t')?.split(',') ?? [];
	const license = url.searchParams.get('license') ?? undefined;
	return json(await fetchArtworks({ category, tags, license }));
};
