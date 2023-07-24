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
			{$_('activities.programming.graphics.desc')}<br />{$_('activities.programming.graphics.langsToUse')}<br />
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
				'activities.webdev.1'
			)}<a href="https://svelte.dev/">Svelte</a>{$_('activities.programming.webdev.2')}
		</p>
		<br />
		<h2 class="c5"><a href="https://git-scm.com">Git</a></h2>
		<p>
			{$_('activities.programming.git.0')}<a href="https://github.com">GitHub</a>{$_('activities.programming.git.1')}
		</p>
	</div>
	<div class="act act-game" class:fade-in-up-zoom={false}>
		<h1 id="acivity-game" class="c5">Game</h1>
		<p>{$_('activities.game.desc')}</p>
		<br />
		<h2><a href="https://tetr.io">TETR.IO</a></h2>
		<p>{$_('activities.game.tetrio')}</p>
		<br />
		<h2><a href="https://www.minecraft.net">Minecraft</a></h2>
		<p>
			一番長くやってる。Wii U版と統合版はもうやってなくて Java版がメイン。 Wii
			U版やってた時代では建築していることが多かった。統合版始めてからはアドオン開発やらシェーダー開発もするようになったが、<del
				>マイクロソフト</del
			>による度重なる破壊活動でもう完全に萎えた。 Java版では ちまちま開発している。
		</p>
		<br />
		<h2><a href="https://www.thatskygame.com">Sky: Children of the Light</a></h2>
		<p>最近は時間が取れなくてあんまりログインできていない。誘ってくれれば行くかも。</p>
	</div>
	<div class="act act-music" class:fade-in-up-zoom={false}>
		<h1 id="acivity-music" class="c5">Music</h1>
		<p class="subtitle">|♫|♪♬♪|♪♫:|❙♪|❙</p>
		<br />
		<h2>Listen</h2>
		<p>
			古典派とロマン派の(主にピアノの)クラシック曲が好き。特にフランツ・リストの作品をよく聴く。
		</p>
		<br />
		<h2>Play</h2>
		<p>
			全く上手くないが上記のようなクラシック曲とかをピアノで弾いてる。
			アルトリコーダーやらアコースティックギターやらも家にあるが全く触らない。
		</p>
		<br />
		<h2>Compose</h2>
		<p>
			クラシックっぽい曲を作ったりクラシックを編曲したり。 ただし理論をほとんど考えていないので
			コード進行とかについては何も知らない。 作曲には基本的に MuseScore 3, 4 を使っている。
		</p>
	</div>
</div>

<style lang="scss">
	@use '/assets/stylesheets/activities';
</style>
