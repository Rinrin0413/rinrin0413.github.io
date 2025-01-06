<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';

	export let tags: string[] | null;
</script>

{#if tags !== null && 0 < tags.length}
	<div>
		<div class="tags">
			<span>{$_('w.tags')}</span>
			<ul>
				{#each tags as tag}
					<li>
						<a href="/{$page.url.pathname.split('/')[1]}/?t={tag}" class="tag-btn"
							>{tag.toUpperCase()}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}

<style lang="scss">
	@use '$lib/stylesheets/variables/mixin' as *;

	@use '$lib/btpc/stylesheets/tag';

	.tags {
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
