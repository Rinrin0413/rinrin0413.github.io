import type { PageLoad } from './$types';
import type { ProjectMetadata, ItemWithCount } from '$lib/btpc/scripts/types';
import { getTags } from '$lib/btpc/scripts/utils';

export const load: PageLoad = async ({
	url,
	fetch
}): Promise<{
	projects: ProjectMetadata[];
	tags: string[];
	lang: string | null;
	license: string | null;
	status: string | null;
	allTags: ItemWithCount[];
	allLangs: ItemWithCount[];
	allLicenses: ItemWithCount[];
	allStatuses: ItemWithCount[];
}> => {
	const projects = await (await fetch('/api/projects?' + url.searchParams)).json();
	const tags = getTags(url);
	const lang = url.searchParams.get('langs')?.split(',')[0] ?? null;
	const license = url.searchParams.get('license');
	const status = url.searchParams.get('status');
	const allTags = await (await fetch('/api/projects/tags')).json();
	const allLangs = await (await fetch('/api/projects/langs')).json();
	const allLicenses = await (await fetch('/api/projects/licenses')).json();
	const allStatuses = await (await fetch('/api/projects/statuses')).json();
	return {
		projects,
		tags,
		lang,
		license,
		status,
		allTags,
		allLangs,
		allLicenses,
		allStatuses
	};
};
