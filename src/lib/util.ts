/**
 * Adds a specified class to specified elements when they are scrolled into view.
 *
 * # Example:
 *
 * ```svelte
 * <script lang="ts">
 *     import { onMount } from 'svelte';
 *     import { browser } from '$app/environment';
 *     import { add_class_on_visible } from '$lib/util';
 *
 *     onMount(fade_in);
 *     if (browser) window.addEventListener('scroll', fade_in);
 *
 *     function fade_in() {
 * 	       add_class_on_visible(
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
export function add_class_on_visible(
	elements: HTMLCollectionOf<Element> | HTMLElement | null,
	class_name: string
) {
	if (elements instanceof HTMLCollection) {
		[...elements].forEach((e) => {
			add_class_on_visible_(e, class_name);
		});
	} else if (elements instanceof HTMLElement) {
		add_class_on_visible_(elements, class_name);
	}
}

function add_class_on_visible_(element: Element | HTMLElement, class_name: string) {
	if (element.getBoundingClientRect().top < window.innerHeight) {
		element.classList.add(class_name);
	}
}

/** Calculates the age of Rinrin. */
export function calc_age() {
	const birthday = { year: 2006, month: 4, date: 13 };
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const date = today.getDate();
	let age = year - birthday.year;
	age -= month < birthday.month || (month == birthday.month && date < birthday.date) ? 1 : 0;
	return age;
}

/** Formats the given month number to a string. */
export function fmt_month(month: number | null) {
	if (month == null) {
		return '???&nbsp;';
	} else {
		const months = [
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
		return months[month - 1];
	}
}

/** Toggles body scroll prevention. */
export function toggle_scroll_prevention(prevent: boolean) {
	document.getElementsByTagName('body')[0].style.overflow = prevent ? 'hidden' : 'auto';
}
