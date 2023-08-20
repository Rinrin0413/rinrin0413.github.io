<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	import { add_class_on_visible } from '$lib/util';
	import { _ } from 'svelte-i18n';

	onMount(fade_in);
	if (browser) window.addEventListener('scroll', fade_in);

	function fade_in() {
		add_class_on_visible(document.getElementsByClassName('act'), 'fade-in-up-zoom');
	}
</script>

<div class="container">
	<div class="act act-prog" class:fade-in-up-zoom={false}>
		<h1 id="acivity-programming" class="c5">Programming</h1>
		<p>{$_('activities.programming.desc')}</p>
		<br />
		<h2 class="c5"><a href="https://rust-lang.org">Rust</a></h2>
		<p>{$_('activities.programming.rust')}</p>
		<br />
		<h2 class="c5">Graphics</h2>
		<p>
			{$_('activities.programming.graphics.desc')}<br />{$_(
				'activities.programming.graphics.langsToUse'
			)}<br />
			<a href="https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl"
				>HLSL</a
			>({$_('activities.programming.graphics.mayNotUse')}),
			<a href="https://opengl.org">GLSL</a>,
			<a href="https://w3.org/TR/WGSL">WGSL</a>
		</p>
		<br />
		<h2 class="c5">Web Dev.</h2>
		<p>
			{$_('activities.programming.webdev.0')}<a href="https://sass-lang.com">Sass</a>{$_(
				'activities.programming.webdev.1'
			)}<a href="https://svelte.dev/">Svelte</a>{$_('activities.programming.webdev.2')}
		</p>
		<br />
		<h2 class="c5"><a href="https://git-scm.com">Git</a></h2>
		<p>
			{$_('activities.programming.git.0')}<a href="https://github.com">GitHub</a>{$_(
				'activities.programming.git.1'
			)}
		</p>
	</div>
	<div class="act act-game" class:fade-in-up-zoom={false}>
		<h1 id="acivity-game" class="c5">Game</h1>
		<p>{$_('activities.game.desc')}</p>
		<br />
		<h2><a href="https://tetr.io">TETR.IO</a></h2>
		<p>{$_('activities.game.tetrio')}</p>
		<br />
		<h2><a href="https://minecraft.net">Minecraft</a></h2>
		<p>{$_('activities.game.mc.0')}<del>{$_('w.microsoft')}</del>{$_('activities.game.mc.1')}</p>
		<br />
		<h2><a href="https://thatskygame.com">Sky: Children of the Light</a></h2>
		<p>{$_('activities.game.sky')}</p>
	</div>
	<div class="act act-music" class:fade-in-up-zoom={false}>
		<h1 id="acivity-music" class="c5">Music</h1>
		<p class="subtitle">|♫|♪♬♪|♪♫:|❙♪|❙</p>
		<br />
		<h2>Listen</h2>
		<p>{$_('activities.music.listen')}</p>
		<br />
		<h2>Play</h2>
		<p>{$_('activities.music.play')}</p>
		<br />
		<h2>Compose</h2>
		<p>
			{$_('activities.music.compose.0')}<a href="https://musescore.org">MuseScore 3, 4</a>{$_(
				'activities.music.compose.1'
			)}
		</p>
		<br />
		<h2>Sing</h2>
		<p>{$_('activities.music.sing')}</p>
	</div>
</div>

<style lang="scss">
	@use '/assets/stylesheets/activities';
</style>
