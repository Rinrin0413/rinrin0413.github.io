<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { CHRONICLE } from '$lib/data/chronicle';
	import { fmtMonth, addClassOnVisible } from '$lib/util';
	import { _ } from 'svelte-i18n';

	onMount(fadeIn);
	if (browser) window.addEventListener('scroll', fadeIn);

	let isOpened = false;

	function fadeIn() {
		addClassOnVisible(document.getElementsByClassName('container'), 'fade-in-up-zoom');
	}

	function open() {
		isOpened = !isOpened;
	}
</script>

<div class="container" class:fade-in-up-zoom={false}>
	<ul
		class:opened={isOpened}
		title={!isOpened ? 'Open' : ''}
		on:click|once={open}
		on:keypress|once={(e) => {
			if (e.key === 'Enter') open;
		}}
	>
		{#each CHRONICLE as { year, events }}
			{#each events as { month, event }, i}
				<li class="row">
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					<div class="year" class:no-pin={i != 0}>{@html fmtMonth(month)} {year}</div>
					<div class="event">{$_('chronicle.' + event)}</div>
				</li>
			{/each}
		{/each}
	</ul>
</div>

<style lang="scss">
	@use '/assets/stylesheets/utils/fade_in_up_zoom';
	@use '/assets/stylesheets/chronicle';
</style>
