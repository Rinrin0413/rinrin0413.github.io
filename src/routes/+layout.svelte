<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { navigating } from '$app/stores';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { BLOG_NAME, COPYRIGHT, SITE_NAME, SITE_URL, CONTACT_EMAIL_ADDRESS } from '$lib/variables';

	$: {
		if ($navigating !== null && $page.url.pathname != '/blog') NProgress.start();
		else NProgress.done();
	}

	let maxVh1: number;

	if (browser) {
		NProgress.start();
		window.addEventListener('resize', () => {
			if (maxVh1 < window.innerHeight) setMaxVh001();
		});
		setMaxVh001();
	}

	/**
	 * Sets css variable `--max-vh001`.
	 * Must be called in the browser.
	 */
	function setMaxVh001() {
		maxVh1 = window.innerHeight;
		document.documentElement.style.setProperty('--max-vh001', maxVh1 * 0.01 + 'px');
	}

	const HEAD = {
		logo_180px_oxipng: '/images/logos/rinrin/logo_180px_oxipng.png?v=2'
	};
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<meta name="format-detection" content="telephone=no,address=no,email=no" />

	<meta property="og:site_name" content={SITE_NAME} />
	{#if $page.url.pathname.startsWith('/blog/articles/')}
		<meta property="og:type" content="article" />
		<meta name="twitter:card" content="summary_large_image" />
	{:else}
		<meta property="og:type" content="website" />
		<meta property="og:image" content="{SITE_URL}{HEAD.logo_180px_oxipng}" />
		<meta name="twitter:card" content="summary" />
	{/if}
	<meta property="og:locale" content="ja_JP" />
	<meta name="twitter:site" content={SITE_URL} />
	<meta name="theme-color" content="#d1b27f" />

	<meta name="keywords" content="Rinrin,Rinrin0413,Rinrin.rs" />
	<meta name="author" content="Rinrin.rs <{CONTACT_EMAIL_ADDRESS}>" />
	<meta name="copyright" content={COPYRIGHT} />

	<link rel="icon" href={HEAD.logo_180px_oxipng} />
	<link rel="icon" href="/images/logos/rinrin/logo.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
	<link rel="manifest" href="/manifest.json" />
	<link rel="alternate" href="/feed" type="application/atom+xml" title={BLOG_NAME} />
</svelte:head>

<Header />

<main><slot /></main>

<Footer />

<div id="bg" />

<style lang="scss" global>
	@use '/assets/stylesheets/layout';
	@use '/assets/stylesheets/style';
</style>
