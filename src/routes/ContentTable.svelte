<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { addClassOnVisible } from '$lib/util';

	onMount(fadeIn);
	if (browser) window.addEventListener('scroll', fadeIn);

	function fadeIn() {
		addClassOnVisible(document.querySelector('#toc'), 'fade-in-up-zoom');
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
			id: 'blog',
			name: 'Blog Articles'
		},
		{
			id: 'contact',
			name: 'Contact / Social'
		}
	];
</script>

<ul id="toc" class:fade-in-up-zoom={false}>
	{#each ITEMS as { id, name } (id)}
		<li><a href="#{id}"><div>{name}</div></a></li>
	{/each}
</ul>

<style lang="scss">
	@use '/assets/stylesheets/utils/fade_in_up_zoom';
	@use '/assets/stylesheets/variables/mixin' as *;

	ul {
		list-style: none;
		max-width: 326px;
		padding: 0;
		margin: 24px auto;
		@include glassmorphism($blur: 10px, $border-radius: 8px);

		&:not(.fade-in-up-zoom) {
			opacity: 0;
		}
	}

	li {
		transition: 0.13s;

		&:last-child {
			div {
				border: none;
			}
		}

		&:hover {
			background-color: #ffffff5a;
			$saturate: saturate(2);
			backdrop-filter: $saturate;
			-webkit-backdrop-filter: $saturate;
		}
	}

	a {
		color: inherit;
	}

	div {
		width: 93%;
		padding: 16px 0;
		margin: 0 auto;
		font-size: 20px;
		$border: 1px solid #ffffffa0;
		border-bottom: $border;
	}
</style>
