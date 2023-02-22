<script lang="ts">
	import { browser } from '$app/environment';

	let is_at_top = true;

	if (browser) {
		window.addEventListener('scroll', () => {
			is_at_top = window.scrollY === 0;
		});
	}
</script>

<div id="header-bg" class:blur={is_at_top} />
<header>
	<div>
		<p>ヘッダーだよ</p>
	</div>
</header>
<div id="header-space" />

<style lang="scss">
	@use 'sass:math';

	@use '/assets/stylesheets/variables/color' as *;
	@use '/assets/stylesheets/variables/dimension' as *;

	header,
	#header-bg {
		position: fixed;
		top: 0;
		left: 0;
	}

	header {
		width: 100vw;
		height: $header-height;
	}

	#header-bg {
		width: 120vw;
		height: $header-height * 2;
		transform: translate(-10vw, -$header-height);
		background: linear-gradient(-6deg, $header-primary, $header-secondary);
		box-shadow: 0 4px 14px $header-primary;
		transition: 0.5s;

		&.blur {
			transform: translate(-10vw, math.div(-$header-height, 2));
			filter: blur(32px);
			background: radial-gradient(
				ellipse at center,
				$header-secondary 20%,
				$header-tertiary 25%,
				$header-primary 75%
			);
		}
	}

	#header-space {
		display: block;
		height: $header-height * 2;
	}
</style>
