<script lang="ts">
	import { goto } from '$app/navigation';
	import { fly, scale } from 'svelte/transition';
	import { bounceOut } from 'svelte/easing';
	import { page } from '$app/stores';

	export let name: string;
	export let count: number;
	export let isEnabled: boolean;
	export let index: number;
	export let negativeIndex: number;

	const path = $page.url.pathname;

	function toggle() {
		isEnabled = !isEnabled;

		const params = new URLSearchParams(location.search).getAll('t');
		let tagsInParam = 0 < params.length ? params[0].split(',') : [];
		if (isEnabled) {
			tagsInParam.push(name);
		} else {
			tagsInParam = tagsInParam.filter((t) => t !== name);
		}

		goto(path + (0 < tagsInParam.length ? '?t=' + tagsInParam.join(',') : ''));
	}
</script>

<li
	class:enabled={isEnabled}
	in:fly|global={{ y: -18, duration: 400, delay: index * 52, easing: bounceOut }}
	out:scale={{ duration: 200, delay: negativeIndex * 16 }}
>
	<button on:click={toggle} class="tag-btn">
		{name.toUpperCase()}({count})
	</button>
	<a href="{path}{isEnabled ? '' : '?t=' + name}" class="tag-btn">{name.toUpperCase()}({count})</a>
</li>

<style lang="scss">
	@use '$lib/stylesheets/variables/mixin' as *;

	@use '$lib/btpc/stylesheets/tag';

	li:not(.enabled) {
		$disabled-opacity: 0.53;

		opacity: $disabled-opacity;
		transition: 0.17s;

		&:hover {
			opacity: 0.7;

			@include sp {
				opacity: $disabled-opacity;
			}
		}
	}

	.tag-btn {
		padding-right: 1px;
	}

	button {
		@include hideWhenNoJs;
	}

	a {
		@media (scripting: enabled) {
			display: none;
		}
	}
</style>
