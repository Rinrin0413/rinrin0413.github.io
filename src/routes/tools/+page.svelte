<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Title from '$lib/components/Title.svelte';
	import Space from '$lib/components/Space.svelte';

	import { SITE_URL } from '$lib/scripts/variables';
	//import { _ } from 'svelte-i18n';
</script>

<HeadMetadata
	title="Web Tools"
	desc="作った かすWebツール"
	canonicalUrl="{SITE_URL}/tools"
/>

<section>
	<Space height="64px" />

	<Title text="Web Tools" />
	<p>Coming soon...</p>
</section>

<style lang="scss"></style>
