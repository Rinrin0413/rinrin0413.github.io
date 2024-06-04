<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { addClassOnVisible } from '$lib/scripts/util';

	let container: HTMLElement;

	onMount(fadeIn);
	if (browser) window.addEventListener('scroll', fadeIn);

	/** **＊ This function is intended to be used in the browser environment.** */
	function fadeIn() {
		addClassOnVisible(container, 'fade-in');
	}
</script>

<div class:fade-in={false} bind:this={container}>
	<slot />
</div>

<style lang="scss">
	:not(.fade-in) {
		opacity: 0;
	}

	.fade-in {
		animation: fadeInUp 1.2s ease-out;
	}

	@keyframes fadeInUp {
		0% {
			opacity: 0;
			transform: translateY(calc(20% + 64px));
		}
	}
</style>
