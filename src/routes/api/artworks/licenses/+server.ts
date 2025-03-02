import { fetchArtworkLicenses } from '$lib/btpc/scripts/fetchers';
import { json } from '@sveltejs/kit';

export const prerender = true;

export const GET = async () => json(await fetchArtworkLicenses());
