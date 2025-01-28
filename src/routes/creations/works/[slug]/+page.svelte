<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Space from '$lib/components/Space.svelte';
	import ShareButton from '$lib/btpc/components/ShareButton.svelte';
	import OtherInfo from './OtherInfo.svelte';
	import ChildPageComponentRenderer from '$lib/btpc/components/ChildPageComponentRenderer.svelte';
	import License from './License.svelte';

	import type { PageData } from './$types';
	import { SITE_URL, PAGE_FULL_TITLE_PART } from '$lib/scripts/variables';
	import { _ } from 'svelte-i18n';
	import { date as dateI18n } from 'svelte-i18n';

	export let data: PageData;
	let metadata = data.frontmatter;
	$: metadata = data.frontmatter;

	$: date = metadata.date === null ? null : new Date(metadata.date);
	let datePlus9h: Date | null;
	$: {
		datePlus9h = date === null ? null : new Date(date);
		if (datePlus9h !== null) datePlus9h.setHours(datePlus9h.getHours() + 9);
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
	{#if date !== null && datePlus9h !== null}
		<div>
			<time datetime={datePlus9h.toISOString()}>{$dateI18n(date, { format: 'full' })}</time>
		</div>
	{:else}
		<div><time>{$_('creations.dateUnknown')}</time></div>
	{/if}
	<OtherInfo {metadata} />
	<ChildPageComponentRenderer component={data.component} />
	<p><ShareButton title={titleFull} expanded /></p>
	<License license={metadata.license} />
	<div><a href="/creations" class="back-to-index">{$_('creations.backToIndex')}</a></div>
</div>

<style lang="scss">
	@use '$lib/stylesheets/creations/artwork_page.scss';
</style>
