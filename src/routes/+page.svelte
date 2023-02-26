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
	<p>
		あああ！ こんにちは。<br />
		私は{calc_age()}歳の学生です。
	</p>
</section>

<Hr />

<section id="chronicle">
	<Title text="Chronicle" ja="我が悠遠なる秀悦の歴史" />
	<Chronicle />
</section>

<style lang="scss">
	@use '/assets/stylesheets/variables/color' as *;

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
			font-size: 20px;
			font-weight: bold;
			margin: 10px;
		}
	}
</style>
