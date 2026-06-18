<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		component: Component;
	}

	let { component }: Props = $props();

	const SvelteComponent_1 = $derived(component);
</script>

<article class="child-page-body"><div><SvelteComponent_1 /></div></article>

<style lang="scss" global>
	@use '$lib/btpc/stylesheets/for_markdown';
</style>
