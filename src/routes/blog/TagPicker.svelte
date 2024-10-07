<script lang="ts">
	import Title2 from '$lib/components/Title2.svelte';
	import Tag from './Tag.svelte';

	import type { ArticleTagWithCount } from '$lib/scripts/types';
	import { _ } from 'svelte-i18n';

	export let allTags: ArticleTagWithCount[];
	export let pickedTags: string[];

	let isOpened = true;
</script>

<button on:click={() => (isOpened = !isOpened)}>
	<span class:opened={isOpened}><Title2 text={$_('w.tags')} style="margin: 0;" /></span>
</button>

<ul>
	{#each allTags as { tag, count }, i}
		{#if isOpened}
			<Tag
				name={tag}
				{count}
				isEnabled={pickedTags.includes(tag)}
				index={i}
				negativeIndex={allTags.length - i}
			/>
		{/if}
	{/each}
</ul>

<style lang="scss">
	button {
		margin-bottom: 16px;
		font-family: inherit;
		color: inherit;
		background: none;
		border: none;
		cursor: pointer;
	}

	span {
		&::before {
			content: '▼';
			display: inline-block;
			font-size: 18px;
			rotate: -90deg;
			transition: 0.2s;
		}

		&.opened::before {
			rotate: 0deg;
		}
	}
	ul {
		padding: 0;
		margin: 6px 0;
		margin-bottom: 32px;
	}
</style>
