<script lang="ts">
	import Hr from '$lib/components/Hr.svelte';
	import TagList from '$lib/btpc/components/tag/TagList.svelte';
	import ShareButton from '$lib/btpc/components/ShareButton.svelte';
	import Notes from '$lib/components/tools/Notes.svelte';
	import BackToIndexButton from '$lib/btpc/components/BackToIndexButton.svelte';

	import type { ToolMetadata } from '$lib/btpc/scripts/types';

	export let METADATA: ToolMetadata;
</script>

<Hr />
<TagList tags={METADATA.tags} />
<ShareButton title={'Web Tools - ' + METADATA.title} expanded />
<Notes />
<BackToIndexButton category="tools" />
