<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Title from '$lib/components/Title.svelte';
	import ShareButton from '$lib/btpc/components/ShareButton.svelte';
	import CategoryAndLicensePicker from '$lib/components/creations/CategoryAndLicensePicker.svelte';
	import TagPicker from '$lib/btpc/components/tag/picker/TagPicker.svelte';
	import ClearTagsButton from '$lib/btpc/components/tag/ClearTagsButton.svelte';

	import type { PageData } from './$types';
	import { PAGE_FULL_TITLE_PART } from '$lib/scripts/variables';
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { _ } from 'svelte-i18n';

	export let data: PageData;

	$: artworks = data.artworks;

	const TITLE = 'Creations';
</script>

<HeadMetadata title={TITLE} desc="Rinrin.rs の創作物" />

<section>
	<Title text={TITLE} atPageTop />
	<p>
		<ShareButton title={PAGE_FULL_TITLE_PART + TITLE} />
	</p>
	<CategoryAndLicensePicker
		allCategories={data.allCategories}
		allLicenses={data.allLicenses}
		pickedCategory={data.category}
		pickedLicense={data.license}
	/>
	<TagPicker allTags={data.allTags} pickedTags={data.tags} doesNotConvertToUpperCase />

	{#if 0 < artworks.length}
		<div class="artworks">
			<ul>
				{#each artworks as meta (meta.id)}
					<li
						transition:scale|global={{ duration: 300 }}
						animate:flip={{ duration: 700, easing: expoOut }}
					>
						<a href="/creations/works/{meta.id}">
							<img src="/images/creations/thumbnails/{meta.thumbnailImg}" alt="" /><br />
						</a>
						{meta.title}<br />
						{meta.date}<br />
						{meta.desc}<br />
						タグ: {meta.tags}<br />
						使用ツール: {meta.usedTools}<br />
						ライセンス: {meta.license}<br />
						カテゴリ: {meta.category}<br />
					</li>
				{/each}
			</ul>
		</div>
	{:else}
		<h2>{$_('creations.noMatchingArtworksFound')}</h2>
		<ClearTagsButton />
	{/if}
</section>

<style lang="scss">
	ul {
		display: flex;
		margin: 0;
		flex-wrap: wrap;
		justify-content: center;
		list-style: none;
	}

	li {
		max-width: 256px;
		text-align: left;
	}

	img {
		max-width: 100%;
		max-height: 256px;
	}
</style>
