<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Title from '$lib/components/Title.svelte';
	import FeedButton from '$lib/components/blog/FeedButton.svelte';
	import ShareButton from '$lib/btpc/components/ShareButton.svelte';
	import TagPicker from '$lib/btpc/components/tag/picker/TagPicker.svelte';
	import ArticleCard from '$lib/components/blog/ArticleCard.svelte';
	import ClearTagsButton from '$lib/btpc/components/tag/ClearTagsButton.svelte';

	import type { PageData } from './$types';
	import { PAGE_FULL_TITLE_PART } from '$lib/scripts/variables';
	import { _ } from 'svelte-i18n';
	import { fly } from 'svelte/transition';
	import { elasticBackOut } from '$lib/scripts/easing';
	import { expoIn, expoOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';

	export let data: PageData;

	$: tags = data.tags;
	$: articles = data.articles;

	const TITLE = 'Blog';
</script>

<HeadMetadata title={TITLE} desc="Rinrin.rs のブログ(?)" />

<section>
	<Title text="Blog" atPageTop />
	<p>
		<ShareButton title={PAGE_FULL_TITLE_PART + TITLE} /><FeedButton />
	</p>
	<TagPicker allTags={data.allTags} pickedTags={tags} />

	{#if 0 < articles.length}
		<ul>
			{#each articles as meta (meta.slug)}
				<li
					in:fly|global={{ x: -512, duration: 1000, easing: elasticBackOut }}
					out:fly|global={{ x: 256, duration: 200, easing: expoIn }}
					animate:flip={{ duration: 700, easing: expoOut }}
				>
					<ArticleCard {meta} thumbnailImgFmts={data.thumbnailImgFmts} />
				</li>
			{/each}
		</ul>
	{:else}
		<h2>{$_('blog.noMatchingArticlesFound')}</h2>
		<ClearTagsButton />
	{/if}
</section>

<style lang="scss">
	@use '$lib/stylesheets/blog/blog';
	@use '$lib/btpc/stylesheets/index_page';
</style>
