<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	onMount(update_scroll);

	let is_at_top = true;

	if (browser) window.addEventListener('scroll', update_scroll);

	let enable_fade_in = true;

	$: if (!is_at_top) enable_fade_in = false;

	function update_scroll() {
		is_at_top = window.scrollY <= 0;
	}
</script>

<div id="header-bg" class:blur={is_at_top} />
<header>
	<a href="/" id="logo" class:center={is_at_top} class:fade-in={enable_fade_in}
		><img src="images/favicon.png" alt="Logo" /></a
	>
</header>

<style lang="scss">
	@use '/assets/stylesheets/header';
</style>
