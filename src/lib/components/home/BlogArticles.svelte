<script lang="ts">
	import FadeInAnim from '$lib/components/FadeInAnim.svelte';
	import ArticleCard from '$lib/components/blog/ArticleCard.svelte';

	import type { ArticleMetadata } from '$lib/btpc/scripts/types';

	export let articles: ArticleMetadata[];
</script>

<ul>
	{#each articles as meta}
		<li>
			<FadeInAnim type="scale-up-origin-top">
				<ArticleCard {meta} mini />
			</FadeInAnim>
		</li>
	{/each}
</ul>

<style lang="scss">
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
