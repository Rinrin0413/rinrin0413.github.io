<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Space from '$lib/components/Space.svelte';
	import ShareButton from '$lib/btpc/components/ShareButton.svelte';
	import FeedButton from '$lib/components/blog/FeedButton.svelte';
	import ChildPageComponentRenderer from '$lib/btpc/components/ChildPageComponentRenderer.svelte';
	import TagList from '$lib/btpc/components/tag/TagList.svelte';
	import BackToIndexButton from '$lib/btpc/components/BackToIndexButton.svelte';
	import ScrollToTop from './ScrollToTop.svelte';

	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { SITE_URL, PAGE_FULL_TITLE_PART } from '$lib/scripts/variables';
	import { parallaxStyle, idToDate } from '$lib/scripts/utils';
	import { cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { date as dateI18n } from 'svelte-i18n';
	import { add9h } from '$lib/btpc/scripts/utils';

	export let data: PageData;
	let metadata = data.frontmatter;
	$: metadata = data.frontmatter;

	let slug: string;
	$: {
		const paths = $page.url.pathname.split('/');
		const pathnameLength = paths.length;
		const pathnameIsEndsWithSlash = paths[pathnameLength - 1] === '';
		slug = paths[pathnameLength - (pathnameIsEndsWithSlash ? 2 : 1)];
	}

	let scrollY: number;
	$: parallax = parallaxStyle(scrollY);

	$: date = idToDate(slug);
	let datePlus9h: Date;
	$: datePlus9h = add9h(date);

	$: thumbnailImgFmt = data.thumbnailImgFmt;
	$: hasThumbnailImg = thumbnailImgFmt !== null;
	$: thumbnailImgPath = hasThumbnailImg
		? `/images/blog/thumbnails/${slug}.` + thumbnailImgFmt
		: null;

	function introAnim(index = 0) {
		return {
			duration: 700,
			delay: 100 + index * 160,
			easing: cubicOut
		};
	}

	$: title = metadata.title;
	$: titleFull = PAGE_FULL_TITLE_PART + title;

	$: absThumbnailImgPath = SITE_URL + thumbnailImgPath;
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
		<meta property="og:image" content={absThumbnailImgPath} />
		<meta name="thumbnail" content={absThumbnailImgPath} />
	{/if}
	{#if !metadata.indexed}
		<meta name="robots" content="noindex" />
	{/if}
</svelte:head>

<svelte:window bind:scrollY />

{#if hasThumbnailImg}
	<img
		src={thumbnailImgPath}
		alt=""
		class="back-thumbnail"
		style={parallax(0.25)}
		aria-hidden="true"
	/>

	<div class="thumbnail-wrapper" in:scale|global={introAnim()}>
		<img src={thumbnailImgPath} alt="" class="thumbnail" style={parallax(-0.25)} />
	</div>
{:else}
	<Space height="86px" />
{/if}

<div class="content" class:thumbnail-exists={hasThumbnailImg}>
	<div in:scale|global={introAnim(2)}>
		<h1 style={parallax(-0.19)}>{metadata.title}</h1>
	</div>
	<div in:scale|global={introAnim(3)}>
		<time datetime={datePlus9h.toISOString()} class="sub-title" style={parallax(-0.12)}
			>{$dateI18n(date, { format: 'full' })}</time
		>
	</div>
	<div in:scale|global={introAnim(4)}>
		<!--
			Logically, the dropdown menu of the sharing button should come after the thumbnail image,
			but breaking the logic for the sake of intuitiveness.
		-->
		<div style={parallax(-0.06)}>
			<ShareButton title={titleFull} isInBtpcChildPage /><FeedButton />
		</div>
	</div>
	<ChildPageComponentRenderer component={data.component} />
	<p><ShareButton title={titleFull} expanded /></p>
	<TagList tags={metadata.tags} />
	<BackToIndexButton category="blog" />
</div>

<ScrollToTop />

<style lang="scss">
	@use '$lib/btpc/stylesheets/tall_thumbnail.scss';
	@use '$lib/btpc/stylesheets/page_meta.scss';

	@use '$lib/btpc/stylesheets/tall_thumbnail.scss' as *;

	.back-thumbnail {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: $thumbnail-wrapper-height;
		object-fit: cover;
		opacity: 0.6;
		filter: blur(42px);
		user-select: none;
	}
</style>
