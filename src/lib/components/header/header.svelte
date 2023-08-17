<script lang="ts">
	import Icon from './icon.svelte';
	import HamburgerButton from './hamburger_button.svelte';
	import LangButton from './lang_button.svelte';

	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { toggle_scroll_prevention } from '$lib/util';
	import { blur } from 'svelte/transition';
	import { _ } from 'svelte-i18n';

	onMount(update_scroll);

	let is_at_top = true;

	if (browser) {
		window.addEventListener('scroll', update_scroll);
		window.addEventListener('resize', set_vh001);

		set_vh001();

		function set_vh001() {
			document.documentElement.style.setProperty('--vh001', window.innerHeight * 0.01 + 'px');
		}
	}

	let is_drawer_menu_opened = false;
	let enable_fade_in = true;

	$: if (!is_at_top) enable_fade_in = false;

	const items = [
		{
			name: 'Profile',
			id: 'profile'
		},
		{
			name: 'Articles',
			id: 'articles'
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

	function update_scroll() {
		is_at_top = window.scrollY <= 0;
	}

	/** Toggles drawer menu open/close. */
	function toggle_drawer_menu(open: boolean) {
		is_drawer_menu_opened = open;
		toggle_scroll_prevention(is_drawer_menu_opened);
	}

	function empty() {} // eslint-disable-line @typescript-eslint/no-empty-function
</script>

{#if is_drawer_menu_opened}
	<div
		id="drawer-menu-bg"
		transition:blur={{ duration: 200 }}
		on:click={() => {
			toggle_drawer_menu(false);
		}}
		on:keypress={empty}
	/>
{/if}
<div id="header-bg" class:blur={is_at_top} />
<header>
	<nav class:is-opened={is_drawer_menu_opened}>
		{#each items as item}
			<a href={item.id} class:at-top={is_at_top}>
				<Icon id={item.id} />
				<span>{$_(item.name)}</span>
			</a>
		{/each}
	</nav>
	<div class:at-top={is_at_top} class:hidden={is_at_top}>
		<HamburgerButton
			is_opened={is_drawer_menu_opened}
			on:toggle={(e) => {
				toggle_drawer_menu(e.detail.is_opened);
			}}
		/><LangButton />
	</div>
	<a
		href="/"
		id="logo"
		class:center={is_at_top}
		class:fade-in={enable_fade_in}
		on:click={() => {
			toggle_drawer_menu(false);
		}}><img src="/images/favicon.png" alt={$_('header.logo')} /></a
	>
</header>

<style lang="scss">
	@use '/assets/stylesheets/header/header';
</style>
