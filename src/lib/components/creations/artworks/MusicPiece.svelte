<script lang="ts">
	export let metadata: {
		op: string | null;
		nameEn: string | null;
		nameJa: string | null;
		period: string | null;
		formation: string | null;
	};
	export let originalPiece: {
		name: string;
		url?: string;
	} | null = null;
	export let audioFilename: string | null = null;
</script>

{#if audioFilename !== null}
	<div class="audio-container">
		<audio controls src="/audios/creations/{audioFilename}" preload="metadata" />
	</div>
{/if}

<table>
	<tr>
		<td>識別子</td>
		<td>{metadata.op ?? 'なし'}</td>
	</tr>
	<tr>
		<td>英語名</td>
		<td>{metadata.nameEn ?? ''}</td>
	</tr>
	<tr>
		<td>日本語名</td>
		<td>{metadata.nameJa ?? ''}</td>
	</tr>
	<tr>
		<td>作曲期間</td>
		<td>{metadata.period ?? '?'}</td>
	</tr>
	<tr>
		<td>編成</td>
		<td>{metadata.formation ?? '?'}</td>
	</tr>
	{#if originalPiece !== null}
		<tr>
			<td>原曲</td>
			<td>
				{#if originalPiece.url !== undefined}
					<a href={originalPiece.url}>{originalPiece.name}</a>
				{:else}
					{originalPiece.name}
				{/if}
			</td>
		</tr>
	{/if}
</table>

<style lang="scss">
	.audio-container {
		text-align: center;
	}

	audio {
		margin: 18px auto;
		width: 100%;
	}

	table {
		$margin: auto !important;
		margin-right: $margin;
		margin-left: $margin;
	}
</style>
