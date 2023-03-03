<script lang="ts">
	import Title from '$lib/components/title.svelte';
	import Hr from '$lib/components/hr.svelte';
	import ContentsTable from './contents_table.svelte';
	import Activities from './activities.svelte';
	import Chronicle from './chronicle.svelte';
	import ContactTable from './contact_table.svelte';

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

<section id="contents">
	<Title text="Table of Contents" ja="もくじー" />
	<ContentsTable />
</section>

<Hr />

<section id="activities">
	<Title text="Major Activities" ja="主なすること。" />
	<p>何をしているか</p>
	<ul>
		<li><a href="#acivity-programming">Programming</a></li>
		<li><a href="#acivity-game">Game</a></li>
		<li><a href="#acivity-music">Music</a></li>
	</ul>
	<Activities />
</section>

<Hr />

<section id="chronicle">
	<Title text="Chronicle" ja="我が悠遠なる秀悦の歴史" />
	<p>我が悠遠なる秀悦の歴史</p>
	<Chronicle />
</section>

<Hr />

<section id="contact">
	<Title text="Contact / Social" ja="連絡先とか" />
	<p>
		基本的には Discordサーバー入ってそこで言うか DM してくれれば気づく。
		出先だと気付かないかもだから緊急だったらメール送ってください。
	</p>
	<ContactTable />
</section>

<style lang="scss">
	@use '/assets/stylesheets/variables/color' as *;
	@use '/assets/stylesheets/variables/mixin' as *;

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

	#contents {
		height: 298px;
	}

	#activities {
		ul {
			display: flex;
			justify-content: center;
			align-items: center;
			list-style: none;
			padding: 0;
			margin: 12px auto;

			li {
				margin: 0 12px;
				font-size: 18px;
				font-weight: bold;

				a {
					color: #460000;
					transition: 0.3s;

					&:hover {
						color: #9b3535;
					}
				}
			}
		}
	}
</style>
