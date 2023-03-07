<script lang="ts">
	import Title from '$lib/components/title.svelte';
	import Space from '$lib/components/space.svelte';
	import EaButton from '$lib/components/ea_button.svelte';

	import { site_url } from '$lib/variables';
	import { socials } from '$lib/data/social';

	const head = {
		title: 'Social',
		desc: 'Rinrin.rs のソーシャルアカウント一覧'
	};
</script>

<svelte:head>
	<title>Rinrin.rs | {head.title}</title>
	<meta name="title" content="Rinrin.rs | {head.title}" />
	<meta name="description" content={head.desc} />

	<meta property="og:title" content={head.title} />
	<meta property="og:description" content={head.desc} />
	<meta property="og:url" content="{site_url}/social" />
	<meta property="og:type" content="article" />
</svelte:head>

<section>
	<Space height="64px" />

	<Title text="Social" />
	<p>{head.desc}</p>

	<Space height="32px" />

	<p><span class="email">Email</span> <EaButton /></p>

	<table>
		{#each socials as { service, name, url, icon }}
			<tr>
				<td>
					{#if icon}<img src="images/logos/{icon}" alt="{service} logo" />{/if}{service}
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
