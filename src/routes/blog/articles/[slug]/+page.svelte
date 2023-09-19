<script lang="ts">
	import Article from './Article.svelte';

	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { SITE_URL } from '$lib/variables';

	export let data: PageData;
	const metadata = data.frontmatter;
	const slug = $page.url.pathname.split('/').pop();

	const HEAD = {
		title: 'Blog - ' + metadata.title,
		desc: metadata.desc,
		thumbnail_path: `/images/blog/${slug}.png`
	};
</script>

<svelte:head>
	<title>Rinrin.rs | {HEAD.title}</title>
	<meta name="title" content="Rinrin.rs | {HEAD.title}" />
	<meta name="description" content={HEAD.desc} />

	<meta property="og:title" content={HEAD.title} />
	<meta property="og:description" content={HEAD.desc} />
	<meta property="og:url" content="{SITE_URL}/blog/articles/{slug}" />
	<meta property="og:image" content="{SITE_URL}{HEAD.thumbnail_path}" />
	<meta property="og:type" content="article" />
</svelte:head>

<img src="/images/blog/{slug}.png" alt="Article thumbnail" id="back-thumbnail" aria-hidden="true" />

<div id="thumbnail-wrapper">
	<img src="/images/blog/{slug}.png" alt="Article thumbnail" id="thumbnail" />
</div>

<Article body={data.component} />

<style lang="scss">
	@use '/assets/stylesheets/variables/dimension' as *;

	$back-thumbnail-height: 70vh;

	#back-thumbnail {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: $back-thumbnail-height;
		object-fit: cover;
		opacity: 0.6;
		filter: blur(4px);
	}

	#thumbnail-wrapper {
		width: 100vw;
		height: $back-thumbnail-height;
		position: relative;
		bottom: $header-height * 1.3;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#thumbnail {
		position: relative;
		width: 95vmin;
		height: 427px;
		object-fit: contain;
		filter: drop-shadow(0 0 14px #00000080);
	}
</style>
