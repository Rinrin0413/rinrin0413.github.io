import { browser } from '$app/environment';
import { locale, waitLocale } from 'svelte-i18n';
import '$lib/i18n';

export async function load() {
	if (browser) {
		locale.set(window.navigator.language);
	}
	await waitLocale();
}
