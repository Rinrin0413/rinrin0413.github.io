<script lang="ts">
	import Space from '$lib/components/Space.svelte';
	import Title from '$lib/components/Title.svelte';
	import TagPicker from './TagPicker.svelte';

	import type { PageData } from './$types';
	import { SITE_URL } from '$lib/variables';
	import { idToDate } from '$lib/util.js';
	import { fly } from 'svelte/transition';
	import { elasticBackOut } from '$lib/easing';
	import { expoIn, expoOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';
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

	<TagPicker allTags={data.allTags} pickedTags={tags} />

	<ul>
		{#each data.articles as meta (meta.slug)}
			{@const slug = meta.slug ?? 'unreachable'}
			{@const date = idToDate(slug)}
			{@const hasThumbnail = meta.hasThumbnail}

			<li
				in:fly={{ x: -512, duration: 1000, easing: elasticBackOut }}
				out:fly={{ x: 256, duration: 200, easing: expoIn }}
				animate:flip={{ duration: 700, easing: expoOut }}
			>
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
	@use '/assets/stylesheets/blog/blog';
</style>
