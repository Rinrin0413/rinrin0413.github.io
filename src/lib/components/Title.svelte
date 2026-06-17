<script lang="ts">
	import Space from '$lib/components/Space.svelte';

	import { browser } from '$app/environment';

	interface Props {
		text: string;
		/**
		 * Defines a unique identifier (ID) which must be unique in the whole document.
		 * Its purpose is to identify the element when linking (using a fragment identifier).
		 */
		id?: string | undefined | null;
		/**
		 * Whether the title is at a top of a page.
		 * When set to `true`, adds a 64px space above the title.
		 */
		atPageTop?: boolean;
	}

	let { text, id = null, atPageTop = false }: Props = $props();

	let vw: number | undefined = $state();
	let width: number | undefined = $state();
	let initWidth: number | undefined = $state();
	let isOverflown = $state(false);

	if (browser) {
		updateVw();

		window.addEventListener('resize', updateVw);
	}

	$effect(() => {
		if (width !== undefined && vw !== undefined) {
			if (initWidth === undefined) initWidth = width;
			isOverflown = vw <= initWidth;
		}
	});

	/** **＊ Must be called in the browser environment.** */
	function updateVw() {
		vw = window.innerWidth;
	}
</script>

<div class:mini={isOverflown}>
	{#if atPageTop}
		<Space height="64px" />
	{/if}
	<h1 {id} bind:clientWidth={width}>{text}</h1>
	<span data-content={text}></span>
	<Space height="64px" />
</div>

<style lang="scss">
	@use '$lib/stylesheets/title' as *;
</style>
