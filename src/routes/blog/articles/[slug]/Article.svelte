<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	export let body: typeof SvelteComponent;
</script>

<article class="article-body"><div><svelte:component this={body} /></div></article>

<style lang="scss" global>
	@use '/assets/stylesheets/blog/article-body';
</style>
