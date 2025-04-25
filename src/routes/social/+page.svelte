<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Title from '$lib/components/Title.svelte';
	import Space from '$lib/components/Space.svelte';

	import { _ } from 'svelte-i18n';
	import { CONTACT_EMAIL_ADDRESS } from '$lib/scripts/variables';
	import { SOCIALS } from '$lib/scripts/data/social';
</script>

<HeadMetadata title="Social" desc="Rinrin.rs のソーシャルアカウント一覧" />

<section>
	<Title text="Social" atPageTop />
	<p>{$_('social.desc')}</p>

	<Space height="32px" />

	<p>Email: <a href="mailto:{CONTACT_EMAIL_ADDRESS}">{CONTACT_EMAIL_ADDRESS}</a></p>

	<ul>
		{#each SOCIALS as { service, name, url, icon }}
			<li>
				{#if icon !== null}<img src="/images/logos/{icon}" alt="" />{/if}{service}:
				{#if url}
					<a href={url} target="_blank" rel="noopener noreferrer" class="no-after-icn">{name}</a>
				{:else}
					{name}
				{/if}
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	@use '$lib/stylesheets/social_table';
	@use '$lib/stylesheets/variables/mixin' as *;
</style>
