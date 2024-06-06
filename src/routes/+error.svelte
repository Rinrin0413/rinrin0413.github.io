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
<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<p>{@html $_('error.pageNotFound')}</p>

<img src="/images/404.webp" alt="404 Not like this" />

<style lang="scss">
	@use '$lib/stylesheets/variables/mixin' as *;

	h1 {
		@include source-code-pro;
		font-size: 5rem;
		text-align: center;
		margin: 0;
	}

	p {
		@include kaisei-decol;
		font-size: 18px;

		@include sp {
			font-size: 16px;
		}
	}

	img {
		display: block;
		margin: 32px auto;
		width: 100%;
		max-width: 640px;

		&:hover {
			filter: invert(1);
		}
	}
</style>
