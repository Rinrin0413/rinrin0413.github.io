<script lang="ts">
	import Space from '$lib/components/Space.svelte';

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
	let isOverflown = $derived(width !== undefined && vw !== undefined && vw <= width);
</script>

<svelte:window bind:innerWidth={vw} />

<div class:mini={isOverflown}>
	<!-- Measure at the normal size so shrinking cannot change the overflow threshold. -->
	<div class="measurement" aria-hidden="true">
		<h1 bind:clientWidth={width}>{text}</h1>
	</div>
	{#if atPageTop}
		<Space height="64px" />
	{/if}
	<h1 {id}>{text}</h1>
	<span data-content={text} aria-hidden="true"></span>
	<Space height="64px" />
</div>

<style lang="scss">
	@use '$lib/stylesheets/title' as *;
</style>
