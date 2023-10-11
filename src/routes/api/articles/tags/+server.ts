import { fetchTags } from '$lib/util';
import { json } from '@sveltejs/kit';

export const prerender = true;

export const GET = async () => json(await fetchTags());
