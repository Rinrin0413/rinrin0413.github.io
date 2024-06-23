import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { toggleScrollPrevention } from '$lib/scripts/utils';

export const isDrawerMenuOpened = writable(false);
isDrawerMenuOpened.subscribe((value) => {
	if (browser) toggleScrollPrevention(value);
});
