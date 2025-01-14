<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Title from '$lib/components/Title.svelte';
	import Space from '$lib/components/Space.svelte';
	import EaButton from '$lib/components/EaButton.svelte';

	import { SITE_URL } from '$lib/scripts/variables';
	import { _ } from 'svelte-i18n';
	import { SOCIALS } from '$lib/scripts/data/social';
</script>

<HeadMetadata
	title="Social"
	desc="Rinrin.rs のソーシャルアカウント一覧"
	canonicalUrl="{SITE_URL}/social"
/>

<section>
	<Title text="Social" atPageTop />
	<p>{$_('social.desc')}</p>

	<Space height="32px" />

	<p><span class="email">Email</span> <EaButton /></p>

	<table class="social-table">
		{#each SOCIALS as { service, name, url, icon }}
			<tr>
				<td>
					{#if icon}<img src="/images/logos/{icon}" alt="" />{/if}{service}
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
	@use '$lib/stylesheets/social_table';
	@use '$lib/stylesheets/variables/mixin' as *;

	.email:after {
		content: ': ';
	}
</style>
