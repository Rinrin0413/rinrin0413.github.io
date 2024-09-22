<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { isDrawerMenuOpened } from '$lib/scripts/stores';

	const dispatch = createEventDispatcher();
</script>

<button
	on:click={() => isDrawerMenuOpened.update((prev) => !prev)}
	on:focus={() => dispatch('focus')}
>
	{#if $isDrawerMenuOpened}
		<!--
			Google Material Symbols and Icons - Close
			https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Aclose%3AFILL%400%3Bwght%40400%3BGRAD%400%3Bopsz%4048
			This icon is licensed under the Apache License Version 2.0: https://github.com/google/material-design-icons/blob/master/README.md
		-->
		<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"
			><path
				d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"
			/></svg
		>
	{:else}
		<!--
			Google Material Symbols and Icons - Menu
			https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Amenu%3AFILL%400%3Bwght%40400%3BGRAD%400%3Bopsz%4048
			This icon is licensed under the Apache License Version 2.0: https://github.com/google/material-design-icons/blob/master/README.md
		-->
		<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"
			><path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" /></svg
		>
	{/if}
	<span>{$isDrawerMenuOpened ? 'Close' : 'Menu'}</span>
</button>

<style lang="scss">
	@use '$lib/stylesheets/header/button';

	@use '$lib/stylesheets/variables/mixin' as *;

	button {
		display: none;
		margin-right: 8px;

		@include hm {
			display: inline-block;
		}

		&:active {
			transform: translateY(5px) scale(0.95);
		}
	}
</style>
