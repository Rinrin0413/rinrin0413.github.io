<script lang="ts">
	import type { ArtworkMetadata } from '$lib/btpc/scripts/types';
	import { _ } from 'svelte-i18n';

	export let metadata: ArtworkMetadata;
</script>

<div class="other-info">
	<table>
		<tr>
			<td>{$_('w.category')}</td>
			<td
				><span
					><a href="/creations?c={metadata.category}" class="category">{metadata.category}</a></span
				></td
			>
		</tr>
		<tr>
			<td>{$_('w.tags')}</td>
			<td
				>{#each metadata.tags as tag}<a href="/creations?t={tag}" class="tag">{tag.toUpperCase()}</a
					>{/each}</td
			>
		</tr>
		<tr>
			<td>{$_('w.usedTools')}</td>
			<td
				><span
					>{#each metadata.usedTools as tool, i}{#if 0 < i},
						{/if}{tool}{/each}</span
				></td
			>
		</tr>
		{#if metadata.license !== null}
			<tr>
				<td>{$_('w.license')}</td>
				<td
					><span>
						{#if metadata.license === 'CC BY-SA 4.0'}
							<a
								href="https://creativecommons.org/licenses/by-sa/4.0/"
								target="_blank"
								rel="license noopener noreferrer"
								class="cc no-after-icn"
								>CC BY-SA 4.0<img
									src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
									alt=""
								/><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" /><img
									src="https://mirrors.creativecommons.org/presskit/icons/sa.svg"
									alt=""
								/></a
							>
						{:else}
							{metadata.license}
						{/if}
					</span></td
				>
			</tr>
		{/if}
	</table>
</div>

<style lang="scss">
	.other-info {
		margin: 14px 24px;
	}

	table {
		margin: 0 auto;
		padding: 6px 12px;
		background-color: #ffffffb0;
		border: 1px solid #ffffff;
		border-radius: 4px;
	}

	td {
		font-size: 16px;
		padding: 0;

		&:first-child {
			text-wrap: nowrap;
			text-align: right;

			&:after {
				content: ':';
			}
		}

		&:last-child {
			text-align: left;
		}
	}

	span,
	.tag {
		margin-left: 10px;
	}

	.category,
	.tag {
		filter: hue-rotate(319deg) grayscale(0.3);
	}

	.cc img {
		height: 24px;
		aspect-ratio: 1;
		margin-left: 2px;
		vertical-align: text-bottom;
	}
</style>
