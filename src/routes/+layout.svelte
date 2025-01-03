<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { navigating } from '$app/stores';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { isDrawerMenuOpened } from '$lib/scripts/stores';
	import {
		BLOG_NAME,
		COPYRIGHT,
		SITE_NAME,
		SITE_URL,
		CONTACT_EMAIL_ADDRESS,
		LOGO_180PX_OXIPNG_REL_PATH
	} from '$lib/scripts/variables';

	// NProgress
	const PROGRESS_BAR_EXCLUDED_PATHS = ['/blog', '/tools'];
	$: {
		if ($navigating !== null && !PROGRESS_BAR_EXCLUDED_PATHS.includes($page.url.pathname))
			NProgress.start();
		else NProgress.done();
	}

	let maxVh1: number;
	let prevWidth: number;

	if (browser) {
		NProgress.start();
		window.addEventListener('resize', () => {
			setRtVh001();
			if (maxVh1 < window.innerHeight) setMaxVh001();
			closeDrawerMenu();
		});
		setRtVh001();
		setMaxVh001();
	}

	/**
	 * Sets css variable `--max-vh001`.
	 *
	 * **＊ Must be called in the browser environment.**
	 */
	function setMaxVh001() {
		maxVh1 = window.innerHeight;
		document.documentElement.style.setProperty('--max-vh001', maxVh1 * 0.01 + 'px');
	}

	/**
	 * Sets the CSS variable `--rt-vh001`.
	 *
	 * **＊ Must be called in the browser environment.**
	 */
	function setRtVh001() {
		document.documentElement.style.setProperty('--rt-vh001', window.innerHeight * 0.01 + 'px');
	}

	/**
	 * Closes the drawer menu if the window width has changed.
	 *
	 * **＊ Must be called in the browser environment.**
	 */
	function closeDrawerMenu() {
		if (prevWidth !== window.innerWidth && prevWidth !== undefined) isDrawerMenuOpened.set(false);
		prevWidth = window.innerWidth;
	}
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<meta name="format-detection" content="telephone=no,address=no,email=no" />

	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content="ja_JP" />
	<meta name="twitter:site" content={SITE_URL} />
	<meta name="theme-color" content="#d1b27f" />

	<meta name="keywords" content="Rinrin,Rinrin0413,Rinrin.rs" />
	<meta name="author" content="Rinrin.rs <{CONTACT_EMAIL_ADDRESS}>" />
	<meta name="copyright" content={COPYRIGHT} />

	<link rel="icon" href={LOGO_180PX_OXIPNG_REL_PATH} />
	<link rel="icon" href="/images/logos/rinrin/logo.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
	<link rel="manifest" href="/manifest.json" />
	<link rel="alternate" href="/feed" type="application/atom+xml" title={BLOG_NAME} />
</svelte:head>

<noscript>
	JavaScript is disabled in your browser. Some features don't work properly.
	<br /><br />
	お使いのブラウザでは JavaScript が無効になっています。 一部の機能が正常に動作しません。
</noscript>

<Header />

<main id="main-content" inert={$isDrawerMenuOpened}><slot /></main>

<Footer />

<div id="bg" />

<style lang="scss" global>
	@use '$lib/stylesheets/layout';
	@use '$lib/stylesheets/style';
</style>
