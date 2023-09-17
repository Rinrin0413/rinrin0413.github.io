import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	try {
		const { default: component, metadata: frontmatter } = await import(`../${params.slug}.md`);
		if (!frontmatter.published) err();
		return { slug: params.slug, component, frontmatter };
	} catch {
		err();
	}
};

function err() {
	throw error(404, 'This article does not exist');
}
