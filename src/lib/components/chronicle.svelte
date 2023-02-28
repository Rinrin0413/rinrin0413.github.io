<script lang="ts">
	import { chronicle } from '$lib/data/chronicle';
	import { fmt_month } from '$lib/util';
</script>

<ul>
	{#each chronicle as { year, events }}
		{#each events as { month, event }, i}
			<li>
				<h1 class:no-pin={i != 0}>{@html fmt_month(month)} {year}</h1>
				<div>{event}</div>
			</li>
		{/each}
	{/each}
</ul>

<style lang="scss">
	@import '/assets/stylesheets/chronicle';
</style>
