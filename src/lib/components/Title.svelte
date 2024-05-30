<script lang="ts">
	import Space from '$lib/components/Space.svelte';

	import { browser } from '$app/environment';

	export let text: string;

	/**
	 * Defines a unique identifier (ID) which must be unique in the whole document.
	 * Its purpose is to identify the element when linking (using a fragment identifier).
	 */
	export let id: string | undefined | null = null;

	let vw: number;
	let node: HTMLHeadingElement;
	let initWidth: number;
	let isOverflown = false;

	if (browser) {
		updateVw();

		window.addEventListener('resize', updateVw);
	}

	$: if (node) {
		if (!initWidth) {
			initWidth = node.offsetWidth;
		}
		isOverflown = vw <= initWidth;
	}

	function updateVw() {
		vw = window.innerWidth;
	}
</script>

<div class:mini={isOverflown}>
	<h1 {id} bind:this={node}>{text}</h1>
	<span data-content={text} />
	<Space height="64px" />
</div>

<style lang="scss">
	@use '/assets/stylesheets/variables/mixin' as *;
	@use '/assets/stylesheets/variables/color' as *;

	h1, span::before {
		font-size: 36px;
		margin: 0;
		white-space: nowrap;
		position: absolute;
		left: 50%;
		@include bold;
	}

	h1 {
		transform: translateX(-50%);

		&::before,
		&::after {
			content: '';
			display: inline-block;
			width: 64px;
			height: 2px;
			background-color: $line-primary;
			vertical-align: middle;
			white-space: nowrap;
		}

		&::before {
			margin-right: 10px;
		}

		&::after {
			margin-left: 10px;
		}
	}

	span::before {
		content: attr(data-content);
		transform: translateX(-50%) scale(1, -1);
		transform-origin: 50% 43px;
		filter: blur(1.2px);
		color: transparent;
		background: linear-gradient(0deg, rgba($txt-primary, 0.4), transparent 72%);
		background-clip: text;
		-webkit-background-clip: text;
		user-select: none;
		pointer-events: none;
		text-shadow: none;
	}

	.mini {
		h1, span::before {
			font-size: 26px;
		}

		h1 {
			&::before,
			&::after {
				width: 16px;
			}
		}

		span::before {
			transform-origin: 50% 31px;
		}
	}
</style>
