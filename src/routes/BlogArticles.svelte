<script lang="ts">
	import ArticleCard from '$lib/components/ArticleCard.svelte';

	import type { ArticleMetadata } from '$lib/types';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { addClassOnVisible } from '$lib/util';

	export let articles: ArticleMetadata[];

	onMount(fadeIn);
	if (browser) window.addEventListener('scroll', fadeIn);

	function fadeIn() {
		addClassOnVisible(document.querySelectorAll('.article-card-container'), 'fade-in-up-zoom');
	}
</script>

<ul>
	{#each articles as meta}
		<li class="article-card-container" class:fade-in-up-zoom={false}>
			<ArticleCard {meta} mini />
		</li>
	{/each}
</ul>

<style lang="scss">
	@use '/assets/stylesheets/utils/fade_in_up_zoom';

	ul {
		max-width: 748px;
		padding: 0;
		margin: 0 auto;
		list-style: none;
	}

	li {
		margin: 12px 8px;
	}
</style>
