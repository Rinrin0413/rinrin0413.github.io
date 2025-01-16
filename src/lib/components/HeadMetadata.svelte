<script lang="ts">
	import {
		SITE_URL,
		LOGO_180PX_OXIPNG_REL_PATH,
		PAGE_FULL_TITLE_PART
	} from '$lib/scripts/variables';
	import { page } from '$app/stores';

	/** ex: `Home` */
	export let title: string;
	/** ex: `Rinrin.rs のホームページです。` */
	export let desc: string;
	/** ex: `{SITE_URL}/profile` */
	export let canonicalUrl = SITE_URL + $page.url.pathname;
	/**
	 * ex: `article`
	 *
	 * Default: `website`
	 */
	export let ogType: string = 'website';
	/**
	 * ex: `summary_large_image`
	 *
	 * Default: `summary`
	 */
	export let ogCardType: string = 'summary';
	/**
	 * Whether to set the thumbnail image.
	 *
	 * If `false`, set `<meta name="thumbnail" content=ABS_PATH />` and `<meta property="og:image" content=ABS_PATH />`.
	 *
	 * Default: `false`
	 */
	export let doesNotSetThumbnailImg = false;

	$: fullTitle = PAGE_FULL_TITLE_PART + title;
	const absThumbnailPath = SITE_URL + LOGO_180PX_OXIPNG_REL_PATH;
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="title" content={fullTitle} />
	<meta name="description" content={desc} />
	{#if !doesNotSetThumbnailImg}
		<meta name="thumbnail" content={absThumbnailPath} />
	{/if}

	<meta property="og:title" content={title} />
	<meta property="og:description" content={desc} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content={ogType} />
	<meta name="twitter:card" content={ogCardType} />
	{#if !doesNotSetThumbnailImg}
		<meta property="og:image" content={absThumbnailPath} />
	{/if}

	<link rel="canonical" href={canonicalUrl} />
</svelte:head>
