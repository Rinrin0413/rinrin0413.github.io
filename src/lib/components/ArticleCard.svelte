<script lang="ts">
	import type { ArticleMetadata, ArticleThumbnailImgFmts } from '$lib/types';
	import { idToDate } from '$lib/util.js';
	import { _ } from 'svelte-i18n';
	import { date as date_i18n } from 'svelte-i18n';

	export let meta: ArticleMetadata;
	export let thumbnailImgFmts: ArticleThumbnailImgFmts | null = null;
	/**
	 * Whether the card is mini version.
	 * The mini version is always mobile view and does not have thumbnail image.
	 */
	export let mini = false;

	const slug = meta.slug ?? 'unreachable';
	const date = idToDate(slug);

	const thumbnailImgFmt = thumbnailImgFmts?.[slug] ?? null;
	const hasThumbnailImg = thumbnailImgFmt !== null;
</script>

<a href={'/blog/articles/' + slug} class:force-mobile-view={mini}
	><article>
		<div class="thumbnail">
			<img
				src={'/images/' +
					(hasThumbnailImg ? `blog/thumbnails/${slug}.${thumbnailImgFmt}` : 'no-image_oxipng.png')}
				alt={$_('w.' + (hasThumbnailImg ? 'articleThumbnailImage' : 'noImage'))}
				loading="lazy"
				class:no-image={!hasThumbnailImg}
			/>
		</div>
		<div class="meta">
			<h2>{meta.title}</h2>
			<time datetime={date.toISOString()}>
				{$date_i18n(date, { format: 'medium' })}
			</time>
			{#if meta.desc}
				<p>{meta.desc}</p>
			{/if}
		</div>
	</article></a
>

<style lang="scss">
	@use '/assets/stylesheets/blog/article-card';
</style>
