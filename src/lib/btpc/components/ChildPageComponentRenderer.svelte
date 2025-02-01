<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	export let component: typeof SvelteComponent;
</script>

<article class="child-page-body"><div><svelte:component this={component} /></div></article>

<style lang="scss" global>
	@use '$lib/btpc/stylesheets/for_markdown';
</style>
