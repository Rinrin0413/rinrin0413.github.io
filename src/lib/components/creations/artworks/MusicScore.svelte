<script lang="ts">
	import { browser } from '$app/environment';

	export let filename: string;

	let isPdfViewerEnabled: boolean;

	if (browser) isPdfViewerEnabled = navigator.pdfViewerEnabled;

	const path = `/documents/creations/${filename}.pdf`;
</script>

<p>
	<a href={path} target="_blank" rel="noopener noreferrer" class="no-after-icn"
		><img
			src="/images/digital-agency_designsystem-assets/icon/download_fill.svg"
			alt=""
		/>楽譜をダウンロード (PDF)</a
	>
</p>

{#if isPdfViewerEnabled}
	<object type="application/pdf" data={path} title="楽譜のプレビュー" />
{/if}

<style lang="scss">
	@use '$lib/stylesheets/variables/mixin' as *;

	a {
		padding: 6px 8px;
		@include button;
	}

	img {
		width: 25px;
		height: auto;
		aspect-ratio: 1 / 1;
		margin-right: 4px;
		vertical-align: text-bottom;
	}

	object {
		width: 100%;
		height: auto;
		aspect-ratio: 5 / 7;
		background-color: #ffffff8a;
	}
</style>
