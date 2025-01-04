<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Space from '$lib/components/Space.svelte';
	import Title from '$lib/components/Title.svelte';
	import ShareButton from '$lib/components/ShareButton.svelte';
	import TagPicker from '$lib/components/tag-picker/TagPicker.svelte';
	import ToolCard from './ToolCard.svelte';
	import Notes from '$lib/components/tool-page/Notes.svelte';

	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { SITE_URL, PAGE_FULL_TITLE_PART } from '$lib/scripts/variables';
	import { scale } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';
	import { _ } from 'svelte-i18n';

	export let data: PageData;

	$: pageUrl = $page.url;
	$: tools = data.tools;

	const TITLE = 'Web Tools';
</script>

<HeadMetadata title={TITLE} desc="作った、かす Web ツール" canonicalUrl="{SITE_URL}/tools" />

<section>
	<Space height="64px" />
	<Title text="Web Tools" />
	<p>
		<ShareButton
			href="{SITE_URL}{pageUrl.pathname}{pageUrl.search}"
			title={PAGE_FULL_TITLE_PART + TITLE}
		/>
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
		<a href="/tools" class="clear-btn">{$_('tools.clearFilters')}</a>
	{/if}
</section>

<Notes />
<Space height="26px" />

<style lang="scss">
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

	h2 {
		font-size: 24px;
		margin: 0 8px;
		margin-top: 14px;
	}

	.clear-btn {
		display: inline-block;
		color: inherit;
		text-decoration: none;
		font-size: 16px;
		padding: 6px 8px;
		background: $btn-primary;
		border: 3px solid $btn-secondary;
		cursor: pointer;
		border-radius: 4px;
		margin: 0 6px;
		margin-top: 12px;
		font-family: inherit;
		box-shadow: 0 0 14px #00000050;
		transition: 0.2s;

		&:hover {
			filter: brightness(1.06);
			transform: translateY(3px);
		}
	}

	@include sp {
		h2 {
			font-size: 18px;
		}
	}
</style>
