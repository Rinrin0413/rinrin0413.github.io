<script lang="ts">
	import { _ } from 'svelte-i18n';
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
		<td>{$_('creations.musicPiece.identifier')}</td>
		<td>{metadata.op ?? $_('creations.musicPiece.none')}</td>
	</tr>
	<tr>
		<td>{$_('creations.musicPiece.nameEn')}</td>
		<td>{metadata.nameEn ?? ''}</td>
	</tr>
	<tr>
		<td>{$_('creations.musicPiece.nameJa')}</td>
		<td>{metadata.nameJa ?? ''}</td>
	</tr>
	<tr>
		<td>{$_('creations.musicPiece.period')}</td>
		<td>{metadata.period ?? '?'}</td>
	</tr>
	<tr>
		<td>{$_('creations.musicPiece.formation')}</td>
		<td>{metadata.formation ?? '?'}</td>
	</tr>
	{#if originalPiece !== null}
		<tr>
			<td>{$_('creations.musicPiece.originalPiece')}</td>
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
