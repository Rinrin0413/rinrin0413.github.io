<script lang="ts">
	import { run } from 'svelte/legacy';

	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Space from '$lib/components/Space.svelte';
	import ShareButton from '$lib/btpc/components/ShareButton.svelte';
	import OtherInfo from './OtherInfo.svelte';
	import ChildPageComponentRenderer from '$lib/btpc/components/ChildPageComponentRenderer.svelte';
	import License from './License.svelte';
	import BackToIndexButton from '$lib/btpc/components/BackToIndexButton.svelte';

	import type { PageData } from './$types';
	import { SITE_URL, PAGE_FULL_TITLE_PART } from '$lib/scripts/variables';
	import { _ } from 'svelte-i18n';
	import { date as dateI18n } from 'svelte-i18n';
	import { add9h } from '$lib/btpc/scripts/utils';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let metadata = $state(data.frontmatter);
	run(() => {
		metadata = data.frontmatter;
	});

	let date = $derived(metadata.date === null ? null : new Date(metadata.date));
	let datePlus9h: Date | null = $derived(date === null ? null : add9h(date));
	

	let hasThumbnailImg = $derived(metadata.thumbnailImg !== null);
	let thumbnailImgPath = $derived(hasThumbnailImg
		? '/images/creations/thumbnails/' + metadata.thumbnailImg
		: null);

	let title = $derived(metadata.title);
	let titleFull = $derived(PAGE_FULL_TITLE_PART + title);

	let absThumbnailImgPath = $derived(SITE_URL + thumbnailImgPath);
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
		<img
			src={thumbnailImgPath}
			alt=""
			class="thumbnail"
			class:pixelated={metadata.tags.includes('ドット絵')}
		/>
	</div>
{:else}
	<Space height="86px" />
{/if}

<div class="artwork-content">
	<div><h1>{metadata.title}</h1></div>
	<div>
		{#if date !== null && datePlus9h !== null}
			<time datetime={datePlus9h.toISOString()} class="sub-title"
				>{$dateI18n(date, { format: 'full' })}</time
			>
		{:else}
			<span class="sub-title">{$_('creations.dateUnknown')}</span>
		{/if}
	</div>
	<OtherInfo {metadata} />
	<ChildPageComponentRenderer component={data.component} />
	<p><ShareButton title={titleFull} expanded /></p>
	<License license={metadata.license} />
	<BackToIndexButton category="creations" />
</div>

<style lang="scss">
	@use '$lib/stylesheets/creations/artwork_page.scss';
	@use '$lib/btpc/stylesheets/page_meta.scss';
</style>
