<script lang="ts">
	import Space from '$lib/components/Space.svelte';
	import ShareButton from '$lib/components/ShareButton.svelte';
	import FeedButton from '$lib/components/FeedButton.svelte';
	import Article from './Article.svelte';
	import Tags from './Tags.svelte';
	import ScrollToTop from './ScrollToTop.svelte';

	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { SITE_URL } from '$lib/scripts/variables';
	import { parallaxStyle, idToDate } from '$lib/scripts/util';
	import { _ } from 'svelte-i18n';
	import { cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { date as dateI18n } from 'svelte-i18n';

	export let data: PageData;
	let metadata = data.frontmatter;
	$: metadata = data.frontmatter;

	$: paths = $page.url.pathname.split('/');
	$: pathnameLength = paths.length;
	$: isPathnameEndsWithSlash = paths[pathnameLength - 1] === '';
	$: slug = paths[pathnameLength - (isPathnameEndsWithSlash ? 2 : 1)];

	$: canonicalUrl = SITE_URL + '/blog/articles/' + slug;

	let scrollY: number;
	$: parallax = parallaxStyle(scrollY);

	$: date = idToDate(slug);
	let datePlus9h: Date;
	$: {
		datePlus9h = new Date(date);
		datePlus9h.setHours(datePlus9h.getHours() + 9);
	}

	$: thumbnailImgFmt = data.thumbnailImgFmt;
	$: hasThumbnailImg = thumbnailImgFmt !== null;
	$: thumbnailPath = hasThumbnailImg ? `/images/blog/thumbnails/${slug}.` + thumbnailImgFmt : null;

	function introAnim(index = 0) {
		return {
			duration: 700,
			delay: 100 + index * 160,
			easing: cubicOut
		};
	}

	$: HEAD = {
		title: 'Blog - ' + metadata.title,
		titleFull: 'Rinrin.rs | Blog - ' + metadata.title,
		desc: metadata.desc
	};
	$: absThumbnailPath = SITE_URL + thumbnailPath;
</script>

<svelte:head>
	<title>{HEAD.titleFull}</title>
	<meta name="title" content={HEAD.titleFull} />
	<meta name="description" content={HEAD.desc} />

	<meta property="og:title" content={HEAD.title} />
	<meta property="og:description" content={HEAD.desc} />
	<meta property="og:url" content={canonicalUrl} />
	{#if hasThumbnailImg}
		<meta property="og:image" content={absThumbnailPath} />
		<meta name="thumbnail" content={absThumbnailPath} />
	{/if}

	{#if !metadata.indexed}
		<meta name="robots" content="noindex" />
	{/if}

	<link rel="canonical" href={canonicalUrl} />
</svelte:head>

<svelte:window bind:scrollY />

{#if hasThumbnailImg}
	<img
		src={thumbnailPath}
		alt={$_('w.backImage')}
		class="back-thumbnail"
		style={parallax(0.25)}
		aria-hidden="true"
	/>

	<div class="thumbnail-wrapper" in:scale|global={introAnim()}>
		<img
			src={thumbnailPath}
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
		<time datetime={datePlus9h.toISOString()} style={parallax(-0.12)}
			>{$dateI18n(date, { format: 'full' })}</time
		>
	</div>
	<div in:scale|global={introAnim(4)}>
		<!-- 
			Logically, the dropdown menu of the sharing button should come after the thumbnail image,
			but breaking the logic for the sake of intuitiveness.
		-->
		<div style={parallax(-0.06)}>
			<ShareButton href={canonicalUrl} title={HEAD.titleFull} /><FeedButton />
		</div>
	</div>
	<Article body={data.component} />
	<p><ShareButton href={canonicalUrl} title={HEAD.titleFull} expanded /></p>
	<Tags tags={metadata.tags} />
	<div><a href="/blog" class="back-to-index">{$_('article.backToIndex')}</a></div>
</div>

<ScrollToTop />

<style lang="scss">
	@use '$lib/stylesheets/blog/article_page';
</style>
