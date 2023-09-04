<script lang="ts">
	import Header from '$lib/components/header/header.svelte';
	import Footer from '$lib/components/footer.svelte';

	import { browser } from '$app/environment';
	import { setVh001 } from '$lib/util';
	import { COPYRIGHT, SITE_URL } from '$lib/variables';

	let maxVh1: number;

	if (browser) {
		window.addEventListener('resize', () => {
			setVh001();
			if (maxVh1 < window.innerHeight) setMaxVh001();
		});
		setVh001();
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
		logo_180px_oxipng: '/images/logos/rinrin/logo_180px_oxipng.png?v=2',
	};
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<meta name="format-detection" content="telephone=no,address=no,email=no" />

	<meta property="og:site_name" content="Rinrin.rs' Homepage" />
	<meta property="og:image" content="{SITE_URL}{HEAD.logo_180px_oxipng}" />
	<meta property="og:locale" content="ja_JP" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content={SITE_URL} />
	<meta name="theme-color" content="#d1b27f" />

	<meta name="keywords" content="Rinrin,Rinrin0413,Rinrin.rs" />
	<meta name="author" content="Rinrin.rs <rinrin0413.valley@gmail.com>" />
	<meta name="copyright" content={COPYRIGHT} />

	<link rel="icon" href={HEAD.logo_180px_oxipng} />
	<link rel="icon" href="/images/logos/rinrin/logo.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
	<link rel="manifest" href="/manifest.json" />
</svelte:head>

<Header />

<main><slot /></main>

<Footer />

<div id="bg" />

<style lang="scss" global>
	@use '/assets/stylesheets/layout';
	@use '/assets/stylesheets/style';
</style>
