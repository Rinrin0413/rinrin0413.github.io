<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		component: Component;
	}

	let { component: ChildComponent }: Props = $props();
</script>

<article class="child-page-body"><div><ChildComponent /></div></article>

<style lang="scss" global>
	@use '$lib/btpc/stylesheets/for_markdown';
</style>
