<script lang="ts">
	import Title from '$lib/components/title.svelte';
	import Space from '$lib/components/space.svelte';

	import { SITE_URL } from '$lib/variables';
	//import { _ } from 'svelte-i18n';

	const HEAD = {
		title: 'Profile',
		desc: 'Rinrin.rs のプロフィール'
	};
</script>

<svelte:head>
	<title>Rinrin.rs | {HEAD.title}</title>
	<meta name="title" content="Rinrin.rs | {HEAD.title}" />
	<meta name="description" content={HEAD.desc} />

	<meta property="og:title" content={HEAD.title} />
	<meta property="og:description" content={HEAD.desc} />
	<meta property="og:url" content="{SITE_URL}/profile" />
	<meta property="og:type" content="article" />
</svelte:head>

<section>
	<Space height="64px" />

	<Title text="My Profile" />
	<p>Coming soon...</p>
</section>

<style lang="scss"></style>
