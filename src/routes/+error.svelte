<script lang="ts">
	import Title from '$lib/components/Title.svelte';

	import { page } from '$app/stores';
	import { PAGE_FULL_TITLE_PART } from '$lib/scripts/variables';
	import { _ } from 'svelte-i18n';

	$: status = $page.status;
	$: is404 = status === 404;
	$: err = $page.error;
	$: msg = is404 ? 'Page not found' : err !== null ? err.message : 'Something went wrong';

	$: title = `${PAGE_FULL_TITLE_PART}${status} - ${msg}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="robots" content="noindex" />
</svelte:head>

<h1>{status}</h1>
{#if is404}
	<Title text="Page not found" />
	<p>
		{$_('error.pageNotFound.0')}<br />
		{$_('error.pageNotFound.1')}
	</p>
	<img src="/images/404.webp" alt="" class="e404" />
{:else}
	<Title text="Unexpected error" />
	<p>{msg}</p>
	<img src="https://http.cat/{status}.jpg" alt="" loading="lazy" />
{/if}

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

		&.e404:hover {
			filter: invert(1);
		}
	}
</style>
