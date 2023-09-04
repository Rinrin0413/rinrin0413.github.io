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
	/**
	 * Whether after closing drawer menu.
	 * `false` by default because it is not "after closing" at loaded the page.
	 */
	let is_after_drawer_menu_closed = false;

	if (browser) addEventListener('scroll', update_scroll);

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
		is_after_drawer_menu_closed = is_drawer_menu_opened;
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
	<nav
		class:opened={is_drawer_menu_opened}
		class:after-closed={is_after_drawer_menu_closed}
		class:at-top={is_at_top}
		class:is-not-yet-opened={!is_drawer_menu_opened && !is_after_drawer_menu_closed}
	>
		{#each items as item}
			<a
				href={item.id}
				class="item"
				on:click={() => {
					toggle_drawer_menu(false);
				}}
			>
				<Icon id={item.id} />
				<span class="item-text">{$_(item.name)}</span>
			</a>
		{/each}
	</nav>
	<div class="hamburger-btn" class:hidden={is_at_top}>
		<HamburgerButton
			is_opened={is_drawer_menu_opened}
			on:toggle={(e) => {
				toggle_drawer_menu(e.detail.is_opened);
			}}
		/><LangButton />
	</div>
	<a
		href="/"
		id="header-logo"
		class:center={is_at_top}
		class:fade-in={enable_fade_in}
		on:click={() => {
			toggle_drawer_menu(false);
		}}><img src="/images/logos/rinrin/logo.svg" alt={$_('header.logo')} /></a
	>
</header>

<style lang="scss">
	@use '/assets/stylesheets/header/header';
</style>
