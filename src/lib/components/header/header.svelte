<script lang="ts">
	import Icon from './icon.svelte';
	import HamburgerButton from './hamburger_button.svelte';
	import LangButton from './lang_button.svelte';

	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { _ } from 'svelte-i18n';

	onMount(update_scroll);

	let is_at_top = true;

	if (browser) window.addEventListener('scroll', update_scroll);

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
</script>

<div id="header-bg" class:blur={is_at_top} />
<header>
	<a href="/" id="logo" class:center={is_at_top} class:fade-in={enable_fade_in}
		><img src="/images/favicon.png" alt={$_('header.logo')} /></a
	>
	<nav>
		{#each items as item}
			<a href={item.id} class:at-top={is_at_top}>
				<Icon id={item.id} />
				<span>{$_(item.name)}</span>
			</a>
		{/each}
		<div class:at-top={is_at_top}><HamburgerButton /></div>
		<LangButton />
	</nav>
</header>

<style lang="scss">
	@use '/assets/stylesheets/header/header';
</style>
