<script lang="ts">
	import Title from '$lib/components/title.svelte';
	import Hr from '$lib/components/hr.svelte';
	import ContentsTable from './contents_table.svelte';
	import Activities from './activities.svelte';
	import Chronicle from './chronicle.svelte';
	import MinimalContactTable from './minimal_contact_table.svelte';

	import { site_url } from '$lib/variables';
	import { _ } from 'svelte-i18n';
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

<img src="/images/rinrin_256px.webp" alt={$_('home.icon')} id="icon" />

<section id="about">
	<Title text="About me" />
	<p class="large">
		{@html $_('home.greeting', { values: { age: calc_age() } })}
	</p>
</section>

<Hr />

<section id="contents">
	<Title text="Table of Contents" />
	<p>{$_('home.tableOfContents')}</p>
	<ContentsTable />
</section>

<Hr />

<section id="activities">
	<Title text="Major Activities" />
	<p>{$_('home.whatIDo')}</p>
	<ul>
		<li><a href="#acivity-programming">Programming</a></li>
		<li><a href="#acivity-game">Game</a></li>
		<li><a href="#acivity-music">Music</a></li>
	</ul>
	<Activities />
</section>

<Hr />

<section id="chronicle">
	<Title text="Chronicle" />
	<p>{$_('home.chronicle')}</p>
	<Chronicle />
</section>

<Hr />

<section id="contact">
	<Title text="Contact / Social" />
	<p>{$_('home.contact')}</p>
	<MinimalContactTable />
	<p><a href="social">{$_('home.otherSocial')}</a></p>
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
