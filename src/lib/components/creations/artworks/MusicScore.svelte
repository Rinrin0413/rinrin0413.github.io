<script lang="ts">
	import { browser } from '$app/environment';

	export let filename: string;

	const path = `/documents/creations/${filename}.pdf`;

	let isPdfViewerEnabled: boolean;
	let fileSize: string;

	if (browser) {
		fetch(path, { method: 'HEAD' })
			.then((res) => {
				const size = res.headers.get('Content-Length');
				// 1048576 = 1024 * 1024
				if (size !== null && res.ok) fileSize = ` (${(parseInt(size) / 1048576).toFixed(2)}MB)`;
			})
			.catch((e) => console.error('Failed to fetch the PDF file size:', e));

		isPdfViewerEnabled = navigator.pdfViewerEnabled;
	}
</script>

<p>
	<a href={path} target="_blank" rel="noopener noreferrer" class="no-after-icn"
		>楽譜をダウンロード - PDF{fileSize ?? ''}</a
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

	object {
		width: 100%;
		height: auto;
		aspect-ratio: 5 / 7;
		background-color: #ffffff8a;
	}
</style>
