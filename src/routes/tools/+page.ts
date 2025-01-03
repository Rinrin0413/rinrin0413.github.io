import type { PageLoad } from './$types';
import type { ToolMetadata, TagWithCount } from '$lib/scripts/types';

export const load: PageLoad = async ({
	url,
	fetch
}): Promise<{
	tools: ToolMetadata[];
	tags: string[];
	allTags: TagWithCount[];
}> => {
	const tools = await (await fetch('/api/tools?' + url.searchParams)).json();
	const tags = url.searchParams.get('t')?.split(',') ?? [];
	const allTags = await (await fetch('/api/tools/tags')).json();
	return {
		tools,
		tags,
		allTags
	};
};
