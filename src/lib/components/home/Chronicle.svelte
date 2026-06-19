<script lang="ts">
	import { once } from 'svelte/legacy';

	import Title from '$lib/components/Title.svelte';
	import FadeInAnim from '$lib/components/FadeInAnim.svelte';

	import { CHRONICLE } from '$lib/scripts/data/chronicle';
	import { fmtMonth } from '$lib/scripts/utils';
	import { _ } from 'svelte-i18n';

	let isOpened = $state(false);

	function open() {
		isOpened = !isOpened;
	}
</script>

<Title text="Chronicle" />
<p>{$_('home.chronicle')}</p>

<FadeInAnim type="scale-up-origin-top">
	<div
		class="container"
		title={!isOpened ? $_('chronicle.expand') : ''}
		role="button"
		tabindex={isOpened ? -1 : 0}
		onclick={once(open)}
		onkeypress={once((e) => {
			if ((e as KeyboardEvent).key === 'Enter') open();
		})}
	>
		<ul class:opened={isOpened} data-text="{$_('chronicle.expand')} ▼">
			{#each CHRONICLE as { year, events } (year)}
				{#each events as month, i (i)}
					{@const sameMonthIndexes = events.reduce(
						(indexes, m, index) => (m === month ? indexes.concat(index) : indexes),
						[0].slice(1)
					)}
					<li class="row">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						<div class="year" class:no-pin={i !== 0}>{@html fmtMonth(month)} {year}</div>
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
