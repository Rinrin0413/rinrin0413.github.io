<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import FadeInAnim from '$lib/components/FadeInAnim.svelte';

	import { CHRONICLE } from '$lib/scripts/data/chronicle';
	import { fmtMonth } from '$lib/scripts/utils';
	import { _ } from 'svelte-i18n';

	let isOpened = false;

	function open() {
		isOpened = !isOpened;
	}
</script>

<Title text="Chronicle" />
<p>{$_('home.chronicle')}</p>

<FadeInAnim type="scale-up-origin-top">
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
				{#each events as month, i}
					{@const sameMonthIndexes = events.reduce(
						(indexes, m, index) => (m === month ? indexes.concat(index) : indexes),
						[0].slice(1)
					)}
					<li class="row">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						<div class="year" class:no-pin={i != 0}>{@html fmtMonth(month)} {year}</div>
						<div class="event">
							{$_(
								`chronicle.${year}.${month}${
									1 < sameMonthIndexes.length ? '.' + sameMonthIndexes.indexOf(i) : ''
								}`
							)}
						</div>
					</li>
				{/each}
			{/each}
		</ul>
	</div>
</FadeInAnim>

<style lang="scss">
	@use '$lib/stylesheets/chronicle';
</style>
