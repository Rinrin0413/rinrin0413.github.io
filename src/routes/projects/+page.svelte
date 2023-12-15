<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import Space from '$lib/components/Space.svelte';

	import { SITE_URL } from '$lib/variables';
	//import { _ } from 'svelte-i18n';

	const HEAD = {
		title: 'Dev. Projects',
		desc: 'Rinrin.rs の開発プロジェクト'
	};
</script>

<svelte:head>
	<title>Rinrin.rs | {HEAD.title}</title>
	<meta name="title" content="Rinrin.rs | {HEAD.title}" />
	<meta name="description" content={HEAD.desc} />

	<meta property="og:title" content={HEAD.title} />
	<meta property="og:description" content={HEAD.desc} />
	<meta property="og:url" content="{SITE_URL}/projects" />
</svelte:head>

<section>
	<Space height="64px" />

	<Title text="Dev. Projects" />
	<p>Coming soon...</p>
</section>

<style lang="scss"></style>
