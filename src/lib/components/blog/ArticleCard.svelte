<script lang="ts">
	import type { ArticleMetadata, ArticleThumbnailImgFmts } from '$lib/btpc/scripts/types';
	import { idToDate } from '$lib/scripts/utils';
	import { add9h } from '$lib/btpc/scripts/utils';
	import { date as dateI18n } from 'svelte-i18n';

	interface Props {
		meta: ArticleMetadata;
		thumbnailImgFmts?: ArticleThumbnailImgFmts | null;
		/**
		 * Whether the card is mini version.
		 * The mini version is always mobile view and does not have thumbnail image.
		 */
		mini?: boolean;
	}

	let { meta, thumbnailImgFmts = null, mini = false }: Props = $props();

	const slug = $derived(meta.slug ?? 'unreachable');
	const date = $derived(idToDate(slug));
	let datePlus9h: Date = $derived(add9h(date));

	const thumbnailImgFmt = $derived(thumbnailImgFmts?.[slug] ?? null);
	const hasThumbnailImg = $derived(thumbnailImgFmt !== null);
</script>

<a href="/blog/articles/{slug}" class:force-mobile-view={mini}
	><article>
		<div class="thumbnail">
			<img
				src="/images/{hasThumbnailImg
					? `blog/thumbnails/${slug}.${thumbnailImgFmt}`
					: 'no-image_oxipng.png'}"
				alt=""
				loading="lazy"
				class:no-image={!hasThumbnailImg}
			/>
		</div>
		<div class="meta">
			<h2>{meta.title}</h2>
			<time datetime={datePlus9h.toISOString()} class="date">
				{$dateI18n(date, { format: 'medium' })}
			</time>
			{#if meta.desc}
				<p>{meta.desc}</p>
			{/if}
			<span class="more">read more -&gt;</span>
			{#if 0 < meta.tags.length && !mini}
				<ul>
					{#each meta.tags as tag}
						<li><span class="tag-btn">{tag.toUpperCase()}</span></li>
					{/each}
				</ul>
			{/if}
		</div>
	</article></a
>

<style lang="scss">
	@use '$lib/btpc/stylesheets/card';
	@use '$lib/btpc/stylesheets/wide_card';
</style>
