<script lang="ts">
	import { COPYRIGHT } from '$lib/variables';
	import { _ } from 'svelte-i18n';
</script>

<footer>
	<p class="copyright">{COPYRIGHT}</p>
	<a href="/feed" class="feed-btn no-after-icn" title={$_('footer.atomFeed')} target="_blank">
		<!-- 
			Google Material Symbols and Icons - RSS Feed
			https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Arss_feed%3AFILL%400%3Bwght%40400%3BGRAD%400%3Bopsz%4024
			
			This icon is licensed under the Apache License Version 2.0: https://github.com/google/material-design-icons/blob/master/README.md
		-->
		<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" class="rss-icon"><path d="M200-120q-33 0-56.5-23.5T120-200q0-33 23.5-56.5T200-280q33 0 56.5 23.5T280-200q0 33-23.5 56.5T200-120Zm480 0q0-117-44-218.5T516-516q-76-76-177.5-120T120-680v-120q142 0 265 53t216 146q93 93 146 216t53 265H680Zm-240 0q0-67-25-124.5T346-346q-44-44-101.5-69T120-440v-120q92 0 171.5 34.5T431-431q60 60 94.5 139.5T560-120H440Z"/></svg>
	</a>
	<a href="/" class="go-to-home-btn">
		<!-- 
			Bootstrap Icons - House door fill
			https://icons.getbootstrap.com/icons/house-door-fill/
			
			Copyright (c) 2019 The Bootstrap Authors
			under the MIT License: https://github.com/twbs/icons/blob/main/LICENSE
		-->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			viewBox="0 0 16 16"
			class="home-icon"
		>
			<path
				d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"
			/>
		</svg>
		<span class="home-text">HOME</span>
	</a>
</footer>

<style lang="scss">
	@use '/assets/stylesheets/footer';
</style>
