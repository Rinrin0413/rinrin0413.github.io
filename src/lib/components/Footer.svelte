<script lang="ts">
	import { onMount } from 'svelte';
	import { _, locale } from 'svelte-i18n';
	import { isDrawerMenuOpened } from '$lib/scripts/stores';
	import { COPYRIGHT } from '$lib/scripts/variables';
	import FadeInAnim from './FadeInAnim.svelte';
	import { BG_IMG_URL } from '$lib/scripts/data/bg-img-url';

	let wallpaperPath: string;
	const hasBgImgUrl = BG_IMG_URL !== null;

	if (!hasBgImgUrl)
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

	function closeDrawerMenu() {
		isDrawerMenuOpened.set(false);
	}
</script>

<footer class:drawer-menu={$isDrawerMenuOpened}>
	<div class="content">
		{#if !$isDrawerMenuOpened}
			<p>{COPYRIGHT}</p>
		{/if}
		<div class="links">
			<nav>
				<h1>{$_('w.sitemap')}</h1>
				<ul>
					{#each SITEMAP as { name, path }, i}
						<li>
							<FadeInAnim
								type={ANIM_TYPE}
								delay={ANIM_DELAY_STEP * i}
								evenLittleBit
								playForced={$isDrawerMenuOpened}
							>
								<a href={path} on:click={closeDrawerMenu}>{name}</a>
							</FadeInAnim>
						</li>
					{/each}
				</ul>
			</nav>
			<div>
				<nav>
					<h1>{$_('w.otherLinks')}</h1>
					<ul>
						<li>
							<FadeInAnim
								type={ANIM_TYPE}
								delay={ANIM_DELAY_OTHER_LINKS + 100}
								evenLittleBit
								playForced={$isDrawerMenuOpened}
							>
								<a href="/acknowledgments" on:click={closeDrawerMenu}>Acknowledgments</a>
							</FadeInAnim>
						</li>
						{#if hasBgImgUrl || wallpaperPath !== undefined}
							<li>
								<FadeInAnim
									type={ANIM_TYPE}
									delay={ANIM_DELAY_OTHER_LINKS + 200}
									evenLittleBit
									playForced={$isDrawerMenuOpened}
								>
									<a
										href={BG_IMG_URL ?? wallpaperPath}
										target="_blank"
										rel="noopener noreferrer"
										class="no-after-icn">{$_('w.bgWallpaper')}</a
									>
								</FadeInAnim>
							</li>
						{/if}
						<li>
							<FadeInAnim
								type={ANIM_TYPE}
								delay={ANIM_DELAY_OTHER_LINKS + 300}
								evenLittleBit
								playForced={$isDrawerMenuOpened}
							>
								<a href="/feed">{$_('w.rssAtomFeed')}</a>
							</FadeInAnim>
						</li>
						<li>
							<FadeInAnim
								type={ANIM_TYPE}
								delay={ANIM_DELAY_OTHER_LINKS + 400}
								evenLittleBit
								playForced={$isDrawerMenuOpened}
							>
								<a href="/sitemap.xml">sitemap.xml</a>
							</FadeInAnim>
						</li>
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
		{#if $isDrawerMenuOpened}
			<p>{COPYRIGHT}</p>
		{/if}
	</div>
</footer>

<style lang="scss">
	@use '$lib/stylesheets/footer';
</style>
