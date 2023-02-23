<script lang="ts">
	import { copyright } from '$lib/variables';
</script>

<footer>
	<h1>{copyright}</h1>
</footer>

<style lang="scss">
	@use '/assets/stylesheets/variables/color' as *;
	@use '/assets/stylesheets/variables/dimension' as *;

	footer {
		height: $footer-height;
		background-color: $text-primary;
		color: $bg-primary;

		h1 {
			font-size: 18px;
			font-weight: 200;
			padding: 32px 0;
			margin: 0;
		}
	}
</style>
