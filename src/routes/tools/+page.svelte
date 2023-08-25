<script lang="ts">
	import Title from '$lib/components/title.svelte';
	import Space from '$lib/components/space.svelte';

	import { site_url } from '$lib/variables';
	//import { _ } from 'svelte-i18n';

	const head = {
		title: 'Profile',
		desc: '作った かすWebツール'
	};
</script>

<svelte:head>
	<title>Rinrin.rs | {head.title}</title>
	<meta name="title" content="Rinrin.rs | {head.title}" />
	<meta name="description" content={head.desc} />

	<meta property="og:title" content={head.title} />
	<meta property="og:description" content={head.desc} />
	<meta property="og:url" content="{site_url}/tools" />
	<meta property="og:type" content="article" />
</svelte:head>

<section>
	<Space height="64px" />

	<Title text="Web Tools" />
	<p>Coming soon...</p>
</section>

<style lang="scss"></style>
