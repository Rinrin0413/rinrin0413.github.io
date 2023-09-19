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
