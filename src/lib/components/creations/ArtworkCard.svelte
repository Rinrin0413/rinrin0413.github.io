<script lang="ts">
	import type { ArtworkMetadata } from '$lib/btpc/scripts/types';
	import { add9h } from '$lib/btpc/scripts/utils';
	import { date as dateI18n } from 'svelte-i18n';

	interface Props {
		meta: ArtworkMetadata;
	}

	let { meta }: Props = $props();

	const date = $derived(meta.date !== null ? new Date(meta.date) : null);
	let datePlus9h: Date | null = $derived.by(() => {
		if (date !== null) return add9h(date);
		return null;
	});
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
					<time datetime={datePlus9h?.toISOString()}>
						{$dateI18n(date, { format: 'medium' })}
					</time>
				{/if}
				{#if meta.desc}
					<p>{meta.desc}</p>
				{/if}
				<ul>
					<li class="category">{meta.category}</li>
					{#each meta.tags as tag}
						<li><span class="tag-btn">{tag}</span></li>
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
