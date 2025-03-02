import type { PageLoad } from './$types';
import type { ArtworkMetadata, ItemWithCount } from '$lib/btpc/scripts/types';
import { getTags } from '$lib/btpc/scripts/utils';

export const load: PageLoad = async ({
	url,
	fetch
}): Promise<{
	artworks: ArtworkMetadata[];
	category: string | null;
	tags: string[];
	license: string | null;
	allCategories: ItemWithCount[];
	allTags: ItemWithCount[];
	allLicenses: ItemWithCount[];
}> => {
	const artworks = await (await fetch('/api/artworks?' + url.searchParams)).json();
	const category = url.searchParams.get('c');
	const tags = getTags(url);
	const license = url.searchParams.get('license');
	const allCategories = await (await fetch('/api/artworks/categories')).json();
	const allTags = await (await fetch('/api/artworks/tags')).json();
	const allLicenses = await (await fetch('/api/artworks/licenses')).json();
	return {
		artworks,
		category,
		tags,
		license,
		allCategories,
		allTags,
		allLicenses
	};
};
