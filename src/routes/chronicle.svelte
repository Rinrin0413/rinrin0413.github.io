<script lang="ts">
	import { chronicle } from '$lib/data/chronicle';
	import { fmt_month } from '$lib/util';

	let is_opened = false;

	function toggle() {
		is_opened = !is_opened;
	}
</script>

<div class="container">
	<ul
		class:opened={is_opened}
		title={!is_opened ? 'Open' : ''}
		on:click|once={toggle}
		on:keypress|once={(e) => {
			if (e.key === 'Enter') toggle;
		}}
	>
		{#each chronicle as { year, events }}
			{#each events as { month, event }, i}
				<li>
					<h1 class:no-pin={i != 0}>{@html fmt_month(month)} {year}</h1>
					<div>{event}</div>
				</li>
			{/each}
		{/each}
	</ul>
</div>

<style lang="scss">
	@import '/assets/stylesheets/chronicle';
</style>
