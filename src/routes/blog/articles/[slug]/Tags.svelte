<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let tags: string[] | null;
</script>

{#if tags && 0 < tags.length}
	<div id="tags">
		<span>{$_('w.tags')}</span>
		<ul>
			{#each tags as tag}
				<li><a href={`/blog?t=${tag}`} class="tag-btn">{tag.toUpperCase()}</a></li>
			{/each}
		</ul>
	</div>
{/if}

<style lang="scss">
	@use '/assets/stylesheets/variables/mixin' as *;

	@use '/assets/stylesheets/blog/tag';

	div {
		display: inline-block;
		padding-top: 8px;
		margin: 0 22px;
		margin-top: 22px;
		background-color: #fff8e7a4;
		border-radius: 4px;
		border: 3px solid #d6cbb1;
	}

	span {
		font-size: 18px;
		margin-right: 5px;
		color: #52411c;
		font-weight: bold;

		&::after {
			content: ':';
		}
	}

	ul {
		display: flex;
		list-style: none;
		padding: 0;
		margin: 6px 20px;
		margin-bottom: 12px;
		flex-wrap: wrap;
		justify-content: center;
	}

	.tag-btn:hover {
		text-decoration: underline;
	}
</style>
