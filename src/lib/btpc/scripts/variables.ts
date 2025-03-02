import { expoOut } from 'svelte/easing';

export const CARD_ANIM_PARAMS = {
	transition: { duration: 300 },
	animate: { duration: 700, easing: expoOut }
};
