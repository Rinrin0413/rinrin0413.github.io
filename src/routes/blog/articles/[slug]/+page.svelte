<script lang="ts">
	import Space from '$lib/components/Space.svelte';
	import Article from './Article.svelte';
	import Tags from './Tags.svelte';
	import ScrollToTop from './ScrollToTop.svelte';

	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { SITE_URL } from '$lib/variables';
	import { parallaxStyle, idToDate } from '$lib/util';
	import { date as date_i18n } from 'svelte-i18n';
	import { _ } from 'svelte-i18n';

	export let data: PageData;
	const metadata = data.frontmatter;
	/* eslint-disable @typescript-eslint/no-non-null-assertion */
	const slug = $page.url.pathname.split('/').pop()!;
	/* eslint-enable @typescript-eslint/no-non-null-assertion */

	let scrollY: number;
	let parallax = parallaxStyle(0);
	$: parallax = parallaxStyle(scrollY);

	let date = idToDate(slug);

	const hasThumbnail = metadata.hasThumbnail;

	const HEAD = {
		title: 'Blog - ' + metadata.title,
		desc: metadata.desc,
		thumbnail_path: `/images/blog/${slug}.png`
	};
</script>

<svelte:head>
	<title>Rinrin.rs | {HEAD.title}</title>
	<meta name="title" content="Rinrin.rs | {HEAD.title}" />
	<meta name="description" content={HEAD.desc} />

	<meta property="og:title" content={HEAD.title} />
	<meta property="og:description" content={HEAD.desc} />
	<meta property="og:url" content="{SITE_URL}/blog/articles/{slug}" />
	{#if hasThumbnail}
		<meta property="og:image" content="{SITE_URL}{HEAD.thumbnail_path}" />
		<meta property="og:type" content="article" />
	{/if}

	{#if !metadata.indexed}
		<meta name="robots" content="noindex" />
	{/if}
</svelte:head>

<svelte:window bind:scrollY />

{#if hasThumbnail}
	<img
		src="/images/blog/{slug}.png"
		alt="Article thumbnail"
		class="back-thumbnail"
		style={parallax(0.25)}
		aria-hidden="true"
	/>

	<div class="thumbnail-wrapper">
		<img
			src="/images/blog/{slug}.png"
			alt="Article thumbnail"
			class="thumbnail"
			style={parallax(-0.25)}
		/>
	</div>
{:else}
	<Space height="32px" />
{/if}

<div class="article-content" class:thumbnail-exists={hasThumbnail}>
	<h1 style={parallax(-0.19)}>{metadata.title}</h1>
	<div>
		<time datetime={date.toISOString()} style={parallax(-0.12)}
			>{$date_i18n(date, { format: 'full' })}</time
		>
	</div>
	<Article body={data.component} />
	<Tags tags={metadata.tags} />
	<div><a href="/blog" class="back-to-index">{$_('article.backToIndex')}</a></div>
</div>

<ScrollToTop />

<style lang="scss">
	@use '/assets/stylesheets/variables/dimension' as *;
	@use '/assets/stylesheets/variables/mixin' as *;

	$back-thumbnail-height: calc($max-vh * 70);

	.back-thumbnail {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: $back-thumbnail-height;
		object-fit: cover;
		opacity: 0.6;
		filter: blur(4px);
		user-select: none;
	}

	.thumbnail-wrapper {
		width: 100%;
		height: $back-thumbnail-height;
		position: relative;
		bottom: $header-height * 1.3;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.thumbnail {
		position: relative;
		width: min(95vw, calc($max-vh * 95));
		height: min(427px, $back-thumbnail-height);
		object-fit: contain;
		filter: drop-shadow(0 0 14px #00000080);

		@media (max-height: 859px) {
			height: min(386px, $back-thumbnail-height);
		}
	}

	.article-content.thumbnail-exists {
		position: relative;
		bottom: $header-height * 1.3 + 18px;

		@media (min-height: 622px) {
			bottom: calc($header-height * 1.3 + calc($max-vh * 25) - 128px);
		}
	}

	$text-color-meta: #fffbee;

	h1 {
		display: inline-block;
		padding: 6px 18px;
		margin: 0 auto;
		font-size: 30px;
		font-weight: lighter;
		color: $text-color-meta;
		background-color: #0000005a;
		border-bottom: 7px solid #0000003a;
		border-radius: 3px;
		$blur: blur(20px);
		backdrop-filter: $blur;
		-webkit-backdrop-filter: $blur;

		@include sp {
			font-size: 24px;
		}
	}

	time {
		display: inline-block;
		padding: 3px 18px;
		margin: 0 auto;
		margin-top: 16px;
		margin-bottom: 32px;
		color: $text-color-meta;
		font-size: 16px;
		font-weight: lighter;
		@include glassmorphism($background-color: #0000008a, $border-radius: 1px);
	}

	.back-to-index {
		display: inline-block;
		font-size: 18px;
		margin-top: 32px;
	}
</style>
