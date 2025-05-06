import type { RequestHandler } from './$types';
import { fetchProjects } from '$lib/btpc/scripts/fetchers';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const tags = url.searchParams.get('t')?.split(',') ?? [];
	const langs = url.searchParams.get('langs')?.split(',') ?? [];
	const license = url.searchParams.get('license') ?? undefined;
	const status = url.searchParams.get('status') ?? undefined;
	return json(await fetchProjects({ tags, langs, license, status }));
};
