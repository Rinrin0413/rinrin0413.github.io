<script lang="ts">
	import Title2 from '$lib/components/Title2.svelte';
	import Tag from './Tag.svelte';

	import type ArticleTagWithCount from '$lib/types/ArticleTagWithCount';
	import { fly, scale } from 'svelte/transition';
	import { bounceOut } from 'svelte/easing';

	export let allTags: ArticleTagWithCount[];
	export let pickedTags: string[];

	let isOpened = true;
</script>

<button on:click={() => isOpened = !isOpened}>
	<span class:opened={isOpened}><Title2 text="Tags" /></span>
</button>

{#if isOpened}<ul>{#each allTags as { tag, count }, i}
	<div
		in:fly={{ y: -18, duration: 400, delay: i * 52, easing: bounceOut }}
		out:scale={{ duration: 200, delay: (allTags.length -i) * 16 }}
	>
		<Tag name={tag} {count} isEnabled={pickedTags.includes(tag)} />
	</div>
{/each}</ul>{/if}

<style lang="scss">
	button {
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

	div {
		display: inline-block;
	}
</style>
