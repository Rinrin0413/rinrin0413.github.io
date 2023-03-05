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
		<p>現在一番好きな言语🦀 名前の拡張子もRustです。</p>
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
		<p>
			向いてるかは別として 一番刺さったゲームだと思う。 2023年3月時点では SS帯最下位レベルで
			ギリギリ中級者名乗れる...の かな...?
		</p>
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
		<p class="subtitle">la lala~ |♫|♪♬♪|♪♫:|❙♪|❙</p>
		<br />
		<h2>Listen</h2>
		<p>古典派ロマン派のクラシックが好き。特にフランツ・リストの作品をよく聴く。</p>
		<br />
		<h2>Play</h2>
		<p>
			1ミリも上手くないがピアノでクラシックとかを弾いてる。アルトリコーダーやらアコースティックギターやらもあるが全く触らない。
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
	@use '/assets/stylesheets/util';

	@use '/assets/stylesheets/variables/mixin' as *;

	.container {
		margin: 0 auto;
		max-width: 512px;
		text-align: left;

		.act {
			padding: 4px 18px;
			margin: 28px 14px;
			box-shadow: 0 4px 18px 4px #0000004c;

			h1 {
				font-size: 22px;
				margin-top: 16px;
			}

			h2 {
				font-size: 20px;
				margin: 0;
				margin-bottom: 8px;
			}

			p {
				font-size: 16px;
				margin: 0;
				margin-bottom: 18px;

				@include sp {
					font-size: 14px;
				}
			}

			&.act-prog {
				font-family: 'Source Code Pro', monospace;
				background-color: #1c1c1b;
				border-radius: 4px;
				color: #d4d4d4;
				line-height: 1.2;
				cursor: text;

				h1 {
					&:before,
					&:after {
						@extend %c13;
					}

					$margin: 6px;

					&:before {
						content: '<';
						margin-right: $margin;
					}

					&:after {
						content: '>';
						margin-left: $margin;
					}
				}

				h2:before {
					content: '# ';
				}

				a {
					@extend %c11;
				}

				.c5 {
					color: #8dbad5;
				}

				%c11 {
					color: #e7b291;
				}

				%c13 {
					color: #b5a790;
				}

				::selection {
					background-color: #1e569888;
					color: inherit;
				}
			}

			&.act-game {
				$text-color: #061a35;

				background: linear-gradient(145deg, #f3f3f7, #d5ecfb);
				border-radius: 12px;
				border: 4px solid #c5d5e2;
				color: $text-color;

				h1 {
					border-bottom: 2px solid $text-color;
				}

				p {
					padding: 4px 10px;
					background-color: #ffffff55;
					box-shadow: inset 5px 5px 2px #d3dfe7, inset -5px -5px 2px #f1f9ff;
					border-radius: 6px;
				}

				::selection {
					background-color: rgba($text-color, 0.3);
					color: inherit;
				}
			}

			&.act-music {
				$text-color: #11130f;

				background-color: #ffffffb4;
				color: $text-color;
				border-radius: 1px;
				background-image: linear-gradient(#00000000 97%, $text-color 100%);
				background-repeat: repeat-y;
				background-size: 100% 22px;

				h1 {
					font-size: 26px;
					text-align: center;
					font-family: serif;
					font-weight: 900;
				}

				p.subtitle {
					text-align: center;
				}

				h2 {
					padding: 2px 8px;
					border-left: 4px solid black;
				}

				::selection {
					background-color: black;
					color: white;
				}
			}

			&:not(.fade-in-up-zoom) {
				opacity: 0;
			}
		}
	}
</style>
