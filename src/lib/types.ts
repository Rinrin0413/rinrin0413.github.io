// I explicitly specified ` | null` instead of optional variable.
// This is to prevent missing fields in the article frontmatter definitions.
export interface ArticleMetadata {
	published: boolean;
	indexed: boolean;
	title: string;
	desc: string | null;
	tags: string[] | null;
	slug?: string;
}

export interface ArticleTagWithCount {
	tag: string;
	count: number;
}

export interface ArticleThumbnailImgFmts {
	[slug: string]: string;
}
