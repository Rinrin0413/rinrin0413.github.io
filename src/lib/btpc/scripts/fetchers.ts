import type {
	ArticleMetadata,
	ArticleThumbnailImgFmts,
	ToolMetadata
} from '$lib/btpc/scripts/types';

/** Fetches and sorts articles. */
export async function fetchArticles({ limit, tags, isOnlyIndexed }: fetchArticlesOptions = {}) {
	// Fetch all articles.
	let articles = await Promise.all(
		Object.entries(import.meta.glob('/articles/*.md')).map(async ([path, importArticle]) => {
			const { metadata } = (await importArticle()) as { metadata: ArticleMetadata };
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			metadata.slug = path.split('/').pop()!.split('.')[0];
			return metadata;
		})
	);

	// Convert all the tags to lowercase.
	articles.forEach((a) => {
		if (a.tags !== null) a.tags = a.tags.map((t) => t.toLowerCase());
	});

	// Filtering
	articles = articles.filter((a) => {
		// Filter by published.
		if (!a.published) return false;

		// Filter by tags.
		if (tags)
			for (const tag of tags) {
				const articleTags = a.tags ?? [];
				if (!articleTags.includes(tag.toLowerCase())) return false;
			}

		// Filter by indexed.
		if (isOnlyIndexed !== undefined && isOnlyIndexed && !a.indexed) return false;

		return true;
	});

	// Sort by newest.
	articles.sort((a, b) => {
		if (a.slug !== undefined && b.slug !== undefined)
			return calcArticleOrder(b.slug) - calcArticleOrder(a.slug);
		// unreachable
		return 0;
	});

	// Limit the number of articles.
	if (limit !== undefined && limit !== 0) articles.splice(limit);

	return articles;
}

type fetchArticlesOptions = {
	limit?: number;
	tags?: string[];
	isOnlyIndexed?: boolean;
};

function calcArticleOrder(slug: string) {
	let n = parseInt(slug.split('_')[0]);
	// It is alignment for slugs without numbering.
	n *= n < 100000000 ? 100 : 1;
	return n;
}

/** Returns the list of the article tags and their counts. */
export async function fetchArticleTags() {
	const tags = // Fetch all articles.
		(
			await Promise.all(
				Object.values(import.meta.glob('/articles/*.md')).map(async (importArticle) => {
					const { metadata } = (await importArticle()) as { metadata: ArticleMetadata };
					return {
						isValid: metadata.indexed && metadata.published,
						tags: metadata.tags
					};
				})
			)
		)
			// Filter by published,indexed
			// and convert to list of tags.
			.flatMap((a) => (a.isValid && a.tags) || [])

			// Count tags.
			.reduce((acc: { tag: string; count: number }[], tag) => {
				const tagLowercase = tag.toLowerCase();
				const existingTag = acc.find((t) => t.tag.toLowerCase() === tagLowercase);
				existingTag ? existingTag.count++ : acc.push({ tag: tagLowercase, count: 1 });
				return acc;
			}, [])

			// Sort by tag name.
			.sort((a, b) => a.tag.localeCompare(b.tag, 'ja'))

			// Sort by count.
			.sort((a, b) => b.count - a.count);

	return tags;
}

/** Returns the file format of each article's thumbnail image (articles without thumbnail images will not be listed). */
export async function fetchArticleThumbnailImgFmt() {
	const thumbnailImgs = Object.keys(import.meta.glob(`/static/images/blog/thumbnails/*.*`)).map(
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		(path) => path.split('/').pop()!
	);
	return (await Promise.all(Object.keys(import.meta.glob('/articles/*.md')))).reduce(
		(acc: ArticleThumbnailImgFmts, path) => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const slug = path.split('/').pop()!.split('.')[0];
			for (const img of thumbnailImgs) {
				const [name, fmt] = img.split('.');
				if (name === slug) acc[slug] = fmt;
			}
			return acc;
		},
		{}
	);
}

/** Fetches and sorts all the tools. */
export async function fetchTools(tags?: string[]) {
	// Fetch all the tools.
	let tools = await Promise.all(
		Object.entries(import.meta.glob('/src/routes/tools/*/*.svelte')).map(async ([path, module]) => {
			const { METADATA } = (await module()) as { METADATA: ToolMetadata };
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			METADATA.id = path.split('/')[4];
			return METADATA;
		})
	);

	// Convert all the tags to lowercase.
	tools.forEach((t) => {
		if (t.tags !== null) t.tags = t.tags.map((t) => t.toLowerCase());
	});

	// Filter by tags.
	tools = tools.filter((a) => {
		if (tags)
			for (const tag of tags) {
				const articleTags = a.tags ?? [];
				if (!articleTags.includes(tag.toLowerCase())) return false;
			}

		return true;
	});

	// Sort by tool title.
	tools.sort((a, b) => a.title.localeCompare(b.title, 'ja'));

	return tools;
}

/** Returns the list of the tool tags and their counts. */
export async function fetchToolTags() {
	const tags = // Fetch all tools.
		(
			await Promise.all(
				Object.values(import.meta.glob('/src/routes/tools/*/*.svelte')).map(async (module) => {
					const { METADATA } = (await module()) as { METADATA: ToolMetadata };
					return METADATA.tags;
				})
			)
		)
			// Convert from "list of tag lists" to "list of tags".
			.flat()

			// Count tags.
			.reduce((acc: { tag: string; count: number }[], tag) => {
				const tagLowercase = tag.toLowerCase();
				const existingTag = acc.find((t) => t.tag.toLowerCase() === tagLowercase);
				existingTag ? existingTag.count++ : acc.push({ tag: tagLowercase, count: 1 });
				return acc;
			}, [])

			// Sort by tag name.
			.sort((a, b) => a.tag.localeCompare(b.tag, 'ja'))

			// Sort by count.
			.sort((a, b) => b.count - a.count);

	return tags;
}
