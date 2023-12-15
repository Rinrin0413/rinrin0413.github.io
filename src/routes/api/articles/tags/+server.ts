import { fetchTags } from '$lib/fetchers';
import { json } from '@sveltejs/kit';

export const prerender = true;

export const GET = async () => json(await fetchTags());
