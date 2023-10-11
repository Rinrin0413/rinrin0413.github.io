import { fetchTags } from '$lib/util';
import { json } from '@sveltejs/kit';

export const prerender = true;

export async function GET() {
	return json(await fetchTags());
}
