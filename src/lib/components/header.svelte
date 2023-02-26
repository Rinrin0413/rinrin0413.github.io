<script lang="ts">
	import { browser } from '$app/environment';

	let is_at_top = true;

	if (browser) {
		update_scroll()

		window.addEventListener('scroll', () => {
			update_scroll()
		});
	}

	function update_scroll() {
		is_at_top = window.scrollY <= 0;
	}
</script>

<div id="header-bg" class:blur={is_at_top} />
<header>
	<a href="/" id="logo" class:center={is_at_top}><img src="images/favicon.png" alt="Logo" /></a>
</header>

<style lang="scss">
	@use '/assets/stylesheets/header';
</style>
