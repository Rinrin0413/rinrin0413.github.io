<script lang="ts">
	import Hr from '$lib/components/Hr.svelte';

	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { _ } from 'svelte-i18n';

	
	
	
	
	
	interface Props {
		/**
	 * e.g.:
	 * - `"boss-health-bar"`
	 *
	 * This filename is used like `/images/creations/{filename}.png` as a path of the image.
	 */
		filename: string;
		/** The width of the frame. (pixels) */
		frameWidth: number;
		/** The height of the frame. (pixels) */
		frameHeight: number;
		/** The number of frames. */
		frameCount: number;
		/** The speed of the animation. (milliseconds) */
		animSpeed: number;
	}

	let {
		filename,
		frameWidth,
		frameHeight,
		frameCount,
		animSpeed
	}: Props = $props();

	let interval: number;
	let isPlaying = $state(true);
	let currentFrame = $state(0);

	onMount(() => {
		updateDimensions();

		interval = window.setInterval(() => {
			if (isPlaying) currentFrame = (currentFrame + 1) % frameCount;
		}, animSpeed);
		return () => clearInterval(interval);
	});
	if (browser) addEventListener('resize', updateDimensions);

	let elem: HTMLDivElement | undefined = $state();
	let width = $derived(frameWidth);
	let height = $derived(frameHeight);

	function updateDimensions() {
		if (elem !== undefined && elem.parentElement !== null) {
			// Calculate `floor(width / frameWidth) * frameWidth` to prevent the frame from being cut off.
			width =
				Math.floor(parseInt(window.getComputedStyle(elem.parentElement).width) / frameWidth) *
				frameWidth;
			height = (width * frameHeight) / frameWidth;
		} else {
			width = 0;
			height = 0;
		}
	}
</script>

<div
	class="player"
	style="
		width: {width}px;
		aspect-ratio: {frameWidth} / {frameHeight};
		background-image: url('/images/creations/{filename}.png');
		background-position: 0 {elem !== undefined ? -height * currentFrame : 0}px;
	"
	bind:this={elem}
></div>

<p>{currentFrame + 1} / {frameCount} {$_('creations.textureAtlasPlayer.frames')}</p>

<input type="range" bind:value={currentFrame} min="0" max={frameCount - 1} />

<div class="btn-wrapper">
	<button onclick={() => (isPlaying = !isPlaying)}>
		<img
			src="/images/google-material-design-icons/{isPlaying
				? 'pause_24dp_533618_FILL1_wght400_GRAD0_opsz24'
				: 'play_arrow_24dp_533618_FILL1_wght400_GRAD0_opsz24'}.svg"
			alt=""
		/>
	</button>
</div>

<p class="title">{$_('creations.textureAtlasPlayer.title')}</p>

<Hr />

<style lang="scss">
	@use '$lib/stylesheets/variables/color' as *;
	@use '$lib/stylesheets/variables/mixin' as *;

	.player {
		height: auto;
		margin: 24px auto;
		background-repeat: no-repeat;
		background-size: cover;
		image-rendering: pixelated;
	}

	p {
		text-align: center;
	}

	input[type='range'] {
		width: 100%;
		accent-color: $txt-primary;
	}

	.btn-wrapper {
		text-align: center;
	}

	button {
		padding: 6px;
		@include button;
	}

	img {
		width: 32px;
		aspect-ratio: 1;
		vertical-align: middle;
	}

	.title {
		font-size: 22px;
	}
</style>
