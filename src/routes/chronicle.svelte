<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { chronicle } from '$lib/data/chronicle';
	import { fmt_month, add_class_on_visible } from '$lib/util';
	import { _ } from 'svelte-i18n';

	onMount(fade_in);
	if (browser) window.addEventListener('scroll', fade_in);

	let is_opened = false;

	function fade_in() {
		add_class_on_visible(document.getElementsByClassName('container'), 'fade-in-up-zoom');
	}

	function open() {
		is_opened = !is_opened;
	}
</script>

<div class="container" class:fade-in-up-zoom={false}>
	<ul
		class:opened={is_opened}
		title={!is_opened ? 'Open' : ''}
		on:click|once={open}
		on:keypress|once={(e) => {
			if (e.key === 'Enter') open;
		}}
	>
		{#each chronicle as { year, events }}
			{#each events as { month, event }, i}
				<li>
					<h1 class:no-pin={i != 0}>{@html fmt_month(month)} {year}</h1>
					<div>{$_('chronicle.' + event)}</div>
				</li>
			{/each}
		{/each}
	</ul>
</div>

<style lang="scss">
	@use '/assets/stylesheets/utils/fade_in_up_zoom';
	@use '/assets/stylesheets/chronicle';
</style>
