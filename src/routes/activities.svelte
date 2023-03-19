<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { add_class_on_visible } from '$lib/util';

	onMount(fade_in);
	if (browser) window.addEventListener('scroll', fade_in);

	function fade_in() {
		add_class_on_visible(document.getElementsByClassName('act'), 'fade-in-up-zoom');
	}
</script>

<div class="container">
	<div class="act act-prog" class:fade-in-up-zoom={false}>
		<h1 id="acivity-programming" class="c5">Programming</h1>
		<p>開発しろ。</p>
		<br />
		<h2 class="c5"><a href="https://www.rust-lang.org">Rust</a></h2>
		<p>現在一番好きな言语🦀 名前の拡張子もRustです。 全开発者使用しろ。</p>
		<br />
		<h2 class="c5">Graphics</h2>
		<p>
			マインクラフト統合版でシェーダーを描いてから好きになった。
			現在はJava版の方でシェーダーを作っている。<br />
			使う言語は:
			<a href="https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl"
				>HLSL</a
			>(もう書かないかも),
			<a href="https://www.opengl.org">GLSL</a>,
			<a href="https://www.w3.org/TR/WGSL">WGSL</a>
		</p>
		<br />
		<h2 class="c5">Web Dev.</h2>
		<p>
			基本的にスタイルシートでストレスが溜まるのであまりやりたくない。
			普通のCSSだともう精神が崩壊するので <a href="https://sass-lang.com">Sass</a> 使え。SASS
			はインデント構文なので SCSS を使う。 こんな感じで Web開発は全然ゴリゴリにやってないので、<a
				href="https://svelte.dev/">Svelte</a
			>以外のフレームワークは使ったことがない。 このサイトも
			<a href="https://svelte.dev/">Svelte</a> を使って作った。
		</p>
		<br />
		<h2 class="c5"><a href="https://git-scm.com/">Git</a></h2>
		<p>
			基本的なことはできるけど フラグとかは全然覚えられない。
			個人リポジトリとかだとブランチの管理が雑。 リモートリポジトリは <a href="https://github.com/"
				>GitHub</a
			> が主。
		</p>
	</div>
	<div class="act act-game" class:fade-in-up-zoom={false}>
		<h1 id="acivity-game" class="c5">Game</h1>
		<p>...開発しろ。</p>
		<br />
		<h2><a href="https://tetr.io">TETR.IO</a></h2>
		<p>向いてるかは別として 一番刺さったゲームだと思う。 2023年3月時点では SS帯で弱い方</p>
		<br />
		<h2><a href="https://www.minecraft.net">Minecraft</a></h2>
		<p>
			一番長くやってるのはこれ。Wii U版と統合版はもうやってなくて Java版がメイン。 Wii
			U版やってた時代では建築が多かった。統合版になってからはアドオン開発やらシェーダー開発もするようになったが、<del
				>マイクロソフト</del
			>による度重なる破壊活動でもう完全に萎えた。
		</p>
		<br />
		<h2><a href="https://www.thatskygame.com">Sky: Children of the Light</a></h2>
		<p>最近は時間が取れなくてあんまりログインできていない。 誘ってくれれば行くかも。</p>
	</div>
	<div class="act act-music" class:fade-in-up-zoom={false}>
		<h1 id="acivity-music" class="c5">Music</h1>
		<p class="subtitle">|♫|♪♬♪|♪♫:|❙♪|❙</p>
		<br />
		<h2>Listen</h2>
		<p>
			古典派とロマン派の(主にピアノの)クラシック曲が好き。 特にフランツ・リストの作品をよく聴く。
		</p>
		<br />
		<h2>Play</h2>
		<p>
			1ミリも上手くないが上記のようなクラシック曲とかをピアノで弾いてる。
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
