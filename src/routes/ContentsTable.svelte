<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { addClassOnVisible } from '$lib/util';

	onMount(fadeIn);
	if (browser) window.addEventListener('scroll', fadeIn);

	function fadeIn() {
		addClassOnVisible(document.getElementsByTagName('ul'), 'fade-in-up-zoom');
	}

	const ITEMS = [
		{
			id: 'activities',
			name: 'Major Activities'
		},
		{
			id: 'chronicle',
			name: 'Chronicle'
		},
		{
			id: 'contact',
			name: 'Contact / Social'
		}
	];
</script>

<ul class:fade-in-up-zoom={false}>
	{#each ITEMS as { id, name } (id)}
		<li><a href={`#${id}`}><div>{name}</div></a></li>
	{/each}
</ul>

<style lang="scss">
	@use '/assets/stylesheets/utils/fade_in_up_zoom';

	ul {
		list-style: none;
		max-width: 326px;
		padding: 0;
		margin: 24px auto;
		background-color: #fff6e58c;
		border: 4px solid #b1976c8c;
		border-radius: 4px;

		&:not(.fade-in-up-zoom) {
			opacity: 0;
		}
	}

	li {
		&:active div {
			font-size: 20px;
		}

		&:first-child div {
			border-top: none;
		}

		&:last-child div {
			border-bottom: none;
		}
	}

	a {
		color: inherit;
		transition: 0.2s;

		&:hover {
			color: #9c6113;

			div {
				background-color: #fff6e5b2;
				font-size: 24px;
			}
		}
	}

	div {
		font-size: 20px;
		font-weight: bold;
		padding: 18px 0;
		$border: 1px solid #b1976c;
		border-top: $border;
		border-bottom: $border;
		transition: 0.24s;
	}
</style>
