<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	/** `slide-up` | `slide-left` | `scale-up-origin-top` */
	export let type: string;

	/** The delay in milliseconds before the animation starts. */
	export let delay = 0;

	/** Whether to play the animation even if the element is only a little in the viewport. */
	export let evenLittleBit = false;

	/** Whether to play the animation forcibly now. */
	export let playForced = false;

	let container: HTMLElement;
	let observer: IntersectionObserver;

	onMount(() => {
		if (browser) {
			observer = new IntersectionObserver(handleIntersect, {
				threshold: evenLittleBit ? 0 : 0.25
			});
			observer.observe(container);
		}
	});

	onDestroy(() => {
		if (observer !== undefined) observer.disconnect();
	});

	$: if (playForced && container !== undefined) container.classList.add(type);

	function handleIntersect(entries: IntersectionObserverEntry[]) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const target = entry.target;
				setTimeout(() => {
					target.classList.add(type);
				}, delay);
				observer.unobserve(target);
			}
		});
	}
</script>

<div
	bind:this={container}
	class:slide-up={false}
	class:slide-left={false}
	class:scale-up-origin-top={false}
>
	<slot />
</div>

<style lang="scss">
	@media (scripting: enabled) {
		:not(.slide-up, .slide-left, .scale-up-origin-top) {
			opacity: 0;
		}
	}

	$ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
	$ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);

	.slide-up {
		animation: slideUp 1.2s $ease-out-quart;
	}

	.slide-left {
		animation: slideLeft 1.5s $ease-out-expo;
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

	@keyframes slideLeft {
		0% {
			opacity: 0;
			transform: translateX(30%);
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
