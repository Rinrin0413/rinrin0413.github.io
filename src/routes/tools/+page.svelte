<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Space from '$lib/components/Space.svelte';
	import Title from '$lib/components/Title.svelte';
	import ShareButton from '$lib/btpc/components/ShareButton.svelte';
	import TagPicker from '$lib/btpc/components/tag/picker/TagPicker.svelte';
	import ToolCard from './ToolCard.svelte';
	import ClearTagsButton from '$lib/btpc/components/tag/ClearTagsButton.svelte';
	import Notes from '$lib/components/tools/Notes.svelte';

	import type { PageData } from './$types';
	import { PAGE_FULL_TITLE_PART } from '$lib/scripts/variables';
	import { scale } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';
	import { _ } from 'svelte-i18n';

	export let data: PageData;

	$: tools = data.tools;

	const TITLE = 'Web Tools';
</script>

<HeadMetadata title={TITLE} desc="作った、かす Web ツール" />

<section>
	<Title text="Web Tools" atPageTop />
	<p>
		<ShareButton title={PAGE_FULL_TITLE_PART + TITLE} />
	</p>
	<TagPicker allTags={data.allTags} pickedTags={data.tags} />

	{#if 0 < tools.length}
		<div class="tools">
			<ul>
				{#each tools as meta (meta.id)}
					<li
						transition:scale|global={{ duration: 300 }}
						animate:flip={{ duration: 700, easing: expoOut }}
					>
						<ToolCard {meta} />
					</li>
				{/each}
			</ul>
		</div>
	{:else}
		<h2>{$_('tools.noMatchingToolsFound')}</h2>
		<ClearTagsButton />
	{/if}
</section>

<Notes />
<Space height="26px" />

<style lang="scss">
	@use '$lib/btpc/stylesheets/index_page';

	@use '$lib/stylesheets/variables/color' as *;
	@use '$lib/stylesheets/variables/mixin' as *;

	.tools {
		margin: 0 auto;
	}

	ul {
		display: flex;
		// max-width: 1024px;
		margin: 0 4px;
		padding: 0;
		margin-bottom: 32px;
		list-style: none;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 8px;
	}
</style>
