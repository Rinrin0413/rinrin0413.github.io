export interface TagWithCount {
	tag: string;
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
	tags: string[] | null;
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
	date: string;
	usedTools: string[];
	thumbnailImg: string | null;
	id?: string;
}
