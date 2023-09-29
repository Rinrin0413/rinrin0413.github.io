import { fetchArticles } from '$lib/util';
import { json } from '@sveltejs/kit';

export const GET = async () => json(await fetchArticles());
