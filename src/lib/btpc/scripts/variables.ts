import { expoOut, expoIn } from 'svelte/easing';
import { elasticBackOut } from '$lib/scripts/easing';

export const CARD_ANIM_PARAMS = {
	transition: { duration: 300 },
	animate: { duration: 700, easing: expoOut }
};

export const WIDE_CARD_ANIM_PARAMS = {
	transitionIn: { x: -512, duration: 1000, easing: elasticBackOut },
	transitionOut: { x: 256, duration: 200, easing: expoIn },
	animate: { duration: 700, easing: expoOut }
};
