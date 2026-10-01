<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Title from '$lib/components/Title.svelte';
	import Hr from '$lib/components/Hr.svelte';

	import { _, date } from 'svelte-i18n';
	import type { PageData } from './$types';
	import { GIST_URL_FOR_NOW_PAGE } from '$lib/scripts/variables';

	let { data }: { data: PageData } = $props();
</script>

<HeadMetadata title="Now" desc="私が今取り組んでいることや近況。" />

<section>
	<Title text="Now" atPageTop />
	<p>
		{$_('now.desc.0')}<a
			href="https://nownownow.com/about"
			target="_blank"
			rel="noopener noreferrer">/now</a
		>{$_('now.desc.1')}
	</p>
	{#if data.now !== null}
		<p>
			{$_('now.lastUpdated')}:<br /><time datetime={data.now.updatedAt}>
				{$date(new Date(data.now.updatedAt), {
					dateStyle: 'full',
					timeStyle: 'full',
					timeZone: 'Asia/Tokyo'
				})}
			</time>
		</p>
	{/if}
</section>

<Hr />

<article class="child-page-body" lang="ja">
	<div>
		{#if data.now !== null}
			<!-- Raw HTML is disabled in the server-side Markdown renderer. -->
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html data.now.html}
		{:else}
			<p>
				{$_('now.unavailable')}<br /><a
					href={GIST_URL_FOR_NOW_PAGE}
					target="_blank"
					rel="noopener noreferrer">{GIST_URL_FOR_NOW_PAGE}</a
				>
			</p>
		{/if}
		<Hr />
		<ul>
			<li>居住地: 日本 千葉県（北部）</li>
		</ul>
	</div>
</article>

<br />

<style lang="scss" global>
	@use '$lib/btpc/stylesheets/for_markdown';
</style>
