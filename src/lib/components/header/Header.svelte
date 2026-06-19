<script lang="ts">
	import Icon from './Icon.svelte';
	import HamburgerButton from './HamburgerButton.svelte';
	import LangButton from './LangButton.svelte';

	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { isDrawerMenuOpened } from '$lib/scripts/stores';
	import { page } from '$app/state';
	import { _ } from 'svelte-i18n';

	onMount(updateScroll);

	let isAtTop = $state(true);

	if (browser) addEventListener('scroll', updateScroll);

	let isMainVisual = $derived(isAtTop && !$isDrawerMenuOpened);

	let enableFadeIn = $state(true);

	let pathname = $derived(page.url.pathname);

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
		if (!isAtTop) enableFadeIn = false;
	}

	/** Forcibly set the `AtTop` variable to `false`. */
	function forceSetTheAtTopFalse() {
		isAtTop = false;
	}
</script>

<div class="header-bg" class:blur={isMainVisual}></div>
<header class:backdrop-blur={!isMainVisual}>
	<a
		href="#main-content"
		class="skip-btn"
		onfocus={forceSetTheAtTopFalse}
		inert={$isDrawerMenuOpened}>{$_('header.skip')}</a
	>
	<nav class:opened={$isDrawerMenuOpened} class:at-top={isMainVisual}>
		{#each ITEMS as item (item.id)}
			<a
				href="/{item.id}"
				class="item"
				class:active={pathname.split('/')[1] === item.id}
				onfocus={forceSetTheAtTopFalse}
				onmousedown={forceSetTheAtTopFalse}
			>
				<Icon id={item.id} />
				<span class="item-text">{$_(item.name)}</span>
			</a>
		{/each}
	</nav>
	<div class="hamburger-btn" class:hidden={isMainVisual}>
		<HamburgerButton onfocus={forceSetTheAtTopFalse} /><LangButton
			onfocus={forceSetTheAtTopFalse}
		/>
	</div>
	<a
		href="/"
		class="header-logo"
		class:center={isMainVisual}
		class:fade-in={enableFadeIn}
		onclick={() => {
			isDrawerMenuOpened.set(false);
		}}
		tabindex="-1"><img src="/images/logos/rinrin/logo.svg" alt="" /></a
	>
</header>

<style lang="scss">
	@use '$lib/stylesheets/header/header';
</style>
