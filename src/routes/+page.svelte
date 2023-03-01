<script lang="ts">
	import Title from '$lib/components/title.svelte';
	import Hr from '$lib/components/hr.svelte';
	import Chronicle from '$lib/components/chronicle.svelte';

	import { site_url } from '$lib/variables';
	import { calc_age } from '$lib/util';

	const head = {
		title: 'Home',
		desc: 'Rinrin.rs のホームページです'
	};
</script>

<svelte:head>
	<title>Rinrin.rs | {head.title}</title>
	<meta name="title" content="Rinrin.rs | {head.title}" />
	<meta name="description" content={head.desc} />

	<meta property="og:title" content={head.title} />
	<meta property="og:description" content={head.desc} />
	<meta property="og:url" content={site_url} />
	<meta property="og:type" content="website" />
</svelte:head>

<img src="images/rinrin.webp" alt="Rinrin" id="icon" />

<section id="about">
	<Title text="About me" ja="わたしはだれだ!!!" />
	<p id="large">
		あああ！ こんにちは。<br />
		私は{calc_age()}歳の学生です。
	</p>
</section>

<Hr />

<section id="chronicle">
	<Title text="Chronicle" ja="我が悠遠なる秀悦の歴史" />
	<Chronicle />
</section>

<Hr />

<section id="contact">
	<Title text="Contact / Social" ja="連絡先とか" />
	<p>
		基本的には Discordサーバー入ってそこで言うか DM してくれれば気づく。
		出先だと気付かないかもだから緊急だったらメール送ってください。
	</p>
	以下作り途中のため とりあえず雑なレイアウト:
	<br><br>
	Email: <a href="mailto:rinrin0413.valley@gmail.com">rinrin0413.valley@gmail.com</a>
	<br>
	Discord: <a href="https://discord.com/users/724976600873041940">Rinrin.rs#5671 (724976600873041940)</a>
	<br>
	Discord Server: <a href="https://discord.gg/7QhMDfyPHR">Rinrinの要塞</a>
	<br>
	Twitter: <a href="https://twitter.com/Rinrin_2nd">@Rinrin_2nd</a>
</section>

<style lang="scss">
	@use '/assets/stylesheets/variables/color' as *;
	@use '/assets/stylesheets/variables/mixin' as *;

	#icon {
		$size: 256px;
		$shadow-color: #00000094;

		width: $size;
		height: $size;
		border-radius: 3%;
		margin: 18px auto -48px auto;
		box-shadow: 0 4px 14px $shadow-color;
		transition: 0.3s;

		&:hover {
			box-shadow: 0 2px 6px $shadow-color;
			transform: translateY(6px) scale(0.98);
		}

		&:active {
			box-shadow: none;
			transform: translateY(8px) scale(0.968);
		}
	}

	section {
		margin: 64px 0;

		p {
			font-weight: bold;
			padding: 0 18px;
			margin: 10px auto;
			max-width: 512px;

			&:not(#large) {
				font-size: 18px;

				@include sp {
					font-size: 16px;
					padding: 0 14px;
				}
			}

			&#large {
				font-size: 20px;
			}
		}
	}
</style>
