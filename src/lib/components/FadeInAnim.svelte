<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { addClassOnVisible } from '$lib/scripts/util';

	/** `slide-up` | `scale-up-origin-top` */
	export let type: string;

	let container: HTMLElement;

	onMount(fadeIn);
	if (browser) window.addEventListener('scroll', fadeIn);

	/** **＊ This function is intended to be used in the browser environment.** */
	function fadeIn() {
		addClassOnVisible(container, type);
	}
</script>

<div
	bind:this={container}
	class:slide-up={false}
	class:scale-up-origin-top={false}
>
	<slot />
</div>

<style lang="scss">
	:not(.slide-up, .scale-up-origin-top) {
		opacity: 0;
	}

	$ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);

	.slide-up {
		animation: slideUp 1.2s $ease-out-quart;
	}

	.scale-up-origin-top {
		animation: scaleUpOriginTop 1s $ease-out-quart;
	}

	@keyframes slideUp {
		0% {
			opacity: 0;
			transform: translateY(calc(20% + 64px));
		}
	}

	@keyframes scaleUpOriginTop {
		0% {
			opacity: 0;
			scale: 0.75;
			transform-origin: top;
		}
	}
</style>
