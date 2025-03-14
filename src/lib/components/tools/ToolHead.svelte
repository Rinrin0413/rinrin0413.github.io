<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Title from '$lib/components/Title.svelte';

	import type { ToolMetadata } from '$lib/btpc/scripts/types';

	export let metadata: ToolMetadata;
</script>

<HeadMetadata title={'Web Tools - ' + metadata.title} desc={metadata.desc ?? ''} ogType="article" />

<Title text={metadata.title} atPageTop />
