<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Title from '$lib/components/Title.svelte';
	import Space from '$lib/components/Space.svelte';

	import { SITE_URL } from '$lib/scripts/variables';
	//import { _ } from 'svelte-i18n';
</script>

<HeadMetadata
	title="Creations"
	desc="Rinrin.rs の創作物"
	canonicalUrl="{SITE_URL}/creations"
/>

<section>
	<Space height="64px" />

	<Title text="Creations" />
	<p>Coming soon...</p>
</section>

<style lang="scss"></style>
