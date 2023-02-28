<script lang="ts">
	import Space from '$lib/components/space.svelte';

	import { browser } from '$app/environment';

	export let text: string;

	/** Japanese text */
	export let ja = '';

	let vw: number;
	let node: HTMLHeadingElement;
	let init_width: number;
	let is_overflown = false;

	if (browser) {
		update_vw();

		window.addEventListener('resize', update_vw);
	}

	$: if (node) {
		if (!init_width) {
			init_width = node.offsetWidth;
		}
		is_overflown = vw <= init_width;
	}

	function update_vw() {
		vw = window.innerWidth;
	}
</script>

<div class:mini={is_overflown}>
	<h1 title={ja} bind:this={node}>{text}</h1>
	<h1 id="shadow">{text}</h1>
	<Space height={'64px'} />
</div>

<style lang="scss">
	@use '/assets/stylesheets/variables/color' as *;

	h1 {
		font-size: 36px;
		font-weight: 900;
		margin: 0;
		white-space: nowrap;
		position: absolute;
		left: 50%;

		&:not(#shadow) {
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

		&#shadow {
			transform: translateX(-50%) scale(1, -1);
			transform-origin: 50% 43px;
			filter: blur(1.2px);
			color: transparent;
			background: linear-gradient(0deg, rgba($text-primary, 0.4), transparent 72%);
			background-clip: text;
			-webkit-background-clip: text;
			user-select: none;
		}
	}

	.mini h1 {
		font-size: 26px;

		&:not(#shadow) {
			&::before,
			&::after {
				width: 16px;
			}
		}
	}
</style>
