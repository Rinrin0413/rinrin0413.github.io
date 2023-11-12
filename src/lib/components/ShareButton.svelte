<script lang="ts">
	import { SITE_NAME } from '$lib/variables';
	import { browser } from '$app/environment';
	import { _ } from 'svelte-i18n';
	import { fly } from 'svelte/transition';

	let isWebShareApiSupported = false;

	let url: string;
	let title: string;

	if (browser) {
		isWebShareApiSupported = navigator.share !== undefined;
		url = location.href;
		title = document.title;
	}

	let isMenuOpened = false;

	let mastodonDomain = 'mastodon.social';
	let misskeyDomain = 'misskey.io';

	function toggleDropdownMenu() {
		isMenuOpened = !isMenuOpened;
	}

	function shareWithWebShareApi() {
		navigator.share({
			url: url,
			text: title,
			title: SITE_NAME
		});
	}

	function share() {
		if (!browser) return;
		toggleDropdownMenu();
	}

	function copyToClipboard() {
		navigator.clipboard
			.writeText(url)
			.then(() => alert($_('blog.copied')))
			.catch(() => alert($_('blog.copyFailed')))
			.finally(() => (isMenuOpened = false));
	}

	function openLink(url: string) {
		window.open(url, '_blank');
	}

	function shareOnTwitter() {
		const text = encodeURIComponent(title.replace('Rinrin.rs', 'Rinrin​.rs') + '\n' + url);
		openLink('https://twitter.com/intent/tweet?text=' + text);
	}

	function shareWithDomain(domain: string) {
		const text = encodeURIComponent(title + '\n' + url);
		openLink(`https://${domain}/share?text=${text}`);
	}

	function shareOnMastodon() {
		shareWithDomain(mastodonDomain);
	}

	function shareOnMisskey() {
		shareWithDomain(misskeyDomain);
	}

	function faviconUrl(domain: string) {
		return `https://${domain}/favicon.ico`;
	}
</script>

{#if isMenuOpened}
	<ul transition:fly|local={{ x: 3, y: 8, duration: 200 }}>
		<li>
			<button on:click={copyToClipboard}>
				<!-- 
					Google Material Symbols and Icons - Content Copy
					https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Acontent_copy%3AFILL%400%3Bwght%40400%3BGRAD%400%3Bopsz%4024
					
					This icon is licensed under the Apache License Version 2.0: https://github.com/google/material-design-icons/blob/master/README.md
				-->
				<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
					><path
						d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"
					/></svg
				>
				{$_('blog.copyUrl')}
			</button>
		</li>
		<li>
			<button on:click={shareOnTwitter}>
				<img src="/images/logos/x_logo.svg" alt="X logo" />
				{$_('blog.post')}
			</button>
		</li>
		<li>
			<button on:click={shareOnMastodon}>
				<img src="/images/logos/mastodon_logo-purple.svg" alt="Mastodon logo" />
				{$_('blog.toot')}
			</button>
			<form on:submit={shareOnMastodon}>
				<span /><input
					type="text"
					placeholder={$_('w.domain')}
					required
					bind:value={mastodonDomain}
				/><img src={faviconUrl(mastodonDomain)} alt="" class="server-favicon" />
			</form>
		</li>
		<li>
			<button on:click={shareOnMisskey}>
				<img src="/images/logos/misskey_icon.png" alt="Misskey logo" />
				{$_('blog.note')}
			</button>
			<form on:submit={shareOnMisskey}>
				<span /><input
					type="text"
					placeholder={$_('w.domain')}
					required
					bind:value={misskeyDomain}
				/><img src={faviconUrl(misskeyDomain)} alt="" class="server-favicon" />
			</form>
		</li>
		{#if isWebShareApiSupported}
			<li title={$_('w.webShareApi')}>
				<button class="web-share-api-btn" on:click={shareWithWebShareApi}>
					<!-- 
						Bootstrap Icons - Three dots
						https://icons.getbootstrap.com/icons/three-dots
						
						Copyright (c) 2019 The Bootstrap Authors
						under the MIT License: https://github.com/twbs/icons/blob/main/LICENSE
					-->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-three-dots"
						viewBox="0 0 16 16"
						><path
							d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
						/></svg
					>
				</button>
			</li>
		{/if}
	</ul>
{/if}

<button on:click={share} class="share-btn" title={$_('w.share')}>
	<!-- 
        Google Material Symbols and Icons - Share
        https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Ashare%3AFILL%401%3Bwght%40400%3BGRAD%400%3Bopsz%4024
        
        This icon is licensed under the Apache License Version 2.0: https://github.com/google/material-design-icons/blob/master/README.md
    -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height="24"
		viewBox="0 -960 960 960"
		width="24"
		class="share-icn"
		><path
			d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Z"
		/></svg
	>
</button>

<style lang="scss">
	@use '/assets/stylesheets/variables/color' as *;

	.share-btn {
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
		fill: $text-dark;
	}

	.share-icn {
		width: 100%;
		height: 100%;
	}

	ul {
		display: inline-block;
		position: absolute;
		bottom: 35px;
		transform: translateX(-102px);
		list-style: none;
		padding: 6px 8px;
		background: $button-secondary;
		border: 3px solid $button-primary;
		border-radius: 12px;

		button {
			width: 100%;
			padding: 5px 6px;
			padding-right: 14px;
			font-size: 14px;
			color: $text-dark;
			text-align: left;
			background: none;
			border: none;
			border-radius: 7px;
			cursor: pointer;
			transition: 0.2s;

			&:hover {
				background: $button-secondary;
				filter: brightness(1.075);
				transform: translateX(4px);
			}
		}

		svg,
		img {
			vertical-align: middle;
		}

		$copy-icn-size: 22px;
		$logo-size: 19px;

		svg {
			width: $copy-icn-size;
		}

		img {
			width: $logo-size;
			margin: 0 (($copy-icn-size - $logo-size) * 0.5);
		}
	}

	$font-size-input: 13px;

	form {
		display: block;
		margin-top: -2px;
	}

	span {
		&::before {
			content: '┗';
			font-family: 'Source Code Pro', monospace;
			font-size: 20px;
			margin-left: 5px;
			position: relative;
			top: 2px;
			opacity: 0.4;
		}

		&::after {
			content: 'https://';
			font-size: $font-size-input;
			margin-left: 3px;
			opacity: 0.8;
		}
	}

	input {
		max-width: 112px;
		margin-left: 1px;
		padding: 2px;
		font-size: $font-size-input;
		font-weight: bold;
		color: $text-dark;
		background: $button-secondary;
		border: 2px solid $button-primary;
		border-radius: 4px;
	}

	.server-favicon {
		$size: 14px;
		width: $size;
		height: $size;
		margin-left: 5px;
		vertical-align: middle;
	}

	.web-share-api-btn {
		margin: 0;
		margin-top: 12px;
		padding: 1px 0;
		text-align: center;
		background: $button-primary;
		border-radius: 24px;

		&:hover {
			transform: none;
		}
	}

	.bi-three-dots {
		height: 100%;
	}
</style>
