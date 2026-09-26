import generatedDates from '../../../project-dates.json' with { type: 'json' };
import type { ProjectMetadata } from '../types';
import { getProjectDateKey } from './date-key';

/** Resolves dates without modifying the imported Markdown metadata. */
export function resolveProjectDate(metadata: ProjectMetadata): ProjectMetadata {
	if (metadata.date !== null || metadata.branch === null) return { ...metadata };
	if (metadata.repo === null) throw new Error('Automatic project dates require a repository.');
	const dates: Record<string, string> = generatedDates;
	const date = dates[getProjectDateKey(metadata.repo, metadata.branch)] ?? null;
	return { ...metadata, date };
}
