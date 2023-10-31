<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<a href="/feed" class="no-after-icn" title={$_('w.atomFeed')} target="_blank">
	<!-- 
        Google Material Symbols and Icons - RSS Feed
        https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Arss_feed%3AFILL%400%3Bwght%40400%3BGRAD%400%3Bopsz%4024
        
        This icon is licensed under the Apache License Version 2.0: https://github.com/google/material-design-icons/blob/master/README.md
    -->
	<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
		><path
			d="M200-120q-33 0-56.5-23.5T120-200q0-33 23.5-56.5T200-280q33 0 56.5 23.5T280-200q0 33-23.5 56.5T200-120Zm480 0q0-117-44-218.5T516-516q-76-76-177.5-120T120-680v-120q142 0 265 53t216 146q93 93 146 216t53 265H680Zm-240 0q0-67-25-124.5T346-346q-44-44-101.5-69T120-440v-120q92 0 171.5 34.5T431-431q60 60 94.5 139.5T560-120H440Z"
		/></svg
	>
</a>

<style lang="scss">
	@use '/assets/stylesheets/variables/color' as *;

	a {
		display: inline-block;
		$size: 32px;
		width: $size;
		height: $size;
		padding: 4px;
		background: $button-primary;
		border: 3px solid $button-secondary;
		border-radius: 4px;
		box-shadow: 0 0 14px #00000050;
		transition: 0.2s;

		&:hover {
			filter: brightness(1.06);
			transform: translateY(3px);
		}
	}

	svg {
		width: 100%;
		height: 100%;
		fill: $text-dark;
	}
</style>
