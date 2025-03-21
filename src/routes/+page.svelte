<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Title from '$lib/components/Title.svelte';
	import Hr from '$lib/components/Hr.svelte';
	import ContentTable from '$lib/components/home/ContentTable.svelte';
	import Activities from '$lib/components/home/Activities.svelte';
	import Chronicle from '$lib/components/home/Chronicle.svelte';
	import BlogArticles from '$lib/components/home/BlogArticles.svelte';
	import MinimalContactTable from '$lib/components/home/MinimalContactTable.svelte';

	import type { PageData } from './$types';
	import { SITE_URL } from '$lib/scripts/variables';
	import { _ } from 'svelte-i18n';
	import { calcAge } from '$lib/scripts/utils';

	export let data: PageData;
	const articles = data.articles;
</script>

<HeadMetadata title="Home" desc="Rinrin.rs のホームページです。" canonicalUrl={SITE_URL} />

<img src="/images/icon_13_384px.webp" alt={$_('home.icon')} class="icn" />

<section id="about">
	<Title text="About me" />
	<p class="large">
		{$_('home.greeting.0')}<br />
		{$_('home.greeting.1', { values: { age: calcAge() } })}
	</p>
</section>

<Hr />

<section id="contents">
	<Title text="Contents" />
	<p>{$_('home.contents')}</p>
	<ContentTable />
</section>

<Hr />

<section id="activities">
	<Title text="Major Activities" />
	<p>{$_('home.whatIDo')}</p>
	<ul id="activity-list">
		<li><a href="#activity-programming">Programming</a></li>
		<li><a href="#activity-game">Game</a></li>
		<li><a href="#activity-music">Music</a></li>
	</ul>
	<Activities />
</section>

<Hr />

<section id="chronicle">
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
	@use '$lib/stylesheets/home';
</style>
