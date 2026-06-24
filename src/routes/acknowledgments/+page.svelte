<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Space from '$lib/components/Space.svelte';
	import Title from '$lib/components/Title.svelte';

	import licenses from '$lib/licenses.json';
	import type { LicenseInfo } from '$lib/scripts/types';
	import { _ } from 'svelte-i18n';
	import { OTHER_LICENSES } from '$lib/scripts/data/OTHER_LICENSES';

	const libraries = Object.entries(licenses as Record<string, LicenseInfo>).map(
		([id, license]) => ({
			id,
			license
		})
	);
	const softwares = libraries.concat(OTHER_LICENSES);
</script>

<HeadMetadata
	title="Acknowledgments"
	desc="本ウェブサイトに使用しているオープンソースソフトウェアのライセンス条文の一覧です。"
/>

<section>
	<Title text="Acknowledgments" atPageTop />
	<p>{$_('acknowledgments.desc')}</p>

	<Space height="15px" />

	<ul class="software-list">
		{#each softwares as item (item.id)}
			{@const hasUrl = item.license.url !== undefined}
			<li class="software-card">
				<article>
					{#snippet cardBody()}
						<h2 class="name">{item.id}</h2>
						<div class="card-meta">
							<span class="license-type">{item.license.licenses ?? 'Unknown License'}</span>
						</div>
					{/snippet}

					{#if hasUrl}
						<a
							href={item.license.url}
							class="software-link-wrapper no-after-icn"
							target="_blank"
							rel="noopener noreferrer"
						>
							{@render cardBody()}
						</a>
					{:else}
						{@render cardBody()}
					{/if}

					{#if item.license.licenseText !== null}
						<details class="license-details">
							<summary class="license-summary">{$_('acknowledgments.showLicenseText')}</summary>
							<div class="license-text-container">
								<pre class="license-text">{item.license.licenseText}</pre>
							</div>
						</details>
					{/if}
				</article>
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	@use '$lib/stylesheets/variables/color' as *;
	@use '$lib/stylesheets/variables/mixin' as *;

	.software-list {
		max-width: 1024px;
		padding: 0;
		margin: 0 auto;
		list-style: none;
	}

	.software-card {
		margin: 24px 16px;
	}

	.software-link-wrapper {
		color: inherit;
		text-decoration: none;
		display: block;
	}

	article {
		background-color: #faf7ed9a;
		border-radius: 5px;
		$border-light: 3px solid #ffffff50;
		$border-dark: 3px solid #00000020;
		border-top: $border-light;
		border-left: $border-light;
		border-bottom: $border-dark;
		border-right: $border-dark;
		box-shadow: 0 0 10px 0 #051a3340;
		padding: 20px 24px;
		text-align: left;
		transition:
			filter 0.2s,
			transform 0.2s;

		&:has(.software-link-wrapper:hover) {
			filter: brightness(1.04);
			transform: translateY(-2px);
		}
	}

	.name {
		@include kaisei-decol;
		font-size: 20px;
		margin: 0;
		overflow-wrap: break-word;
		color: $txt-dark;
	}

	.card-meta {
		margin-top: 8px;
		margin-bottom: 12px;
	}

	.license-type {
		display: inline-block;
		background-color: $btn-secondary;
		color: $txt-dark;
		padding: 2px 8px;
		border-radius: 4px;
		font-size: 14px;
		@include bold;
	}

	.license-details {
		margin-top: 12px;
		border-top: 1px solid #00000015;
		padding-top: 12px;
	}

	.license-summary {
		font-size: 15px;
		color: $txt-primary;
		cursor: pointer;
		user-select: none;
		transition: color 0.2s;
		@include bold;

		&:hover {
			color: $txt-dark;
			text-decoration: underline;
		}
	}

	.license-text-container {
		margin-top: 8px;
		background-color: #0000000a;
		border-radius: 4px;
		padding: 12px;
		max-height: 250px;
		overflow-y: auto;
	}

	.license-text {
		@include source-code-pro;
		font-size: 13px;
		margin: 0;
		white-space: pre-wrap;
		overflow-wrap: break-word;
		color: $txt-dark;
	}

	@include sp {
		.software-card {
			margin: 17px 14px;
		}

		article {
			padding: 14px 16px;
		}

		.name {
			font-size: 17px;
		}

		.license-type {
			font-size: 12px;
		}

		.license-summary {
			font-size: 14px;
		}

		.license-text {
			font-size: 12px;
		}
	}
</style>
