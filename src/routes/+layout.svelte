<script lang="ts">
	import Header from '$lib/components/header/header.svelte';
	import Footer from '$lib/components/footer.svelte';

	import { copyright, site_url } from '$lib/variables';
	import { browser } from '$app/environment';

	let max_vh1: number;

	if (browser) {
		window.addEventListener('resize', () => {
			set_vh001();
			if (max_vh1 < window.innerHeight) set_max_vh001();
		});
		set_vh001();
		set_max_vh001();
	}

	/**
	 * Sets css variable `--vh001`.
	 * Must be called in the browser.
	 */
	function set_vh001() {
		document.documentElement.style.setProperty('--vh001', window.innerHeight * 0.01 + 'px');
	}

	/**
	 * Sets css variable `--max-vh001`.
	 * Must be called in the browser.
	 */
	function set_max_vh001() {
		max_vh1 = window.innerHeight;
		document.documentElement.style.setProperty('--max-vh001', max_vh1 * 0.01 + 'px');
	}
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<meta name="format-detection" content="telephone=no,address=no,email=no" />

	<meta property="og:site_name" content="Rinrin.rs' Homepage" />
	<meta property="og:image" content="{site_url}/images/favicon.png" />
	<meta property="og:locale" content="ja_JP" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content={site_url} />
	<meta name="theme-color" content="#d1b27f" />

	<meta name="keywords" content="Rinrin,Rinrin0413,Rinrin.rs" />
	<meta name="author" content="Rinrin.rs <rinrin0413.valley@gmail.com>" />
	<meta name="copyright" content={copyright} />
	<link rel="icon" href="/images/favicon.png" />
</svelte:head>

<Header />

<main><slot /></main>

<Footer />

<div id="bg" />

<style lang="scss" global>
	@use '/assets/stylesheets/layout';
	@use '/assets/stylesheets/style';
</style>
