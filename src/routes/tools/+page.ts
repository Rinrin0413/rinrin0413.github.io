import type { PageLoad } from './$types';
import type { ToolMetadata, TagWithCount } from '$lib/scripts/types';
import { getTags } from '$lib/btpc/scripts/utils';

export const load: PageLoad = async ({
	url,
	fetch
}): Promise<{
	tools: ToolMetadata[];
	tags: string[];
	allTags: TagWithCount[];
}> => {
	const tools = await (await fetch('/api/tools?' + url.searchParams)).json();
	const tags = getTags(url);
	const allTags = await (await fetch('/api/tools/tags')).json();
	return {
		tools,
		tags,
		allTags
	};
};
