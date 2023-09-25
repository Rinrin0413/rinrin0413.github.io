<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let tags: string[] | null;
</script>

{#if tags && 0 < tags.length}
	<div id="tags">
		<span>{$_('w.tags')}</span>
		<ul>
			{#each tags as tag}
				<li><a href={`/blog/t=${tag}`}>{tag.toUpperCase()}</a></li>
			{/each}
		</ul>
	</div>
{/if}

<style lang="scss">
	@use '/assets/stylesheets/variables/mixin' as *;

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

	li {
		display: inline-block;
		padding: 1px 6px;
		margin-right: 6px;
		margin-bottom: 4px;
		background-color: #1f1f1f;
		border-radius: 3px;

		@include sp {
			margin-bottom: 13px;
		}
	}

	a {
		font-family: 'Source Code Pro', monospace;
		color: #e9e9e9;
		font-size: 16px;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}
</style>
