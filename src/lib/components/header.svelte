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
		<p>
			ヘッダーだよヘッダーだよヘッダーだよヘッダーだよヘッダーだよヘッダーだよヘッダーだよヘッダーだよヘッダーだよヘッダーだよ
		</p>
	</div>
</header>
<div id="header-space" />

<style lang="scss">
	@use '/assets/stylesheets/variables/color' as *;
	@use '/assets/stylesheets/variables/dimension' as *;

	header, #header-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: $header-height;
	}

	#header-bg {
		background: linear-gradient(-6deg, $header-primary, $header-secondary);
		box-shadow: 0 0 16px $header-primary;
		transition: .4s;

		&.blur {
			filter: blur(16px);
		}
	}

	#header-space {
		display: block;
		height: $header-height;
	}
</style>
