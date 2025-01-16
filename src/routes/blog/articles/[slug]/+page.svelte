<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Space from '$lib/components/Space.svelte';
	import ShareButton from '$lib/btpc/components/ShareButton.svelte';
	import FeedButton from '$lib/components/blog/FeedButton.svelte';
	import Article from './Article.svelte';
	import TagList from '$lib/btpc/components/tag/TagList.svelte';
	import ScrollToTop from './ScrollToTop.svelte';

	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { SITE_URL, PAGE_FULL_TITLE_PART } from '$lib/scripts/variables';
	import { parallaxStyle, idToDate } from '$lib/scripts/utils';
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

	$: title = metadata.title;
	$: titleFull = PAGE_FULL_TITLE_PART + title;

	$: absThumbnailPath = SITE_URL + thumbnailPath;
</script>

<HeadMetadata
	title="Blog - {title}"
	desc={metadata.desc ?? ''}
	ogType="article"
	ogCardType="summary_large_image"
	doesNotSetThumbnailImg
/>

<svelte:head>
	{#if hasThumbnailImg}
		<meta property="og:image" content={absThumbnailPath} />
		<meta name="thumbnail" content={absThumbnailPath} />
	{/if}
	{#if !metadata.indexed}
		<meta name="robots" content="noindex" />
	{/if}
</svelte:head>

<svelte:window bind:scrollY />

{#if hasThumbnailImg}
	<img
		src={thumbnailPath}
		alt=""
		class="back-thumbnail"
		style={parallax(0.25)}
		aria-hidden="true"
	/>

	<div class="thumbnail-wrapper" in:scale|global={introAnim()}>
		<img src={thumbnailPath} alt="" class="thumbnail" style={parallax(-0.25)} />
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
			<ShareButton href={canonicalUrl} title={titleFull} isInArticle /><FeedButton />
		</div>
	</div>
	<Article body={data.component} />
	<p><ShareButton href={canonicalUrl} title={titleFull} expanded /></p>
	<TagList tags={metadata.tags} />
	<div><a href="/blog" class="back-to-index">{$_('blog.backToIndex')}</a></div>
</div>

<ScrollToTop />

<style lang="scss">
	@use '$lib/stylesheets/blog/article_page';
</style>
