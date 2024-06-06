<script lang="ts">
	import { onMount } from 'svelte';
	import { COPYRIGHT } from '$lib/scripts/variables';
	import { _, locale } from 'svelte-i18n';

	let wallpaperPath: string;

	onMount(() => {
		const bgImg = getComputedStyle(document.documentElement, '::before').backgroundImage;
		// Extract the URL from the CSS function `url()`.
		wallpaperPath = bgImg.replace(/.*url\("(.*)"\).*/, '$1');
	});

	const SITEMAP = [
		{ name: 'Home', path: '/' },
		{ name: 'Profile', path: '/profile' },
		{ name: 'Blog', path: '/blog' },
		{ name: 'Web Tools', path: '/tools' },
		{ name: 'Projects', path: '/projects' },
		{ name: 'Creations', path: '/creations' },
		{ name: 'Social', path: '/social' }
	];
</script>

<footer>
	<div class="content">
		<p>{COPYRIGHT}</p>
		<div class="links">
			<nav>
				<h1>{$_('w.sitemap')}</h1>
				<ul>
					{#each SITEMAP as { name, path }}
						<li><a href={path}>{name}</a></li>
					{/each}
				</ul>
			</nav>
			<div>
				<nav>
					<h1>{$_('w.otherLinks')}</h1>
					<ul>
						<li><a href="/acknowledgments">Acknowledgments</a></li>
						{#if wallpaperPath !== undefined}
							<li><a href={wallpaperPath}>{$_('w.bgWallpaper')}</a></li>
						{/if}
						<li>
							<a href="/feed">{$_('w.rssAtomFeed')}</a>
						</li>
						<li><a href="/sitemap.xml">sitemap.xml</a></li>
					</ul>
				</nav>
				<div class="lang">
					{#if $locale == 'ja'}
						<button disabled>日本語</button>
					{:else}
						<button on:click={() => locale.set('ja')} class="active">日本語</button>
					{/if}
					|
					{#if $locale == 'en'}
						<button disabled>English</button>
					{:else}
						<button
							on:click={() => {
								locale.set('en');
								alert('Some parts may not be translated.');
							}}
							class="active">English</button
						>
					{/if}
				</div>
			</div>
		</div>
	</div>
</footer>

<style lang="scss">
	@use '$lib/stylesheets/footer';
</style>
