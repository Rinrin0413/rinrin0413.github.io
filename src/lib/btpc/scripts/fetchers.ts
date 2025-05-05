import type {
	ArticleMetadata,
	ArticleThumbnailImgFmts,
	ToolMetadata,
	ArtworkMetadata,
	ItemWithCount,
	ProjectMetadata
} from '$lib/btpc/scripts/types';
import { RECOGNIZED_LICENSES as RECOGNIZED_PJT_LICENSES } from '../../../routes/projects/works/[slug]/OtherInfo.svelte';

/** Fetches and sorts articles. */
export async function fetchArticles({ limit, tags, isOnlyIndexed }: fetchArticlesOptions = {}) {
	// Fetch all articles.
	let articles = await Promise.all(
		Object.entries(import.meta.glob('/articles/*.md')).map(async ([path, module]) => {
			const { metadata } = (await module()) as { metadata: ArticleMetadata };
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			metadata.slug = path.split('/').pop()!.split('.')[0];
			return metadata;
		})
	);

	// Convert all the tags to lowercase.
	articles.forEach((a) => {
		if (a.tags !== null) a.tags = a.tags.map((t) => t.toLowerCase());
	});

	// Filterings
	articles = articles.filter((a) => {
		// Filter by published.
		if (!a.published) return false;

		// Filter by tags.
		if (tags)
			for (const tag of tags) {
				if (!a.tags.includes(tag.toLowerCase())) return false;
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
				Object.values(import.meta.glob('/articles/*.md')).map(async (module) => {
					const { metadata } = (await module()) as { metadata: ArticleMetadata };
					return {
						isValid: metadata.indexed && metadata.published,
						tags: metadata.tags
					};
				})
			)
		)
			// Filter by published,indexed
			// and convert to list of tags.
			.flatMap((a) => (a.isValid ? a.tags : []))

			// Count tags.
			.reduce((acc: ItemWithCount[], tag) => {
				const tagLowercase = tag.toLowerCase();
				const existingTag = acc.find((t) => t.item.toLowerCase() === tagLowercase);
				existingTag ? existingTag.count++ : acc.push({ item: tagLowercase, count: 1 });
				return acc;
			}, [])

			// Sort by tag name.
			.sort((a, b) => a.item.localeCompare(b.item, 'ja'))

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
			const { metadata } = (await module()) as { metadata: ToolMetadata };
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			metadata.id = path.split('/')[4];
			return metadata;
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
					const { metadata } = (await module()) as { metadata: ToolMetadata };
					return metadata.tags;
				})
			)
		)
			// Convert from "list of tag lists" to "list of tags".
			.flat()

			// Count tags.
			.reduce((acc: ItemWithCount[], tag) => {
				const tagLowercase = tag.toLowerCase();
				const existingTag = acc.find((t) => t.item.toLowerCase() === tagLowercase);
				existingTag ? existingTag.count++ : acc.push({ item: tagLowercase, count: 1 });
				return acc;
			}, [])

			// Sort by tag name.
			.sort((a, b) => a.item.localeCompare(b.item, 'ja'))

			// Sort by count.
			.sort((a, b) => b.count - a.count);

	return tags;
}

/** Fetches and sorts artworks. */
export async function fetchArtworks({ category, tags, license }: fetchArtworksOptions = {}) {
	// Fetch all artworks.
	let artworks = await Promise.all(
		Object.entries(import.meta.glob('/artworks/*.md')).map(async ([path, module]) => {
			const { metadata } = (await module()) as { metadata: ArtworkMetadata };
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			metadata.id = path.split('/').pop()!.split('.')[0];
			return metadata;
		})
	);

	// Filterings
	artworks = artworks.filter((a) => {
		// Filter by category.
		if (category !== undefined && a.category !== category) return false;

		// Filter by tags.
		if (tags !== undefined && tags.length !== 0)
			if (!tags.every((t) => a.tags.includes(t))) return false;

		// Filter by license.
		if (license !== undefined && a.license !== license) return false;

		return true;
	});

	// Sort by newest.
	artworks.sort((a, b) => {
		if (a.date !== null && b.date !== null)
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		if (a.date === null && b.date !== null) return 1;
		if (a.date !== null && b.date === null) return -1;
		return 0;
	});

	return artworks;
}

