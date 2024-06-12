<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Title from '$lib/components/Title.svelte';
	import Space from '$lib/components/Space.svelte';

	import { SITE_URL } from '$lib/scripts/variables';
	//import { _ } from 'svelte-i18n';
</script>

<HeadMetadata
	title="Dev. Projects"
	desc="Rinrin.rs の開発プロジェクト"
	canonicalUrl="{SITE_URL}/projects"
/>

<section>
	<Space height="64px" />

	<Title text="Dev. Projects" />
	<p>Coming soon...</p>
</section>

<style lang="scss"></style>
