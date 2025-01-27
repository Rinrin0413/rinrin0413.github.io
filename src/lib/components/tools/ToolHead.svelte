<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Title from '$lib/components/Title.svelte';

	import type { ToolMetadata } from '$lib/btpc/scripts/types';

	export let METADATA: ToolMetadata;
</script>

<HeadMetadata title={'Web Tools - ' + METADATA.title} desc={METADATA.desc ?? ''} ogType="article" />

<Title text={METADATA.title} atPageTop />
