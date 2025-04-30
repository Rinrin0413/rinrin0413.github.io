import type { PageLoad } from './$types';
import type { SvelteComponent } from 'svelte';
import type { ProjectMetadata } from '$lib/btpc/scripts/types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({
	params
}): Promise<{
	component: typeof SvelteComponent;
	frontmatter: ProjectMetadata;
}> => {
	const { default: component, metadata: frontmatter } = await import(
		`../../../../../projects/${params.slug}.md`
	).catch(err);
	return { component, frontmatter };
};

function err() {
	throw error(404);
}
