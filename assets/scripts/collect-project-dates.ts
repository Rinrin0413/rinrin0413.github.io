import { readFile, readdir, writeFile } from 'node:fs/promises';
import { compile } from 'mdsvex';
import { getProjectDateKey } from '../../src/lib/btpc/scripts/projects/dates';

const outputPath = 'src/lib/project-dates.json';
const previous: Record<string, string> = JSON.parse(await readFile(outputPath, 'utf8'));
const targets = new Set<string>();

for (const file of (await readdir('projects')).filter((file) => file.endsWith('.md')).sort()) {
	const result = await compile(await readFile(`projects/${file}`, 'utf8'), { highlight: false });
	const metadata = result?.data?.fm as Record<string, unknown> | undefined;
	if (metadata === undefined) throw new Error(`${file}: Missing frontmatter.`);
	// YAML date literals are parsed as Date objects by mdsvex.
	if (metadata.date instanceof Date) metadata.date = metadata.date.toISOString();
	const initDate =
		metadata.initDate instanceof Date ? metadata.initDate.toISOString() : metadata.initDate;
	if (typeof initDate !== 'string' || Number.isNaN(Date.parse(initDate)))
		throw new Error(`${file}: initDate is required and must be a valid date.`);
	for (const field of ['date', 'branch']) {
		const value = metadata[field];
		if (value !== null && (typeof value !== 'string' || value.trim() === ''))
			throw new Error(`${file}: ${field} must be a nonempty string or null.`);
	}
	if (typeof metadata.date === 'string') {
		if (Number.isNaN(Date.parse(metadata.date))) throw new Error(`${file}: Invalid date.`);
		continue;
	}
	if (metadata.branch === null) continue;
	if (typeof metadata.repo !== 'string') throw new Error(`${file}: A GitHub repo is required.`);
	targets.add(getProjectDateKey(metadata.repo, metadata.branch as string));
}

const output: Record<string, string> = {};
for (const key of [...targets].sort()) {
	try {
		const headers: Record<string, string> = {
			Accept: 'application/vnd.github+json',
			'User-Agent': 'Rinrin0413'
		};
		const token = process.env.GITHUB_TOKEN;
		if (token !== undefined && token !== '') headers.Authorization = `Bearer ${token}`;
		const [owner, repo, branch] = key.split('/');
		const response = await fetch(
			`https://api.github.com/repos/${owner}/${repo}/commits/${branch}`,
			{
				headers,
				signal: AbortSignal.timeout(15_000)
			}
		);
		if (response.ok === false) throw new Error(`GitHub HTTP ${response.status}`);
		const data = (await response.json()) as { commit?: { committer?: { date?: unknown } } };
		const date = data.commit?.committer?.date;
		if (typeof date !== 'string' || Number.isNaN(Date.parse(date)))
			throw new Error('GitHub returned an invalid committer date.');
		output[key] = new Date(date).toISOString();
	} catch (error) {
		console.warn(`Failed to collect project date for ${key}:`, error);
		const fallback = previous[key];
		if (typeof fallback !== 'string' || Number.isNaN(Date.parse(fallback)))
			throw new Error(`No saved project date for ${key}.`, { cause: error });
		console.warn(`Using saved project date for ${key}: ${fallback}`);
		output[key] = fallback;
	}
}

await writeFile(outputPath, JSON.stringify(output, null, '\t') + '\n');
console.log(`Successfully generated ${outputPath}`);
