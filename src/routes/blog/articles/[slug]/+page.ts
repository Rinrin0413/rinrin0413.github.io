import type { PageLoad } from './$types';
import type { SvelteComponent } from 'svelte';
import type { ArticleMetadata } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({
	params,
	fetch
}): Promise<{
	component: typeof SvelteComponent;
	frontmatter: ArticleMetadata;
	thumbnailImgFmt: string | null;
}> => {
	const { default: component, metadata: frontmatter } = await import(
		`../../../../../articles/${params.slug}.md`
	).catch(err);
	if (!(frontmatter.published as boolean)) err();

	const thumbnailImgFmt = await (await fetch('/api/articles/thumbnail-imgs'))
		.json()
		.then((imgs: { [slug: string]: string }) => imgs[params.slug] ?? null);

	return { component, frontmatter, thumbnailImgFmt };
};

function err() {
	throw error(404);
}
