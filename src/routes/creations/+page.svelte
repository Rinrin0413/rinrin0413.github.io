<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Title from '$lib/components/Title.svelte';
	import ShareButton from '$lib/btpc/components/ShareButton.svelte';
	import CategoryAndLicensePicker from '$lib/components/creations/CategoryAndLicensePicker.svelte';
	import TagPicker from '$lib/btpc/components/tag/picker/TagPicker.svelte';
	import ArtworkCard from '$lib/components/creations/ArtworkCard.svelte';
	import ClearTagsButton from '$lib/btpc/components/tag/ClearTagsButton.svelte';

	import type { PageData } from './$types';
	import { PAGE_FULL_TITLE_PART } from '$lib/scripts/variables';
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { CARD_ANIM_PARAMS } from '$lib/btpc/scripts/variables';
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
						transition:scale|global={CARD_ANIM_PARAMS.transition}
						animate:flip={CARD_ANIM_PARAMS.animate}
					>
						<ArtworkCard {meta} />
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
	@use '$lib/btpc/stylesheets/index_page';

	.artworks {
		margin: 0 auto;
	}

	ul {
		display: flex;
		margin: 0 8px;
		padding: 0;
		list-style: none;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 8px;
	}

	li {
		max-width: 100%;
		text-align: left;
	}
</style>
