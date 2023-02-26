<script lang="ts">
	import Space from '$lib/components/space.svelte';

	export let text: string;

	/** Japanese text */
	export let ja = '';
</script>

<h1 id="{text}," title={ja}>{text}</h1>
<h1 id="shadow">{text}</h1>
<Space height={'64px'} />

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
			transform: translateX(-50%) scale(1, -1) perspective(128px) rotate3d(-1, 0, 0, 45deg);
			// transform-origin: 50% 43px;
			filter: blur(1.2px);
			color: transparent;
			background: linear-gradient(0deg, rgba($text-primary, 0.4), transparent 72%);
			background-clip: text;
			-webkit-background-clip: text;
			user-select: none;
		}
	}
</style>
