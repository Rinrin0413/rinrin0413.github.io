<script lang="ts">
	/** ex: `Home` */
	export let title: string;
	/** ex: `Rinrin.rs のホームページです。` */
	export let desc: string;
	/** ex: `{SITE_URL}/profile` */
	export let canonicalUrl: string;

	$: fullTitle = 'Rinrin.rs | ' + title;
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="title" content={fullTitle} />
	<meta name="description" content={desc} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={desc} />
	<meta property="og:url" content={canonicalUrl} />

	<link rel="canonical" href={canonicalUrl} />
</svelte:head>
