<script lang="ts">
	import Article from './Article.svelte';

	import type { PageData } from './$types';
	import { SITE_URL } from '$lib/variables';

	export let data: PageData;
	const metadata = data.frontmatter;

	const HEAD = {
		title: 'Blog - ' + metadata.title,
		desc: metadata.desc,
		thumbnail_path: `/images/blog/${metadata.slug}.png`
	};
</script>

<svelte:head>
	<title>Rinrin.rs | {HEAD.title}</title>
	<meta name="title" content="Rinrin.rs | {HEAD.title}" />
	<meta name="description" content={HEAD.desc} />

	<meta property="og:title" content={HEAD.title} />
	<meta property="og:description" content={HEAD.desc} />
	<meta property="og:url" content="{SITE_URL}/blog/articles/{metadata.slug}" />
	<meta property="og:image" content="{SITE_URL}{HEAD.thumbnail_path}" />
	<meta property="og:type" content="article" />
</svelte:head>

<Article body={data.component} />