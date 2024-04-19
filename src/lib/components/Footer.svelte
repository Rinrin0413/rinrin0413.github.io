<script lang="ts">
	import { onMount } from 'svelte';
	import { COPYRIGHT } from '$lib/variables';
	import FeedButton from './FeedButton.svelte';
	import { _ } from 'svelte-i18n';

	let wallpaperPath: string;

	onMount(() => {
		const htmlElms = document.getElementsByTagName('html');
		if (0 < htmlElms.length) {
			const bgImg = getComputedStyle(htmlElms[0], '::before').backgroundImage;
			// Extract the URL from the CSS function `url()`.
			wallpaperPath = bgImg.replace(/.*url\("(.*)"\).*/, '$1');
		}
	});
</script>

<footer>
	<p class="copyright">{COPYRIGHT}</p>
	<div class="feed-btn"><FeedButton /></div>
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
	{#if wallpaperPath !== undefined}
		<a href={wallpaperPath} target="_blank" rel="noopener noreferrer" class="btn-to-wallpaper">
			<span>{$_('footer.bgWallpaper')}</span>
		</a>
	{/if}
</footer>

<style lang="scss">
	@use '/assets/stylesheets/footer';
</style>
