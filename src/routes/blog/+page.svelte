<script lang="ts">
	import Space from '$lib/components/Space.svelte';
	import Title from '$lib/components/Title.svelte';

	import type { PageData } from './$types';
	import { SITE_URL } from '$lib/variables';
	import { idToDate } from '$lib/util.js';
	import { date as date_i18n } from 'svelte-i18n';
	//import { _ } from 'svelte-i18n';

	export let data: PageData;
	let tags = data.tags;
	$: tags = data.tags;

	const HEAD = {
		title: 'Blog',
		desc: 'Rinrin.rs のブログ(?)'
	};
</script>

<svelte:head>
	<title>Rinrin.rs | {HEAD.title}</title>
	<meta name="title" content="Rinrin.rs | {HEAD.title}" />
	<meta name="description" content={HEAD.desc} />

	<meta property="og:title" content={HEAD.title} />
	<meta property="og:description" content={HEAD.desc} />
	<meta property="og:url" content="{SITE_URL}/blog" />
	<meta property="og:type" content="article" />
</svelte:head>

<section>
	<Space height="64px" />

	<Title text="Blog" />

	<div class="tags">
		<h2>Tags:</h2>
		<ul>{#each data.allTags as {tag, count}}
				<li style="display: inline-block; margin: 0 6px;">
				<a href={"/blog?t=" + tag}><span style={`
					font-weight: ${tags.includes(tag) ? 'bold' : 'lighter'};
					text-decoration: ${tags.includes(tag) ? 'underline' : 'none'}`
				}>{tag}</span>({count})</a>
			</li>
		{/each}</ul>
	</div>

	<ul>
		{#each data.articles as meta}
			{@const slug = meta.slug ?? 'unreachable'}
			{@const date = idToDate(slug)}
			{@const hasThumbnail = meta.hasThumbnail}

			<li>
				<a href={'/blog/articles/' + slug}
					><article>
						<div class="thumbnail">
							<img
								src={'/images/' +
									(hasThumbnail ? `blog/${slug}.${meta.imgFmt}` : 'no-image_oxipng.png')}
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
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	@use '/assets/stylesheets/blog';
</style>
