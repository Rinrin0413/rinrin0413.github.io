<script lang="ts">
	import { browser } from '$app/environment';

	export let filename: string;
	const path = `/documents/creations/${filename}.pdf`;

	let isPdfViewerEnabled: boolean;
	let fileSize: string;

	if (browser) {
		fetchFileSize();

		isPdfViewerEnabled = navigator.pdfViewerEnabled;
	}

	function fetchFileSize() {
		const xhr = new XMLHttpRequest();
		xhr.open('HEAD', path, true);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 404) {
				const size = xhr.getResponseHeader('Content-Length');
				// 1048576 = 1024 * 1024
				if (size !== null) fileSize = ` (${(parseInt(size) / 1048576).toFixed(2)}MB)`;
				else console.error('Failed to fetch the PDF file size');
			}
		};
		xhr.send();
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
