<script lang="ts">
	import { fly } from 'svelte/transition';

	let willScrollUp = false;
	let lastScrollPos = 0;

	let scrollY: number;

	$: {
		willScrollUp = scrollY < lastScrollPos;
		lastScrollPos = scrollY;
	}
</script>

<svelte:window bind:scrollY />

{#if 800 < scrollY && willScrollUp}
	<button on:click={() => document.body.scrollIntoView()} transition:fly={{ x: 86, duration: 500 }}>
		<!--
			Bootstrap Icons - Arrow up circle fill
			https://icons.getbootstrap.com/icons/arrow-up-circle-fill

			Copyright (c) 2019 The Bootstrap Authors
			under the MIT License: https://github.com/twbs/icons/blob/main/LICENSE
		-->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			class="bi bi-arrow-up-circle-fill"
			viewBox="0 0 16 16"
		>
			<path
				d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"
			/>
		</svg>
	</button>
{/if}

<style lang="scss">
	@use '/assets/stylesheets/variables/color' as *;
	@use '/assets/stylesheets/variables/mixin' as *;

	button {
		position: fixed;
		top: 53svh;
		right: 24px;
		cursor: pointer;
		background: none;
		border: none;
		appearance: none;
	}

	svg {
		width: 64px;
		height: auto;
		color: $txt-primary;
		opacity: 0.3;
		transition: 0.4s;

		&:hover {
			opacity: 0.7;
			transform: translateY(-6px);
		}
	}

	@include sp {
		button {
			right: 10px;
		}

		svg {
			width: 48px;
		}
	}
</style>
