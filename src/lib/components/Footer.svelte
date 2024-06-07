<script lang="ts">
	import { onMount } from 'svelte';
	import { _, locale } from 'svelte-i18n';
	import { COPYRIGHT } from '$lib/scripts/variables';
	import FadeInAnim from './FadeInAnim.svelte';

	let wallpaperPath: string;

	onMount(() => {
		const bgImg = getComputedStyle(document.documentElement, '::before').backgroundImage;
		// Extract the URL from the CSS function `url()`.
		wallpaperPath = bgImg.replace(/.*url\("(.*)"\).*/, '$1');
	});

	$: isLocaleEng = typeof $locale === 'string' && $locale.startsWith('en');

	const SITEMAP = [
		{ name: 'Home', path: '/' },
		{ name: 'Profile', path: '/profile' },
		{ name: 'Blog', path: '/blog' },
		{ name: 'Web Tools', path: '/tools' },
		{ name: 'Projects', path: '/projects' },
		{ name: 'Creations', path: '/creations' },
		{ name: 'Social', path: '/social' }
	];

	const ANIM_TYPE = 'slide-left';
	const ANIM_DELAY_STEP = 50;
	const ANIM_DELAY_OTHER_LINKS = ANIM_DELAY_STEP * SITEMAP.length * 0.5;
</script>

<footer>
	<div class="content">
		<p>{COPYRIGHT}</p>
		<div class="links">
			<nav>
				<h1>{$_('w.sitemap')}</h1>
				<ul>
					{#each SITEMAP as { name, path }, i}
						<li>
							<FadeInAnim type={ANIM_TYPE} delay={ANIM_DELAY_STEP * i} evenLittleBit>
								<a href={path}>{name}</a>
							</FadeInAnim>
						</li>
					{/each}
				</ul>
			</nav>
			<div>
				<nav>
					<h1>{$_('w.otherLinks')}</h1>
					<ul>
						<FadeInAnim type={ANIM_TYPE} delay={ANIM_DELAY_OTHER_LINKS + 100} evenLittleBit>
							<li><a href="/acknowledgments">Acknowledgments</a></li>
						</FadeInAnim>
						<FadeInAnim type={ANIM_TYPE} delay={ANIM_DELAY_OTHER_LINKS + 200} evenLittleBit>
							{#if wallpaperPath !== undefined}
								<li><a href={wallpaperPath}>{$_('w.bgWallpaper')}</a></li>
							{/if}
						</FadeInAnim>
						<FadeInAnim type={ANIM_TYPE} delay={ANIM_DELAY_OTHER_LINKS + 300} evenLittleBit>
							<li>
								<a href="/feed">{$_('w.rssAtomFeed')}</a>
							</li>
						</FadeInAnim>
						<FadeInAnim type={ANIM_TYPE} delay={ANIM_DELAY_OTHER_LINKS + 400} evenLittleBit>
							<li><a href="/sitemap.xml">sitemap.xml</a></li>
						</FadeInAnim>
					</ul>
				</nav>
				<div class="lang">
					{#if isLocaleEng}
						<button on:click={() => locale.set('ja')} class="active">日本語</button>
					{:else}
						<button disabled>日本語</button>
					{/if}
					|
					{#if isLocaleEng}
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
