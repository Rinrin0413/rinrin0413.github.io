<script lang="ts">
	import { SITE_NAME } from "$lib/variables";
	import { browser } from "$app/environment";
	import { _ } from "svelte-i18n";

	function shareWithModal() {
		// TODO: implement modal
		alert("Your environment does not support Web Share API.");
	}

	function shareWithWebShareApi() {
		navigator.share({
			url: location.href,
			text: document.title,
			title: SITE_NAME
		});
	}

	function share() {
		if (!browser) return;

		if (navigator.share === undefined) {
			shareWithModal();
		} else {
			shareWithWebShareApi();
		}
	}
</script>

<button on:click={share} title={$_('w.share')}>Share</button>
