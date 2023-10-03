// I explicitly specified ` | null` instead of optional variable.
// This is to prevent missing fields in the article frontmatter definitions.
export default interface ArticleTagWithCount { tag: string; count: number };