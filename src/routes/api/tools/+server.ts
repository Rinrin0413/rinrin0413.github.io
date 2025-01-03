import type { RequestHandler } from './$types';
import { fetchTools } from '$lib/scripts/fetchers';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const tags = url.searchParams.get('t')?.split(',') ?? [];
	return json(await fetchTools(tags));
};
