<script lang="ts">
	import Icon from './Icon.svelte';
	import HamburgerButton from './HamburgerButton.svelte';
	import LangButton from './LangButton.svelte';

	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { toggleScrollPrevention } from '$lib/scripts/utils';
	import { blur } from 'svelte/transition';
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';

	onMount(updateScroll);

	let isAtTop = true;
	/**
	 * Whether after closing drawer menu.
	 * `false` by default because it is not "after closing" at loaded the page.
	 */
	let isAfterDrawerMenuClosed = false;

	if (browser) addEventListener('scroll', updateScroll);

	let isDrawerMenuOpened = false;
	let enableFadeIn = true;

	$: pathname = $page.url.pathname;
	$: if (!isAtTop) enableFadeIn = false;

	const ITEMS = [
		{
			name: 'Profile',
			id: 'profile'
		},
		{
			name: 'Blog',
			id: 'blog'
		},
		{
			name: 'Web Tools',
			id: 'tools'
		},
		{
			name: 'Projects',
			id: 'projects'
		},
		{
			name: 'Creations',
			id: 'creations'
		},
		{
			name: 'Social',
			id: 'social'
		}
	];

	/** **＊ Must be called in the browser environment.** */
	function updateScroll() {
		isAtTop = window.scrollY <= 0;
	}

	/**
	 * Toggles drawer menu open/close.
	 *
	 * **＊ Must be called in the browser environment.**
	 */
	function toggleDrawerMenu(open: boolean) {
		isAfterDrawerMenuClosed = isDrawerMenuOpened;
		isDrawerMenuOpened = open;
		toggleScrollPrevention(isDrawerMenuOpened);
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	function empty() {}
</script>

{#if isDrawerMenuOpened}
	<div
		id="drawer-menu-bg"
		transition:blur|global={{ duration: 200 }}
		on:click={() => {
			toggleDrawerMenu(false);
		}}
		on:keypress={empty}
		role="none"
	/>
{/if}
<div id="header-bg" class:blur={isAtTop} />
<header>
	<nav
		class:opened={isDrawerMenuOpened}
		class:after-closed={isAfterDrawerMenuClosed}
		class:at-top={isAtTop}
		class:is-not-yet-opened={!isDrawerMenuOpened && !isAfterDrawerMenuClosed}
	>
		{#each ITEMS as item}
			<a
				href="/{item.id}"
				class="item"
				class:active={pathname.split('/')[1] === item.id}
				on:click={() => {
					toggleDrawerMenu(false);
				}}
			>
				<Icon id={item.id} />
				<span class="item-text">{$_(item.name)}</span>
			</a>
		{/each}
	</nav>
	<div class="hamburger-btn" class:hidden={isAtTop}>
		<HamburgerButton
			isOpened={isDrawerMenuOpened}
			on:toggle={(e) => toggleDrawerMenu(e.detail)}
		/><LangButton />
	</div>
	<a
		href="/"
		id="header-logo"
		class:center={isAtTop}
		class:fade-in={enableFadeIn}
		on:click={() => {
			toggleDrawerMenu(false);
		}}><img src="/images/logos/rinrin/logo.svg" alt={$_('header.logo')} /></a
	>
</header>

<style lang="scss">
	@use '$lib/stylesheets/header/header';
</style>
