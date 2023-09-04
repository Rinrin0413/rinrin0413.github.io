<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import Space from '$lib/components/Space.svelte';
	import EaButton from '$lib/components/EaButton.svelte';

	import { SITE_URL } from '$lib/variables';
	import { _ } from 'svelte-i18n';
	import { SOCIALS } from '$lib/data/social';

	const HEAD = {
		title: 'Social',
		desc: 'Rinrin.rs のソーシャルアカウント一覧'
	};
</script>

<svelte:head>
	<title>Rinrin.rs | {HEAD.title}</title>
	<meta name="title" content="Rinrin.rs | {HEAD.title}" />
	<meta name="description" content={HEAD.desc} />

	<meta property="og:title" content={HEAD.title} />
	<meta property="og:description" content={HEAD.desc} />
	<meta property="og:url" content="{SITE_URL}/social" />
	<meta property="og:type" content="article" />
</svelte:head>

<section>
	<Space height="64px" />

	<Title text="Social" />
	<p>{$_('social.desc')}</p>

	<Space height="32px" />

	<p><span class="email">Email</span> <EaButton /></p>

	<table class="social-table">
		{#each SOCIALS as { service, name, url, icon }}
			<tr>
				<td>
					{#if icon}<img src="/images/logos/{icon}" alt="{service} logo" />{/if}{service}
				</td>
				<td>
					{#if url}
						<a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
					{:else}
						{name}
					{/if}
				</td>
			</tr>
		{/each}
	</table>
</section>

<style lang="scss">
	@use '/assets/stylesheets/social_table';

	@use '/assets/stylesheets/variables/mixin' as *;

	.email:after {
		content: ': ';
	}

	table {
		font-size: 18px;
		background: #ffffff35;
		padding: 12px;
		padding-top: 4px;
		margin: 18px auto;
		border-radius: 4px;

		@include sp {
			font-size: 14px;
		}
	}
</style>
