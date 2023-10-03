import type ArticleMetadata from '$lib/types/ArticleMetadata';

/**
 * Adds a specified class to specified elements when they are scrolled into view.
 *
 * # Example:
 *
 * ```svelte
 * <script lang="ts">
 *     import { onMount } from 'svelte';
 *     import { browser } from '$app/environment';
 *     import { addClassOnVisible } from '$lib/util';
 *
 *     onMount(fadeIn);
 *     if (browser) window.addEventListener('scroll', fadeIn);
 *
 *     function fadeIn() {
 * 	       addClassOnVisible(
 *             document.getElementsByClassName('foo'),
 *             'fade-in-up'
 *         );
 *     }
 * </script>
 *
 * <div class="foo" class:fade-in-up={false} />
 * <a class="foo" class:fade-in-up={false} />
 * ```
 */
export function addClassOnVisible(
	elements: HTMLCollectionOf<Element> | HTMLElement | null,
	className: string
) {
	if (elements instanceof HTMLCollection) {
		[...elements].forEach((e) => {
			addClassOnVisible_(e, className);
		});
	} else if (elements instanceof HTMLElement) {
		addClassOnVisible_(elements, className);
	}
}

function addClassOnVisible_(element: Element | HTMLElement, className: string) {
	if (element.getBoundingClientRect().top < window.innerHeight) {
		element.classList.add(className);
	}
}

/** Calculates the age of Rinrin. */
export function calcAge() {
	const BIRTHDAY = { year: 2006, month: 4, date: 13 };
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const date = today.getDate();
	let age = year - BIRTHDAY.year;
	age -= month < BIRTHDAY.month || (month == BIRTHDAY.month && date < BIRTHDAY.date) ? 1 : 0;
	return age;
}

/** Formats the given month number to a string. */
export function fmtMonth(month: number | null) {
	if (month == null) {
		return '???&nbsp;';
	} else {
		const Months = [
			'Jan.',
			'Feb.',
			'Mar.',
			'Apr.',
			'May&nbsp;',
			'Jun.',
			'Jul.',
			'Aug.',
			'Sep.',
			'Oct.',
			'Nov.',
			'Dec.'
		];
		return Months[month - 1];
	}
}

/** Toggles body scroll prevention. */
export function toggleScrollPrevention(prevent: boolean) {
	document.getElementsByTagName('body')[0].style.overflow = prevent ? 'hidden' : 'auto';
}

/**
 * Returns a string that can be used as a CSS transform property value for parallax effect.
 *
 * # Example:
 *
 * ```svelte
 * <script lang="ts">
 *     import { parallaxStyle } from '$lib/util';
 *
 * 	   let scrollY: number;
 * 	   let parallax = parallaxStyle(0);
 *	   $: parallax = parallaxStyle(scrollY);
 * </script>
 *
 * <svelte:window bind:scrollY />
 *
 * <!-- Low layer (slow) -->
 * <div style="{parallax(0.3)}" />
 *
 * <!-- High layer (fast) -->
 * <div style="{parallax(-0.3)}" />
 * ```
 */
export function parallaxStyle(scrollY: number) {
	return function (factor: number) {
		return `transform: translateY(${scrollY * factor}px);`;
	};
}

/** Converts an article ID to a Date object. */
export function idToDate(articleId: string) {
	const y = articleId.slice(0, 4);
	const m = articleId.slice(4, 6);
	const d = articleId.slice(6, 8);
	return new Date(`${y}-${m}-${d}`);
}

type ArticleTagsWithValidity = { isValid: boolean; tags: string[] | null };

function getArticles(
	callbackfn: ([path, importArticle]: [string, () => unknown]) => Promise<
		ArticleMetadata | ArticleTagsWithValidity
	>
) {
	return Promise.all(
		Object.entries(import.meta.glob('/src/routes/blog/articles/*.md')).map(callbackfn)
	);
}

/** Fetches and sorts all articles. */
export async function fetchArticles({ limit, tags, only_indexed }: fetchArticlesOptions = {}) {
	// Fetch all articles.
	let articles = (await getArticles(async ([path, importArticle]) => {
		const { metadata } = (await importArticle()) as { metadata: ArticleMetadata };
		metadata.slug = path.split('/').pop()!.split('.')[0]; // eslint-disable-line @typescript-eslint/no-non-null-assertion
		return metadata;
	})) as ArticleMetadata[];

	// Filtering
	if (tags || only_indexed != undefined)
		articles = articles.filter((a) => {
			// Filter by published.
			if (!a.published) return false;

			// Filter by tags.
			if (tags)
				for (const tag of tags) {
					const articleTags = a.tags ?? [];
					if (!articleTags.includes(tag)) return false;
				}

			// Filter by indexed.
			if (only_indexed && !a.indexed) return false;

			return true;
		});

	// Sort by newest.
	articles.sort((a, b) => {
		if (a.slug && b.slug) return calcOrder(b.slug) - calcOrder(a.slug);
		// unreachable
		return 0;
	});

	// Limit the number of articles.
	if (limit) articles.splice(limit);

	return articles;
}

type fetchArticlesOptions = {
	limit?: number;
	tags?: string[];
	only_indexed?: boolean;
};

function calcOrder(slug: string) {
	let n = parseInt(slug.split('_')[0]);
	// It is alignment for slugs without numbering.
	n *= n < 100000000 ? 100 : 1;
	return n;
}

/** Returns a list of tags and their counts. */
export async function fetchTags() {
	const tags = // Fetch all articles.
		(
			(await getArticles(async ([_, importArticle]) => {
				const { metadata } = (await importArticle()) as { metadata: ArticleMetadata };
				return {
					isValid: metadata.indexed && metadata.published,
					tags: metadata.tags
				};
			})) as ArticleTagsWithValidity[]
		)
			// Filter by published,indexed
			// and convert to list of tags.
			.flatMap((a) => (a.isValid && a.tags) || [])

			// Count tags.
			.reduce((acc: { tag: string; count: number }[], tag) => {
				const existingTag = acc.find((t) => t.tag == tag);
				existingTag ? existingTag.count++ : acc.push({ tag, count: 1 });
				return acc;
			}, [])

			// Sort by tag name.
			.sort((a, b) => a.tag.localeCompare(b.tag))

			// Sort by count.
			.sort((a, b) => b.count - a.count);

	return tags;
}
