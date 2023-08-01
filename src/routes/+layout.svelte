<script lang="ts">
	import { copyright, site_url } from '$lib/variables';

	import Header from '$lib/components/header/header.svelte';
	import Footer from '$lib/components/footer.svelte';
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
