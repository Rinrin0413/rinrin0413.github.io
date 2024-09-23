<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Space from '$lib/components/Space.svelte';
	import Title from '$lib/components/Title.svelte';

	import { SITE_URL } from '$lib/scripts/variables';
	import { _ } from 'svelte-i18n';
	import { ACKNOWLEDGMENTS } from '$lib/scripts/data/acknowledgments';
	import { fly } from 'svelte/transition';

	const ANIM = {
		offset: -24,
		duration: 200,
		delay: 30
	};
</script>

<HeadMetadata
	title="Acknowledgments"
	desc="このサイトの開発で利用したすべてのOSSやサービスに感謝。"
	canonicalUrl="{SITE_URL}/acknowledgments"
/>

<section>
	<Space height="64px" />

	<Title text="Acknowledgments" />
	<p>{$_('acknowledgments.desc')}</p>

	<Space height="10px" />

	<table>
		{#each ACKNOWLEDGMENTS as { name, url, license, licenseUrl }, i}
			<tr>
				<td in:fly|global={{ y: ANIM.offset, duration: ANIM.duration, delay: i * ANIM.delay }}>
					<a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
				</td>
				<td
					in:fly|global={{ y: ANIM.offset, duration: ANIM.duration, delay: i * ANIM.delay + 250 }}
				>
					{#if license !== undefined}
						{#if licenseUrl === undefined}
							{license}
						{:else}
							<a href={licenseUrl} target="_blank" rel="noopener noreferrer">
								{license}
							</a>
						{/if}
					{/if}
				</td>
			</tr>
		{/each}
	</table>
</section>

<style lang="scss">
	@use '$lib/stylesheets/variables/mixin' as *;

	table {
		margin: 0 auto;
		padding: 8px 18px;
		@include glassmorphism;
	}

	td {
		font-size: 20px;
		text-align: left;
		@include source-code-pro;
	}

	@include sp {
		table {
			padding: 10px 5px;
		}

		td {
			font-size: 14px;
			padding: 4px 0;
		}
	}
</style>
