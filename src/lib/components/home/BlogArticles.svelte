<script lang="ts">
	import FadeInUpAnim from '$lib/components/FadeInUpAnim.svelte';
	import ArticleCard from '$lib/components/ArticleCard.svelte';

	import type { ArticleMetadata } from '$lib/types';

	export let articles: ArticleMetadata[];
</script>

<ul>
	{#each articles as meta}
		<li>
			<FadeInUpAnim>
				<ArticleCard {meta} mini />
			</FadeInUpAnim>
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
