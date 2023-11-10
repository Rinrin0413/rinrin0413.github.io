<script lang="ts">
	import { SITE_NAME } from '$lib/variables';
	import { browser } from '$app/environment';
	import { _ } from 'svelte-i18n';

	let isMenuOpened = false;

	function shareWithModal() {
		isMenuOpened = !isMenuOpened;
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

<button on:click={share} id="share-btn" title={$_('w.share')}>
	<!-- 
        Google Material Symbols and Icons - Share
        https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Ashare%3AFILL%401%3Bwght%40400%3BGRAD%400%3Bopsz%4024
        
        This icon is licensed under the Apache License Version 2.0: https://github.com/google/material-design-icons/blob/master/README.md
    -->
	<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
		><path
			d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Z"
		/></svg
	>
</button>

{#if isMenuOpened}
	<ul>
		<li><button>[COPY]</button></li>
		<li><button>X</button></li>
		<li><button>mastodon</button></li>
		<li><button>Misskey</button></li>
		<li><button>LINE</button></li>
	</ul>
{/if}

<style lang="scss">
	@use '/assets/stylesheets/variables/color' as *;

	#share-btn {
		display: inline-block;
		$size: 32px;
		width: $size;
		height: $size;
		padding: 4px;
		margin: 0 8px;
		background: $button-primary;
		border: 3px solid $button-secondary;
		border-radius: 4px;
		box-shadow: 0 0 14px #00000050;
		box-sizing: content-box;
		cursor: pointer;
		transition: 0.2s;

		&:hover {
			filter: brightness(1.06);
			transform: translateY(3px);
		}
	}

	svg {
		width: 100%;
		height: 100%;
		fill: $text-dark;
	}
</style>
