<script lang="ts">
	import Title from '$lib/components/Title.svelte';

	import { _ } from 'svelte-i18n';

	const HEAD = {
		title: '404 - Page not found'
	};
</script>

<svelte:head>
	<title>Rinrin.rs | {HEAD.title}</title>
	<meta name="title" content="Rinrin.rs | {HEAD.title}" />
</svelte:head>

<h1>404</h1>
<Title text="Page not found" />
<p>{@html $_('error.pageNotFound')}</p>

<img src="/images/404.webp" alt="404 Not like this" />

<style lang="scss">
	h1 {
		font-family: 'Source Code Pro', monospace;
		font-size: 5rem;
		font-weight: 100;
		text-align: center;
		margin: 0;
	}

	img {
		display: block;
		margin: 0 auto;
		width: 100%;
		max-width: 640px;

		&:hover {
			filter: invert(1);
		}
	}
</style>
