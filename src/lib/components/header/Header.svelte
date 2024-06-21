<script lang="ts">
	import Icon from './Icon.svelte';
	import HamburgerButton from './HamburgerButton.svelte';
	import LangButton from './LangButton.svelte';

	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { isDrawerMenuOpened } from '$lib/scripts/stores';
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';

	onMount(updateScroll);

	let isAtTop = true;

	if (browser) addEventListener('scroll', updateScroll);

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
</script>

<div class="header-bg" class:blur={isAtTop} />
<header>
	<nav class:opened={$isDrawerMenuOpened} class:at-top={isAtTop}>
		{#each ITEMS as item}
			<a href="/{item.id}" class="item" class:active={pathname.split('/')[1] === item.id}>
				<Icon id={item.id} />
				<span class="item-text">{$_(item.name)}</span>
			</a>
		{/each}
	</nav>
	<div class="hamburger-btn" class:hidden={isAtTop && !$isDrawerMenuOpened}>
		<HamburgerButton /><LangButton />
	</div>
	<a
		href="/"
		class="header-logo"
		class:center={isAtTop}
		class:fade-in={enableFadeIn}
		on:click={() => {
			isDrawerMenuOpened.set(false);
		}}><img src="/images/logos/rinrin/logo.svg" alt={$_('header.logo')} /></a
	>
</header>

<style lang="scss">
	@use '$lib/stylesheets/header/header';
</style>
