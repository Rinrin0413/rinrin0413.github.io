<script lang="ts">
	import { SITE_NAME } from '$lib/variables';
	import { browser } from '$app/environment';
	import { _ } from 'svelte-i18n';
	import { fly } from 'svelte/transition';
	import { faviconUrl } from '$lib/util';

	export let expanded = false;

	let isWebShareApiSupported = false;

	let url: string;
	let title: string;

	if (browser) {
		isWebShareApiSupported = navigator.share !== undefined;
		url = location.href;
		title = document.title;
	}

	let isMenuOpened = false;

	const ITEM_NAMES = {
		copy: $_('blog.copyUrl'),
		post: $_('blog.post'),
		toot: $_('blog.toot'),
		note: $_('blog.note'),
		webShareApi: $_('w.webShareApi')
	};

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

	function copyToClipboard() {
		navigator.clipboard
			.writeText(url)
			.then(() => alert($_('blog.copied')))
			.catch(() => alert($_('blog.copyFailed')))
			.finally(() => (isMenuOpened = false));
	}

	function openLink(url: string) {
		window.open(url, '_blank', 'width=628,height=424');
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
</script>

{#if isMenuOpened || expanded}
	<!-- prettier-ignore -->
	<ul class:menu={!expanded} transition:fly|local={{ x: 1, y: 8, duration: 200 }}>
		<li>
			<button on:click={copyToClipboard} title={ITEM_NAMES.copy}>
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
				{#if !expanded}
					{ITEM_NAMES.copy}
				{/if}
			</button
		></li
		><li>
			<button on:click={shareOnTwitter} title={ITEM_NAMES.post}>
				<img src="/images/logos/x_logo.svg" alt="X logo" />
				{#if !expanded}
					{ITEM_NAMES.post}
				{/if}
			</button
		></li
		><li>
			<button class:opened={false} on:click={shareOnMastodon} title={ITEM_NAMES.toot}>
				<img src="/images/logos/mastodon_logo-purple.svg" alt="Mastodon logo" />
				{#if !expanded}
					{ITEM_NAMES.toot}
				{/if}
			</button
			>{#if !expanded}
				<form on:submit={shareOnMastodon}>
					<span /><input
						type="text"
						placeholder={$_('w.domain')}
						required
						bind:value={mastodonDomain}
					/><img src={faviconUrl(mastodonDomain)} alt="" class="server-favicon" />
				</form>{/if
		}</li
		><li>
			<button class:opened={false} on:click={shareOnMisskey} title={ITEM_NAMES.note}>
				<img src="/images/logos/misskey_icon.png" alt="Misskey logo" />
				{#if !expanded}
					{ITEM_NAMES.note}
				{/if}
			</button>
			{#if !expanded}
				<form on:submit={shareOnMisskey}>
					<span /><input
						type="text"
						placeholder={$_('w.domain')}
						required
						bind:value={misskeyDomain}
					/><img src={faviconUrl(misskeyDomain)} alt="" class="server-favicon" />
				</form>
			{/if}
		</li>
		{#if isWebShareApiSupported}
			<li>
				<button class="web-share-api-btn" on:click={shareWithWebShareApi} title={ITEM_NAMES.webShareApi}>
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

{#if !expanded}
	<button
		on:click={toggleDropdownMenu}
		class="share-btn"
		class:opened={isMenuOpened}
		title={$_('w.share')}
	>
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
{/if}

<style lang="scss">
	@use '/assets/stylesheets/blog/share-button';
</style>
