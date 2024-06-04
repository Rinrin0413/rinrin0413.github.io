<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import Space from '$lib/components/Space.svelte';

	import { SITE_URL } from '$lib/scripts/variables';
	//import { _ } from 'svelte-i18n';

	const HEAD = {
		title: 'Creations',
		desc: 'Rinrin.rs の創作物',
		url: SITE_URL + '/creations'
	};
</script>

<svelte:head>
	<title>Rinrin.rs | {HEAD.title}</title>
	<meta name="title" content="Rinrin.rs | {HEAD.title}" />
	<meta name="description" content={HEAD.desc} />

	<meta property="og:title" content={HEAD.title} />
	<meta property="og:description" content={HEAD.desc} />
	<meta property="og:url" content={HEAD.url} />

	<link rel="canonical" href={HEAD.url} />
</svelte:head>

<section>
	<Space height="64px" />

	<Title text="Creations" />
	<p>Coming soon...</p>
</section>

<style lang="scss"></style>
