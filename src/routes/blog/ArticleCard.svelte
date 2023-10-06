<script lang="ts">
	import type ArticleMetadata from '$lib/types/ArticleMetadata';
	import { idToDate } from '$lib/util.js';
	import { date as date_i18n } from 'svelte-i18n';

	export let meta: ArticleMetadata;

	const slug = meta.slug ?? 'unreachable';
	const date = idToDate(slug);
	const hasThumbnail = meta.hasThumbnail;
</script>

<a href={'/blog/articles/' + slug}
	><article>
		<div class="thumbnail">
			<img
				src={'/images/' + (hasThumbnail ? `blog/${slug}.${meta.imgFmt}` : 'no-image_oxipng.png')}
				alt={hasThumbnail ? 'Article thumbnail' : 'No image'}
				loading="lazy"
				class:no-image={!hasThumbnail}
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
