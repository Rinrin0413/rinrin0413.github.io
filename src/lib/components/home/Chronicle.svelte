<script lang="ts">
	import FadeInUpAnim from '$lib/components/FadeInUpAnim.svelte';

	import { CHRONICLE } from '$lib/data/chronicle';
	import { fmtMonth } from '$lib/util';
	import { _ } from 'svelte-i18n';

	let isOpened = false;

	function open() {
		isOpened = !isOpened;
	}
</script>

<FadeInUpAnim>
	<div
		class="container"
		title={!isOpened ? 'Open' : ''}
		role="button"
		tabindex="0"
		on:click|once={open}
		on:keypress|once={(e) => {
			if (e.key === 'Enter') open;
		}}
	>
		<ul class:opened={isOpened}>
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
</FadeInUpAnim>

<style lang="scss">
	@use '/assets/stylesheets/chronicle';
</style>
