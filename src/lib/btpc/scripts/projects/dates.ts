import savedDates from '../../../project-dates.json' with { type: 'json' };
import type { ProjectMetadata } from '../types';

/** Identifies a GitHub repository and branch without ambiguous separators. */
export function getProjectDateKey(repo: string, branch: string): string {
	const url = new URL(repo);
	const match = /^\/([^/]+)\/([^/]+?)\/?$/.exec(url.pathname);
	if (url.protocol !== 'https:' || url.hostname !== 'github.com' || match === null)
		throw new Error(`Invalid GitHub repository URL: ${repo}`);
	const owner = match[1].toLowerCase();
	const name = match[2].replace(/\.git$/, '').toLowerCase();
	return `${owner}/${name}/${encodeURIComponent(branch)}`;
}

/** Resolves dates without modifying the imported Markdown metadata. */
export function resolveProjectDate(metadata: ProjectMetadata): ProjectMetadata {
	if (metadata.date !== null || metadata.branch === null) return { ...metadata };
	if (metadata.repo === null) throw new Error('Automatic project dates require a repository.');
	const dates: Record<string, string> = savedDates;
	const date = dates[getProjectDateKey(metadata.repo, metadata.branch)] ?? null;
	return { ...metadata, date };
}
