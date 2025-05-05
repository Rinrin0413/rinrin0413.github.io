import type { ProjectStatus } from '$lib/btpc/scripts/projects/util';

export interface ItemWithCount {
	item: string;
	count: number;
}

// I explicitly specified ` | null` instead of optional variable.
// This is to prevent missing fields in the article frontmatter definitions.
/** Alphabetic characters in the tags must be lowercase. */
export interface ArticleMetadata {
	published: boolean;
	indexed: boolean;
	title: string;
	desc: string | null;
	tags: string[];
	slug?: string;
}

export interface ArticleThumbnailImgFmts {
	[slug: string]: string;
}

// I explicitly specified ` | null` instead of optional variable,
// to prevent missing fields in the tool metadata definitions.
/** Alphabetic characters in the tags must be lowercase. */
export interface ToolMetadata {
	title: string;
	desc: string | null;
	tags: string[];
	id?: string;
}

// I explicitly specified ` | null` instead of optional variable,
// to prevent missing fields in the tool metadata definitions.
/** Alphabetic characters in the tags must be lowercase. */
export interface ArtworkMetadata {
	category: string;
	title: string;
	desc: string | null;
	tags: string[];
	date: string | null;
	usedTools: string[];
	license: string | null;
	thumbnailImg: string | null;
	id?: string;
}

// I explicitly specified ` | null` instead of optional variable,
// to prevent missing fields in the tool metadata definitions.
export interface ProjectMetadata {
	title: string;
	desc: string | null;
	tags: string[];
	langs: string[];
	repo: string | null;
	website: string | null;
	status: ProjectStatus;
	date: string | null;
	initDate: string | null;
	license: string | null;
	thumbnailImg: string | null;
	id?: string;
}
