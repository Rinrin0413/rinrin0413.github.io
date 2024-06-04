<script lang="ts">
	import Space from '$lib/components/Space.svelte';
	import Title from '$lib/components/Title.svelte';
	import FeedButton from '$lib/components/FeedButton.svelte';
	import ShareButton from '$lib/components/ShareButton.svelte';
	import TagPicker from './TagPicker.svelte';
	import ArticleCard from '$lib/components/ArticleCard.svelte';

	import type { PageData } from './$types';
	import { SITE_URL } from '$lib/variables';
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import { fly } from 'svelte/transition';
	import { elasticBackOut } from '$lib/easing';
	import { expoIn, expoOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';

	export let data: PageData;

	$: canonicalUrl = SITE_URL + '/blog';

	$: pageUrl = $page.url;
	$: tags = data.tags;
	$: articles = data.articles;

	$: HEAD = {
		title: 'Blog',
		titleFull: 'Rinrin.rs | Blog',
		desc: 'Rinrin.rs のブログ(?)'
	};
</script>

<svelte:head>
	<title>{HEAD.titleFull}</title>
	<meta name="title" content={HEAD.titleFull} />
	<meta name="description" content={HEAD.desc} />

	<meta property="og:title" content={HEAD.title} />
	<meta property="og:description" content={HEAD.desc} />
	<meta property="og:url" content={canonicalUrl} />

	<link rel="canonical" href={canonicalUrl} />
</svelte:head>

<section>
	<Space height="64px" />
	<Title text="Blog" />
	<p>
		<ShareButton
			href="{SITE_URL}{pageUrl.pathname}{pageUrl.search}"
			title={HEAD.titleFull}
			notArticlePage
		/><FeedButton />
	</p>
	<TagPicker allTags={data.allTags} pickedTags={tags} />

	{#if 0 < articles.length}
		<ul>
			{#each articles as meta (meta.slug)}
				<li
					in:fly|global={{ x: -512, duration: 1000, easing: elasticBackOut }}
					out:fly|global={{ x: 256, duration: 200, easing: expoIn }}
					animate:flip={{ duration: 700, easing: expoOut }}
				>
					<ArticleCard {meta} thumbnailImgFmts={data.thumbnailImgFmts} />
				</li>
			{/each}
		</ul>
	{:else}
		<h2>{$_('blog.noMatchingArticlesFound')}</h2>
		<a href="/blog" class="clear-btn">{$_('blog.clearFilters')}</a>
	{/if}
</section>

<style lang="scss">
	@use '$lib/stylesheets/blog/blog';
</style>
