<script lang="ts">
	import Space from '$lib/components/Space.svelte';

	import { browser } from '$app/environment';

	export let text: string;

	/**
	 * Defines a unique identifier (ID) which must be unique in the whole document.
	 * Its purpose is to identify the element when linking (using a fragment identifier).
	 */
	export let id: string | undefined | null = null;

	/**
	 * Whether the title is at a top of a page.
	 * When set to `true`, adds a 64px space above the title.
	 */
	export let atPageTop: boolean = false;

	let vw: number;
	let width: number;
	let initWidth: number;
	let isOverflown = false;

	if (browser) {
		updateVw();

		window.addEventListener('resize', updateVw);
	}

	$: if (width !== undefined) {
		if (initWidth === undefined) initWidth = width;
		isOverflown = vw <= initWidth;
	}

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
	<span data-content={text} />
	<Space height="64px" />
</div>

<style lang="scss">
	@use '$lib/stylesheets/title' as *;
</style>
