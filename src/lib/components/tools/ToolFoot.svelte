<script lang="ts">
	import Hr from '$lib/components/Hr.svelte';
	import TagList from '$lib/btpc/components/tag/TagList.svelte';
	import ShareButton from '$lib/btpc/components/ShareButton.svelte';
	import Notes from '$lib/components/tools/Notes.svelte';
	import BackToIndexButton from '$lib/btpc/components/BackToIndexButton.svelte';

	import type { ToolMetadata } from '$lib/btpc/scripts/types';

	export let metadata: ToolMetadata;
</script>

<Hr />
<TagList tags={metadata.tags} />
<ShareButton title={'Web Tools - ' + metadata.title} expanded />
<Notes />
<BackToIndexButton category="tools" />
