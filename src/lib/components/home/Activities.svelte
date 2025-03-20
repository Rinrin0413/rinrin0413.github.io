<script lang="ts">
	import FadeInAnim from '$lib/components/FadeInAnim.svelte';
	import { _ } from 'svelte-i18n';
</script>

<div class="container">
	<FadeInAnim type="scale-up-origin-top">
		<div id="act-prog">
			<h1 id="activity-programming" class="c5">Programming</h1>
			<p>{$_('activities.programming.desc')}</p>
			<br />
			<h2 class="c5"><a href="https://rust-lang.org">Rust</a></h2>
			<p>{$_('activities.programming.rust')}</p>
			<br />
			<h2 class="c5">Graphics</h2>
			<p>
				{$_('activities.programming.graphics.desc')}
			</p>
			<p>
				{$_('activities.programming.graphics.langsToUse')}<br />
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
				)}<a href="https://svelte.dev/">Svelte</a>{$_('activities.programming.webdev.2')}<br />{$_(
					'activities.programming.webdev.3'
				)}
			</p>
			<br />
			<h2 class="c5"><a href="https://git-scm.com">Git</a></h2>
			<p>
				{$_('activities.programming.git.0')}<a href="https://github.com">GitHub</a>{$_(
					'activities.programming.git.1'
				)}
			</p>
		</div>
	</FadeInAnim>
	<FadeInAnim type="scale-up-origin-top">
		<div id="act-game">
			<h1 id="activity-game" class="c5">Game</h1>
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
	</FadeInAnim>
	<FadeInAnim type="scale-up-origin-top">
		<div id="act-music">
			<h1 id="activity-music" class="c5">Music</h1>
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
				{$_('activities.music.compose.0')}<a href="https://musescore.org">MuseScore Studio 3, 4</a
				>{$_('activities.music.compose.1')}
			</p>
			<br />
			<h2>Sing</h2>
			<p>{$_('activities.music.sing')}</p>
		</div>
	</FadeInAnim>
</div>

<style lang="scss">
	@use '$lib/stylesheets/activities';
</style>
