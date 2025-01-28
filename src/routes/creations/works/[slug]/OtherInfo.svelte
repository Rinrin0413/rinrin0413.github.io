<script lang="ts">
	import type { ArtworkMetadata } from '$lib/btpc/scripts/types';

	export let metadata: ArtworkMetadata;
</script>

<div class="other-info">
	<table>
		<tr>
			<td>カテゴリ</td>
			<td><a href="/creations?c={metadata.category}">{metadata.category}</a></td>
		</tr>
		<tr>
			<td>タグ</td>
			<td
				>{#each metadata.tags as tag}<a href="/creations?t={tag}">{tag.toUpperCase()}</a>{/each}</td
			>
		</tr>
		<tr>
			<td>使用ツール</td>
			<td
				>{#each metadata.usedTools as tool}<span>{tool}</span>{/each}</td
			>
		</tr>
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

	a,
	span {
		margin-left: 10px;
	}

	a {
		filter: hue-rotate(319deg) grayscale(0.7);
	}
</style>
