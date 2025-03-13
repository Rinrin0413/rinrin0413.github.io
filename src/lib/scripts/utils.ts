/** Calculates the age of Rinrin. */
export function calcAge() {
	const BIRTHDAY = { year: 2006, month: 4, date: 13 };
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const date = today.getDate();
	let age = year - BIRTHDAY.year;
	age -= month < BIRTHDAY.month || (month === BIRTHDAY.month && date < BIRTHDAY.date) ? 1 : 0;
	return age;
}

/** Formats the given month number to a string. */
export function fmtMonth(month: number | null) {
	if (month === null) {
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
 * **＊ Must be called in the browser environment.**
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
 *     import { parallaxStyle } from '$lib/scripts/utils';
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
