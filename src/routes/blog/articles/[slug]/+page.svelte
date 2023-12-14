<script lang="ts">
	import Space from '$lib/components/Space.svelte';
	import ShareButton from '$lib/components/ShareButton.svelte';
	import FeedButton from '$lib/components/FeedButton.svelte';
	import Article from './Article.svelte';
	import Tags from './Tags.svelte';
	import ScrollToTop from './ScrollToTop.svelte';

	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { SITE_URL } from '$lib/variables';
	import { parallaxStyle, idToDate } from '$lib/util';
	import { _ } from 'svelte-i18n';
	import { cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { date as date_i18n } from 'svelte-i18n';

	export let data: PageData;
	let metadata = data.frontmatter;
	$: metadata = data.frontmatter;
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	$: slug = $page.url.pathname.split('/').pop()!;

	let scrollY: number;
	let parallax = parallaxStyle(0);
	$: parallax = parallaxStyle(scrollY);

	$: date = idToDate(slug);

	$: thumbnailImgFmt = data.thumbnailImgFmt;
	$: hasThumbnailImg = thumbnailImgFmt !== null;
	$: thumbnail_path = hasThumbnailImg
		? `/images/blog/thumbnails/${slug}.` + thumbnailImgFmt
		: null;

	function introAnim(index = 0) {
		return {
			duration: 700,
			delay: 100 + index * 160,
			easing: cubicOut
		};
	}

	const HEAD = {
		title: 'Blog - ' + metadata.title,
		desc: metadata.desc
	};
</script>

<svelte:head>
	<title>Rinrin.rs | {HEAD.title}</title>
	<meta name="title" content="Rinrin.rs | {HEAD.title}" />
	<meta name="description" content={HEAD.desc} />

	<meta property="og:title" content={HEAD.title} />
	<meta property="og:description" content={HEAD.desc} />
	<meta property="og:url" content="{SITE_URL}/blog/articles/{slug}" />
	{#if hasThumbnailImg}
		<meta property="og:image" content="{SITE_URL}{thumbnail_path}" />
	{/if}

	{#if !metadata.indexed}
		<meta name="robots" content="noindex" />
	{/if}
</svelte:head>

<svelte:window bind:scrollY />

{#if hasThumbnailImg}
	<img
		src={thumbnail_path}
		alt={$_('w.backImage')}
		class="back-thumbnail"
		style={parallax(0.25)}
		aria-hidden="true"
	/>

	<div class="thumbnail-wrapper" in:scale|global={introAnim()}>
		<img
			src={thumbnail_path}
			alt={$_('w.articleThumbnailImage')}
			class="thumbnail"
			style={parallax(-0.25)}
		/>
	</div>
{:else}
	<Space height="86px" />
{/if}

<div class="article-content" class:thumbnail-exists={hasThumbnailImg}>
	<div in:scale|global={introAnim(2)}>
		<h1 style={parallax(-0.19)}>{metadata.title}</h1>
	</div>
	<div in:scale|global={introAnim(3)}>
		<time datetime={date.toISOString()} style={parallax(-0.12)}
			>{$date_i18n(date, { format: 'full' })}</time
		>
	</div>
	<div in:scale|global={introAnim(4)}>
		<!-- 
			Logically, the dropdown menu of the sharing button should come after the thumbnail image,
			but breaking the logic for the sake of intuitiveness.
		-->
		<div style={parallax(-0.06)}>
			<ShareButton /><FeedButton />
		</div>
	</div>
	<Article body={data.component} />
	<p><ShareButton expanded /></p>
	<Tags tags={metadata.tags} />
	<div><a href="/blog" class="back-to-index">{$_('article.backToIndex')}</a></div>
</div>

<ScrollToTop />

<style lang="scss">
	@use '/assets/stylesheets/blog/article-page';
</style>
