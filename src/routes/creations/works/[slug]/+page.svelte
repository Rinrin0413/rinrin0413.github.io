<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Space from '$lib/components/Space.svelte';
	import ShareButton from '$lib/btpc/components/ShareButton.svelte';
	import OtherInfo from './OtherInfo.svelte';
	import ChildPageComponentRenderer from '$lib/btpc/components/ChildPageComponentRenderer.svelte';

	import type { PageData } from './$types';
	import { SITE_URL, PAGE_FULL_TITLE_PART } from '$lib/scripts/variables';
	import { _ } from 'svelte-i18n';
	import { date as dateI18n } from 'svelte-i18n';

	export let data: PageData;
	let metadata = data.frontmatter;
	$: metadata = data.frontmatter;

	$: date = new Date(metadata.date);
	let datePlus9h: Date;
	$: {
		datePlus9h = new Date(date);
		datePlus9h.setHours(datePlus9h.getHours() + 9);
	}

	$: hasThumbnailImg = metadata.thumbnailImg !== null;
	$: thumbnailPath = hasThumbnailImg
		? '/images/creations/thumbnails/' + metadata.thumbnailImg
		: null;

	$: title = metadata.title;
	$: titleFull = PAGE_FULL_TITLE_PART + title;

	$: absThumbnailImgPath = SITE_URL + thumbnailPath;
</script>

<HeadMetadata
	title="Creations - {title}"
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
</svelte:head>

{#if hasThumbnailImg}
	<div class="thumbnail-wrapper">
		<img src={thumbnailPath} alt="" class="thumbnail" />
	</div>
{:else}
	<Space height="86px" />
{/if}

<div class="artwork-content">
	<div><h1>{metadata.title}</h1></div>
	<div><time datetime={datePlus9h.toISOString()}>{$dateI18n(date, { format: 'full' })}</time></div>
	<ShareButton title={titleFull} isInBtpcChildPage />
	<OtherInfo {metadata} />
	<ChildPageComponentRenderer component={data.component} />
	<p><ShareButton title={titleFull} expanded /></p>
	<div><a href="/creations" class="back-to-index">{$_('creations.backToIndex')}</a></div>
</div>

<style lang="scss">
	@use '$lib/stylesheets/variables/dimension' as *;
	@use '$lib/stylesheets/variables/mixin' as *;

	$thumbnail-img-height: calc($max-vh001 * 65);

	.thumbnail-wrapper {
		width: 100%;
		height: $thumbnail-img-height;
		position: relative;
		display: flex;
		margin-bottom: 16px;
		justify-content: center;
		align-items: center;
	}

	.thumbnail {
		position: relative;
		width: min(95vw, calc($max-vh001 * 95));
		height: $thumbnail-img-height;
		object-fit: contain;
	}

	$text-color-meta: #fffbee;

	h1 {
		@include kaisei-decol;
		display: inline-block;
		max-width: 90%;
		padding: 6px 18px;
		margin: 0 auto;
		font-size: 30px;
		color: $text-color-meta;
		background-color: #0000005a;
		border-bottom: 7px solid #0000003a;
		border-radius: 3px;
		$blur: blur(20px);
		backdrop-filter: $blur;
		-webkit-backdrop-filter: $blur;

		@include sp {
			font-size: 24px;
		}
	}

	time {
		display: inline-block;
		padding: 3px 18px;
		margin: 0 auto;
		margin-top: 16px;
		margin-bottom: 13px;
		color: $text-color-meta;
		font-size: 16px;
		background-color: #0000008a;
		border-radius: 1px;
		$border-light: 2px solid #ffffff30;
		$border-dark: 2px solid #00000017;
		border-top: $border-light;
		border-left: $border-light;
		border-bottom: $border-dark;
		border-right: $border-dark;
	}

	.back-to-index {
		display: inline-block;
		font-size: 18px;
		margin: 32px 0;
	}
</style>
