// I explicitly specified ` | null` instead of optional variable.
// This is to prevent missing fields in the article frontmatter definitions.
export default interface ArticleMetadata {
	published: boolean;
	indexed: boolean;
	title: string;
	desc: string | null;
	tags: string[] | null;
	hasThumbnail: boolean;
	imgFmt: string | null;
	slug?: string;
};
