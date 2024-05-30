<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import Hr from '$lib/components/Hr.svelte';
	import ContentTable from './ContentTable.svelte';
	import Activities from './Activities.svelte';
	import Chronicle from './Chronicle.svelte';
	import BlogArticles from './BlogArticles.svelte';
	import MinimalContactTable from './MinimalContactTable.svelte';

	import type { PageData } from './$types';
	import { SITE_URL } from '$lib/variables';
	import { _ } from 'svelte-i18n';
	import { calcAge } from '$lib/util';

	export let data: PageData;
	const articles = data.articles;

	const HEAD = {
		title: 'Home',
		desc: 'Rinrin.rs のホームページです。'
	};
</script>

<svelte:head>
	<title>Rinrin.rs | {HEAD.title}</title>
	<meta name="title" content="Rinrin.rs | {HEAD.title}" />
	<meta name="description" content={HEAD.desc} />

	<meta property="og:title" content={HEAD.title} />
	<meta property="og:description" content={HEAD.desc} />
	<meta property="og:url" content={SITE_URL} />

	<link rel="canonical" href={SITE_URL} />
</svelte:head>

<img src="/images/icon_13_384px.webp" alt={$_('home.icon')} class="icn" />

<section id="about">
	<Title text="About me" />
	<p class="large">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html $_('home.greeting', { values: { age: calcAge() } })}
	</p>
</section>

<Hr />

<section id="contents">
	<Title text="Table of Contents" />
	<p>{$_('home.tableOfContents')}</p>
	<ContentTable />
</section>

<Hr />

<section id="activities">
	<Title text="Major Activities" />
	<p>{$_('home.whatIDo')}</p>
	<ul id="activity-list">
		<li><a href="#acivity-programming">Programming</a></li>
		<li><a href="#acivity-game">Game</a></li>
		<li><a href="#acivity-music">Music</a></li>
	</ul>
	<Activities />
</section>

<Hr />

<section id="chronicle">
	<Title text="Chronicle" />
	<p>{$_('home.chronicle')}</p>
	<Chronicle />
</section>

<Hr />

<section id="blog">
	<Title text="Blog Articles" />
	<p>{$_('home.recentArticles')}</p>
	<BlogArticles {articles} />
	<p><a href="/blog">{$_('home.viewAll')}</a></p>
</section>

<Hr />

<section id="contact">
	<Title text="Contact / Social" />
	<p>{$_('home.contact')}</p>
	<MinimalContactTable />
	<p><a href="social">{$_('home.otherSocial')}</a></p>
</section>

<style lang="scss">
	@use '/assets/stylesheets/variables/color' as *;

	.icn {
		$size: 256px;
		$shadow-color: #00000094;

		width: $size;
		height: $size;
		border-radius: 3%;
		margin: 18px auto -48px auto;
		box-shadow: 0 4px 14px $shadow-color;
		transition: 0.3s;

		&:hover {
			box-shadow: 0 2px 6px $shadow-color;
			transform: translateY(6px) scale(0.98);
		}

		&:active {
			box-shadow: none;
			transform: translateY(8px) scale(0.968);
		}
	}

	#contents {
		height: 362px;
	}

	#activity-list {
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		padding: 0;
		margin: 12px auto;

		li {
			margin: 0 12px;
			font-size: 18px;
		}

		a {
			color: #460000;
			transition: 0.3s;

			&:hover {
				color: #9b3535;
			}
		}
	}
</style>
