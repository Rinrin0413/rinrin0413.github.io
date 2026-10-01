import type { ToastOptions } from 'svelte-french-toast';

/** Copyright notice. */
export const COPYRIGHT = '© 2020 - 2026 Rinrin.rs | GPL-3.0';

/** URL of the site. */
export const SITE_URL = 'https://rinrin.pages.dev';

/** Name of the website. */
export const SITE_NAME = "Rinrin.rs' Website";

/** Name of the blog. */
export const BLOG_NAME = "Rinrin.rs' Blog";

/** Rinrin.rs' contact email address. */
export const CONTACT_EMAIL_ADDRESS = 'rinrin0413.rs@gmail.com';

/** The relative path of `logo_180px_oxipng.png`. */
export const LOGO_180PX_OXIPNG_REL_PATH = '/images/logos/rinrin/logo_180px_oxipng.png?v=2';

/**
 * The part of the full title of the pages.
 *
 * Usage:
 *
 * ```ts
 * import { PAGE_FULL_TITLE_PART } from '$lib/scripts/variables';
 * const FULL_TITLE = PAGE_FULL_TITLE_PART + 'Home';
 * ```
 */
export const PAGE_FULL_TITLE_PART = 'Rinrin.rs | ';

export const TOAST_OPTIONS: ToastOptions = {
	position: 'bottom-right',
	style: [
		'text-align: left;',
		'background-color: #ffffffb0;',
		'color: inherit;',
		'border: 1px solid #ffffff;',
		'border-radius: 4px;'
	].join(' ')
};

/** The GitHub Gist ID used for the `/now` page. */
export const GIST_ID_FOR_NOW_PAGE = '7df9e07751fdf33716031eeff70fab7e';

/** The GitHub Gist viewing URL used for the `/now` page. */
export const GIST_URL_FOR_NOW_PAGE = 'https://gist.github.com/' + GIST_ID_FOR_NOW_PAGE;

/** The GitHub Gist API URL used to fetch the `/now` content. */
export const GIST_API_URL_FOR_NOW_PAGE = 'https://api.github.com/gists/' + GIST_ID_FOR_NOW_PAGE;