type fetchArtworksOptions = {
	category?: string;
	tags?: string[];
	license?: string;
};

/** Returns the list of the artwork categories and their counts. */
export async function fetchArtworkCategories() {
	const categories = // Fetch all artworks.
		(
			await Promise.all(
				Object.values(import.meta.glob('/artworks/*.md')).map(async (module) => {
					const { metadata } = (await module()) as { metadata: ArtworkMetadata };
					return metadata.category;
				})
			)
		)
			// Count categories.
			.reduce((acc: ItemWithCount[], category) => {
				const existingCategory = acc.find((t) => t.item === category);
				existingCategory ? existingCategory.count++ : acc.push({ item: category, count: 1 });
				return acc;
			}, [])

			// Sort by tag name.
			.sort((a, b) => a.item.localeCompare(b.item, 'ja'))

			// Sort by count.
			.sort((a, b) => b.count - a.count);

	return categories;
}

/** Returns the list of the artwork tags and their counts. */
export async function fetchArtworkTags() {
	const tags = // Fetch all artworks.
		(
			await Promise.all(
				Object.values(import.meta.glob('/artworks/*.md')).map(async (module) => {
					const { metadata } = (await module()) as { metadata: ArtworkMetadata };
					return metadata.tags;
				})
			)
		)
			// Convert from "list of tag lists" to "list of tags".
			.flat()

			// Count tags.
			.reduce((acc: ItemWithCount[], tag) => {
				const existingTag = acc.find((t) => t.item === tag);
				existingTag ? existingTag.count++ : acc.push({ item: tag, count: 1 });
				return acc;
			}, [])

			// Sort by tag name.
			.sort((a, b) => a.item.localeCompare(b.item, 'ja'))

			// Sort by count.
			.sort((a, b) => b.count - a.count);

	return tags;
}

/** Returns the list of the valid licenses for the artwork and their counts. */
export async function fetchArtworkLicenses() {
	const licenses = // Fetch all artworks.
		(
			await Promise.all(
				Object.values(import.meta.glob('/artworks/*.md')).map(async (module) => {
					const { metadata } = (await module()) as { metadata: ArtworkMetadata };
					return metadata.license;
				})
			)
		)
			// Count categories.
			.reduce((acc: ItemWithCount[], license) => {
				if (license === 'CC BY-SA 4.0') {
					const existingLicense = acc.find((t) => t.item === license);
					existingLicense ? existingLicense.count++ : acc.push({ item: license, count: 1 });
				}
				return acc;
			}, [])

			// Sort by tag name.
			.sort((a, b) => a.item.localeCompare(b.item, 'ja'))

			// Sort by count.
			.sort((a, b) => b.count - a.count);

	return licenses;
}

/** Fetches and sorts projects. */
export async function fetchProjects({ tags, langs, license, status }: fetchProjectsOptions = {}) {
	// Fetch all projects.
	let projects = await Promise.all(
		Object.entries(import.meta.glob('/projects/*.md')).map(async ([path, module]) => {
			const { metadata } = (await module()) as { metadata: ProjectMetadata };
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			metadata.id = path.split('/').pop()!.split('.')[0];
			return metadata;
		})
	);

	// Filterings
	projects = projects.filter((a) => {
		// Filter by tags.
		if (tags !== undefined && tags.length !== 0)
			if (!tags.every((t) => a.tags.includes(t))) return false;

		// Filter by programming languages.
		if (langs !== undefined && langs.length !== 0)
			if (!langs.every((l) => a.langs.includes(l))) return false;

		// Filter by license.
		if (license !== undefined && a.license !== license) return false;

		// Filter by status.
		if (status !== undefined && a.status !== status) return false;

		return true;
	});

	// Sort by newest.
	projects.sort((a, b) => {
		const aDate = a.date ?? a.initDate;
		const bDate = b.date ?? b.initDate;
		if (aDate !== null && bDate !== null)
			return new Date(bDate).getTime() - new Date(aDate).getTime();
		if (aDate === null && bDate !== null) return 1;
		if (aDate !== null && bDate === null) return -1;
		return 0;
	});

	return projects;
}

