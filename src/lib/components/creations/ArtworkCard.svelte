<script lang="ts">
	import type { ArtworkMetadata } from '$lib/btpc/scripts/types';
	import { date as dateI18n } from 'svelte-i18n';

	export let meta: ArtworkMetadata;

	const date = meta.date !== null ? new Date(meta.date) : null;
	let datePlus9h: Date;
	$: if (date !== null) {
		datePlus9h = new Date(date);
		datePlus9h.setHours(datePlus9h.getHours() + 9);
	}
</script>

<a href="/creations/works/{meta.id}"
	><article>
		<div class="content">
			<div class="thumbnail">
				<img
					src="/images/creations/thumbnails/{meta.thumbnailImg}"
					alt=""
					loading="lazy"
					class:pixelated={meta.tags.includes('ドット絵')}
				/>
			</div>
			<div class="meta">
				<h2>{meta.title}</h2>
				{#if date !== null}
					<time datetime={datePlus9h.toISOString()}>
						{$dateI18n(date, { format: 'medium' })}
					</time>
				{/if}
				{#if meta.desc}
					<p>{meta.desc}</p>
				{/if}
				<ul>
					<li class="category">{meta.category}</li>
					{#each meta.tags as tag}
						<li><span class="tag-btn">{tag.toUpperCase()}</span></li>
					{/each}
				</ul>
			</div>
		</div>
	</article></a
>

<style lang="scss">
	@use '$lib/stylesheets/creations/artwork_card';
	@use '$lib/btpc/stylesheets/card';
</style>
