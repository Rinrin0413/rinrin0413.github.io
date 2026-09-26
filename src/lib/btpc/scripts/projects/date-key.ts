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
