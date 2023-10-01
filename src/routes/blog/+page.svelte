<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import Space from '$lib/components/Space.svelte';

	import { SITE_URL } from '$lib/variables';
	import { idToDate } from '$lib/util.js';
	import { date as date_i18n } from 'svelte-i18n';
	//import { _ } from 'svelte-i18n';

	export let data;

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

	<ul>
		{#each data.articles as article}
			{@const slug = article.slug}
			{@const meta = article.metadata}
			{@const date = idToDate(slug)}

			<li><a href={'/blog/articles/' + slug}>
				{#if meta.hasThumbnail}
					<img src={`/images/blog/${slug}.${meta.imgFmt}`} alt="Article thumbnail" />
				{/if}
				<h2>{meta.title}</h2>
				<time datetime={date.toISOString()}>
					{$date_i18n(date, { format: 'medium' })}
				</time>
				{#if meta.desc}
					<p>{meta.desc}</p>
				{/if}
				<span>read more -&gt;</span>
			</a></li>
		{/each}
	</ul>
</section>

<style lang="scss"></style>
