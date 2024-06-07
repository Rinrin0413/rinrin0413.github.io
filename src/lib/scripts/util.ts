/**
 * Adds a specified class to specified elements when they are scrolled into view.
 *
 * @param elements - The elements to be observed.
 * @param className - The class to be added.
 * @param options.delay - The delay in milliseconds before adding the class.
 * @param options.evenLittleBit - If true, the class will be added even if the element is slightly visible.
 *
 * **＊ This function is intended to be used in the browser environment.**
 *
 * # Example:
 *
 * ```svelte
 * <script lang="ts">
 *     import { onMount } from 'svelte';
 *     import { browser } from '$app/environment';
 *     import { addClassOnVisible } from '$lib/scripts/util';
 *
 *     onMount(fadeIn);
 *     if (browser) window.addEventListener('scroll', fadeIn);
 *
 *     function fadeIn() {
 *         addClassOnVisible(
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
	elements:
		| HTMLCollectionOf<Element>
		| NodeListOf<Element>
		| HTMLElement
		| Element
		| null
		| undefined,
	className: string,
	options: addClassOnVisibleOptions = { delay: 0, evenLittleBit: false }
) {
	if (elements instanceof HTMLCollection || elements instanceof NodeList) {
		[...elements].forEach((e) => {
			addClassOnVisible_(e, className, options);
		});
	} else if (elements instanceof HTMLElement || elements instanceof Element) {
		addClassOnVisible_(elements, className, options);
	}
}

type addClassOnVisibleOptions = {
	delay?: number;
	evenLittleBit?: boolean;
};

/** **＊ This function is intended to be used in the browser environment.** */
function addClassOnVisible_(element: Element | HTMLElement, className: string, options: addClassOnVisibleOptions) {
	const evenLittleBit = options.evenLittleBit ?? false;
	const rect = element.getBoundingClientRect();
	const t = rect.top;
	const b = rect.bottom;
	// threshold = top + (25% of difference between top and bottom) + 86px
	const threshold = t + (b - t) * 0.25 + 86;
	if ((evenLittleBit ? t : threshold) < window.innerHeight) {
		setTimeout(() => {
			element.classList.add(className);
		}, options.delay ?? 0);
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

/**
 * Toggles body scroll prevention.
 *
 * **＊ This function is intended to be used in the browser environment.**
 */
export function toggleScrollPrevention(prevent: boolean) {
	document.body.style.overflow = prevent ? 'hidden' : 'auto';
}

/**
 * Returns a string that can be used as a CSS transform property value for parallax effect.
 *
 * # Example:
 *
 * ```svelte
 * <script lang="ts">
 *     import { parallaxStyle } from '$lib/scripts/util';
 *
 * 	   let scrollY: number;
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

/** Converts to an URL of the favicon of the given domain. */
export function faviconUrl(domain: string) {
	return `https://${domain}/favicon.ico`;
}
