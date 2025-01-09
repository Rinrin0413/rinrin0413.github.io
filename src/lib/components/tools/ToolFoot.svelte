<script lang="ts">
	import Hr from '$lib/components/Hr.svelte';
	import TagList from '$lib/btpc/components/tag/TagList.svelte';
	import ShareButton from '$lib/btpc/components/ShareButton.svelte';
	import Notes from '$lib/components/tools/Notes.svelte';
	import BackToIndexButton from '$lib/components/tools/BackToIndexButton.svelte';

	import type { ToolMetadata } from '$lib/btpc/scripts/types';
	import { SITE_URL } from '$lib/scripts/variables';
	import { page } from '$app/stores';

	export let METADATA: ToolMetadata;
</script>

<Hr />
<TagList tags={METADATA.tags} />
<ShareButton
	href={SITE_URL + $page.url.pathname}
	title={'Web Tools - ' + METADATA.title}
	expanded
/>
<Notes />
<BackToIndexButton />
