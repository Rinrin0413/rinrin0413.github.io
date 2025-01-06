<script lang="ts">
	import { SITE_NAME } from '$lib/scripts/variables';
	import { browser } from '$app/environment';
	import { _ } from 'svelte-i18n';
	import { fly } from 'svelte/transition';
	import { faviconUrl } from '$lib/scripts/utils';

	export let href: string;
	export let title: string;
	export let expanded = false;
	export let isInArticle = false;

	let isWebShareApiSupported = false;

	if (browser) isWebShareApiSupported = navigator.share !== undefined;

	const ANIM_DIRECTION = isInArticle ? 1 : -1;
	const ANIM_OFFSET = {
		x: 1 * ANIM_DIRECTION,
		y: 8 * ANIM_DIRECTION
	};

	let isMenuOpened = false;

	$: ITEM_NAMES = {
		copy: $_('shareBtn.copyUrl'),
		post: $_('shareBtn.post'),
		toot: $_('shareBtn.toot'),
		note: $_('shareBtn.note'),
		webShareApi: $_('w.webShareApi')
	};

	let mastodonDomain = 'mastodon.social';

	let firstItem: HTMLElement;
	$: if (!expanded) firstItem?.focus();

	function toggleDropdownMenu() {
		isMenuOpened = !isMenuOpened;
	}

	/** **＊ Must be called in the browser environment.** */
	function shareWithWebShareApi() {
		navigator.share({
			url: href,
			text: title,
			title: SITE_NAME
		});
	}

	/** **＊ Must be called in the browser environment.** */
	function copyToClipboard() {
		navigator.clipboard
			.writeText(href)
			.then(() => alert($_('shareBtn.copied')))
			.catch(() => alert($_('shareBtn.copyFailed')))
			.finally(() => (isMenuOpened = false));
	}

	/** **＊ Must be called in the browser environment.** */
	function openLink(url: string) {
		window.open(url, '_blank', 'width=628,height=424');
	}

	/** **＊ Must be called in the browser environment.** */
	function shareOnTwitter() {
		const text = encodeURIComponent(title.replace('Rinrin.rs', 'Rinrin​.rs') + '\n' + href);
		openLink('https://twitter.com/intent/tweet?text=' + text);
	}

	/** **＊ Must be called in the browser environment.** */
	function shareOnMisskey() {
		const text = encodeURIComponent(title);
		const url = encodeURIComponent(href);
		openLink(`https://misskey-hub.net/share/?text=${text}&url=${url}`);
	}

	/** **＊ Must be called in the browser environment.** */
	function shareWithDomain(domain: string) {
		const text = encodeURIComponent(title + '\n' + href);
		openLink(`https://${domain}/share?text=${text}`);
	}

	/** **＊ Must be called in the browser environment.** */
	function shareOnMastodon() {
		shareWithDomain(mastodonDomain);
	}
</script>

{#if isMenuOpened || expanded}
	<!-- prettier-ignore -->
	<ul
		class:menu={!expanded}
		class:in-article-page={isInArticle}
		transition:fly={{ ...ANIM_OFFSET, duration: 200 }}
	>
		<li>
			<button on:click={copyToClipboard} title={ITEM_NAMES.copy} bind:this={firstItem}>
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
				<img src="/images/logos/x_logo.svg" alt="X logo" width=1200 height=1227 />
				{#if !expanded}
					{ITEM_NAMES.post}
				{/if}
			</button
		></li
		><li>
			<button on:click={shareOnMisskey} title={ITEM_NAMES.note}>
				<img src="/images/logos/misskey_icon.webp" alt="Misskey logo" width=92 height=64 />
				{#if !expanded}
					{ITEM_NAMES.note}
				{/if}
			</button
		></li
		>{#if !expanded}
			<li>
				<button class:opened={false} on:click={shareOnMastodon} title={ITEM_NAMES.toot}>
					<img src="/images/logos/mastodon_logo-purple.svg" alt="Mastodon logo" width=75 height=79 />
					{ITEM_NAMES.toot}
				</button>
				<form on:submit={shareOnMastodon}>
					<span
					/><input
						type="text"
						placeholder={$_('w.domain')}
						required
						bind:value={mastodonDomain}
					/><img src={
						mastodonDomain === 'mastodon.social' ?
							'/images/logos/mastodon_logo-purple.svg' :
							faviconUrl(mastodonDomain)
					} alt="" class="server-favicon" />
				</form>
			</li>
		{/if
		}{#if isWebShareApiSupported
			}<li>
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
	@use '$lib/btpc/stylesheets/share_button';
</style>
