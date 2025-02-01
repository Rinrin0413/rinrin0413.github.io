import type { PageLoad } from './$types';
import type { SvelteComponent } from 'svelte';
import type { ArtworkMetadata } from '$lib/btpc/scripts/types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({
	params
}): Promise<{
	component: typeof SvelteComponent;
	frontmatter: ArtworkMetadata;
}> => {
	const { default: component, metadata: frontmatter } = await import(
		`../../../../../artworks/${params.slug}.md`
	).catch(err);
	return { component, frontmatter };
};

function err() {
	throw error(404);
}
