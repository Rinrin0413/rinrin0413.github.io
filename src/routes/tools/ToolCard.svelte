<script lang="ts">
	import type { ToolMetadata } from '$lib/scripts/types';

	export let meta: ToolMetadata;

	const id = meta.id ?? 'unreachable';
</script>

<a href="/tools/{id}"
	><article>
		<div class="meta">
			<h2>{meta.title}</h2>
			{#if meta.desc}
				<p>{meta.desc}</p>
			{/if}
			{#if meta.tags}
				<ul>
					{#each meta.tags as tag}
						<li><span class="tag-btn">{tag.toUpperCase()}</span></li>
					{/each}
				</ul>
			{/if}
		</div>
	</article></a
>

<style lang="scss">
	@use '$lib/stylesheets/tools/tool_card';
</style>
