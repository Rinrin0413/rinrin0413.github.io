import type { SvelteComponent } from 'svelte';
import type ArticleMetadata from '$lib/types/ArticleMetadata';
import { error } from '@sveltejs/kit';

export async function load({ params }): Promise<{
	component: typeof SvelteComponent;
	frontmatter: ArticleMetadata;
}> {
	const { default: component, metadata: frontmatter } = await import(
		`../../../../../articles/${params.slug}.md`
	).catch(err);
	if (!frontmatter.published) err();
	return { component, frontmatter };
}

function err() {
	throw error(404);
}
