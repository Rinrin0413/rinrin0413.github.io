<script lang="ts">
	import Title2 from '$lib/components/Title2.svelte';
	import Tag from './Tag.svelte';

	import type { ArticleTagWithCount } from '$lib/types';
	import { _ } from 'svelte-i18n';
	import { fly, scale } from 'svelte/transition';
	import { bounceOut } from 'svelte/easing';

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
			<div
				in:fly|global={{ y: -18, duration: 400, delay: i * 52, easing: bounceOut }}
				out:scale={{ duration: 200, delay: (allTags.length - i) * 16 }}
			>
				<Tag name={tag} {count} isEnabled={pickedTags.includes(tag)} />
			</div>
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

	div {
		display: inline-block;
	}
</style>
