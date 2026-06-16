<script lang="ts">
	import {
		SITE_URL,
		LOGO_180PX_OXIPNG_REL_PATH,
		PAGE_FULL_TITLE_PART
	} from '$lib/scripts/variables';
	import { page } from '$app/state';

	
	
	
	
	
	
	interface Props {
		/** ex: `Home` */
		title: string;
		/** ex: `Rinrin.rs のホームページです。` */
		desc: string;
		/** ex: `{SITE_URL}/profile` */
		canonicalUrl?: any;
		/**
	 * ex: `article`
	 *
	 * Default: `website`
	 */
		ogType?: string;
		/**
	 * ex: `summary_large_image`
	 *
	 * Default: `summary`
	 */
		ogCardType?: string;
		/**
	 * Whether to set the thumbnail image.
	 *
	 * If `false`, set `<meta name="thumbnail" content=ABS_PATH />` and `<meta property="og:image" content=ABS_PATH />`.
	 *
	 * Default: `false`
	 */
		doesNotSetThumbnailImg?: boolean;
	}

	let {
		title,
		desc,
		canonicalUrl = SITE_URL + page.url.pathname,
		ogType = 'website',
		ogCardType = 'summary',
		doesNotSetThumbnailImg = false
	}: Props = $props();

	let fullTitle = $derived(PAGE_FULL_TITLE_PART + title);
	const absThumbnailImgPath = SITE_URL + LOGO_180PX_OXIPNG_REL_PATH;
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="title" content={fullTitle} />
	<meta name="description" content={desc} />
	{#if !doesNotSetThumbnailImg}
		<meta name="thumbnail" content={absThumbnailImgPath} />
	{/if}

	<meta property="og:title" content={title} />
	<meta property="og:description" content={desc} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content={ogType} />
	<meta name="twitter:card" content={ogCardType} />
	{#if !doesNotSetThumbnailImg}
		<meta property="og:image" content={absThumbnailImgPath} />
	{/if}

	<link rel="canonical" href={canonicalUrl} />
</svelte:head>