type fetchProjectsOptions = {
	tags?: string[];
	langs?: string[];
	license?: string;
	status?: string;
};

/** Returns the list of the project tags and their counts. */
export async function fetchProjectTags() {
	const tags = (
		await Promise.all(
			Object.values(import.meta.glob('/projects/*.md')).map(async (module) => {
				const { metadata } = (await module()) as { metadata: ProjectMetadata };
				return metadata.tags;
			})
		)
	)
		// Convert from "list of tag lists" to "list of tags".
		.flat()

		// Count tags.
		.reduce((acc: ItemWithCount[], tag) => {
			const existingTag = acc.find((t) => t.item === tag);
			existingTag ? existingTag.count++ : acc.push({ item: tag, count: 1 });
			return acc;
		}, [])

		// Sort by tag name.
		.sort((a, b) => a.item.localeCompare(b.item, 'ja'))

		// Sort by count.
		.sort((a, b) => b.count - a.count);

	return tags;
}

/** Returns the list of the programming languages for the projects and their counts. */
export async function fetchProjectLangs() {
	const langs = (
		await Promise.all(
			Object.values(import.meta.glob('/projects/*.md')).map(async (module) => {
				const { metadata } = (await module()) as { metadata: ProjectMetadata };
				return metadata.langs;
			})
		)
	)
		// Convert from "list of language lists" to "language list".
		.flat()

		// Count languages.
		.reduce((acc: ItemWithCount[], lang) => {
			const existingLang = acc.find((t) => t.item === lang);
			existingLang ? existingLang.count++ : acc.push({ item: lang, count: 1 });
			return acc;
		}, [])

		// Sort by language name.
		.sort((a, b) => a.item.localeCompare(b.item, 'ja'))

		// Sort by count.
		.sort((a, b) => b.count - a.count);

	return langs;
}

/** Returns the list of the valid licenses for the projects and their counts. */
export async function fetchProjectLicenses() {
	const licenses = (
		await Promise.all(
			Object.values(import.meta.glob('/projects/*.md')).map(async (module) => {
				const { metadata } = (await module()) as { metadata: ProjectMetadata };
				return metadata.license;
			})
		)
	)
		// Count categories.
		.reduce((acc: ItemWithCount[], license) => {
			// `as boolean` is needed to avoid the unexpected unexpected unexpected error "Unexpected any value in conditional". why
			if (license !== null && (RECOGNIZED_PJT_LICENSES.includes(license) as boolean)) {
				const existingLicense = acc.find((t) => t.item === license);
				existingLicense ? existingLicense.count++ : acc.push({ item: license, count: 1 });
			}
			return acc;
		}, [])

		// Sort by tag name.
		.sort((a, b) => a.item.localeCompare(b.item, 'ja'))

		// Sort by count.
		.sort((a, b) => b.count - a.count);

	return licenses;
}

/** Returns the list of the project statuses and their counts. */
export async function fetchProjectStatuses() {
	const statuses = (
		await Promise.all(
			Object.values(import.meta.glob('/projects/*.md')).map(async (module) => {
				const { metadata } = (await module()) as { metadata: ProjectMetadata };
				return metadata.status;
			})
		)
	)
		// Count statuses.
		.reduce((acc: ItemWithCount[], status) => {
			const existingStatus = acc.find((t) => t.item === status);
			existingStatus ? existingStatus.count++ : acc.push({ item: status, count: 1 });
			return acc;
		}, []);

	return statuses;
}
