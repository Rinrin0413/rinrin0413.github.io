<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Space from '$lib/components/Space.svelte';
	import Title from '$lib/components/Title.svelte';

	import type { ToolMetadata } from '$lib/btpc/scripts/types';
	import { SITE_URL } from '$lib/scripts/variables';
	import { page } from '$app/stores';

	export let METADATA: ToolMetadata;
</script>

<HeadMetadata
	title={'Web Tools - ' + METADATA.title}
	desc={METADATA.desc ?? ''}
	canonicalUrl={SITE_URL + $page.url.pathname}
	ogType="article"
/>

<Space height="64px" />
<Title text={METADATA.title} />
