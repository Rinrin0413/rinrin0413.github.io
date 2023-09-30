import { fetchArticles } from '$lib/util';
import { json } from '@sveltejs/kit';

export const GET = async ({url}) => {
    const limit = parseInt(url.searchParams.get('l') ?? '');
    return json(await fetchArticles({limit}));
};
