<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Space from '$lib/components/Space.svelte';
	import ShareButton from '$lib/btpc/components/ShareButton.svelte';
	import OtherInfo from './OtherInfo.svelte';
	import ChildPageComponentRenderer from '$lib/btpc/components/ChildPageComponentRenderer.svelte';
	import BackToIndexButton from '$lib/btpc/components/BackToIndexButton.svelte';

	import type { PageData } from './$types';
	import { SITE_URL, PAGE_FULL_TITLE_PART } from '$lib/scripts/variables';
	import { _ } from 'svelte-i18n';
	import { getStatusEmoji } from '$lib/btpc/scripts/projects/util';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let metadata = $derived(data.frontmatter);

	let hasThumbnailImg = $derived(metadata.thumbnailImg !== null);
	let thumbnailImgPath = $derived(hasThumbnailImg
		? '/images/projects/thumbnails/' + metadata.thumbnailImg
		: null);

	let title = $derived(metadata.title);
	let titleFull = $derived(PAGE_FULL_TITLE_PART + title);

	let absThumbnailImgPath = $derived(SITE_URL + thumbnailImgPath);
</script>

<HeadMetadata
	title="Projects - {title}"
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
		<img src={thumbnailImgPath} alt="" class="thumbnail" />
	</div>
{:else}
	<Space height="86px" />
{/if}

<div class="content" class:thumbnail-exists={hasThumbnailImg}>
	<div><h1>{metadata.title}</h1></div>
	<div>
		<span class="sub-title"
			>{$_('projects.status')}: {getStatusEmoji(metadata.status) +
				$_('projects.statuses.' + metadata.status)}</span
		>
	</div>
	<OtherInfo {metadata} />
	<ChildPageComponentRenderer component={data.component} />
	<p><ShareButton title={titleFull} expanded /></p>
	<BackToIndexButton category="projects" />
</div>

<style lang="scss">
	@use '$lib/btpc/stylesheets/tall_thumbnail.scss';
	@use '$lib/btpc/stylesheets/page_meta.scss';
</style>
