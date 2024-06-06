<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import Space from '$lib/components/Space.svelte';
	import Details from './Details.svelte';
	import Hr from '$lib/components/Hr.svelte';
	import Chronicle from '$lib/components/home/Chronicle.svelte';
	import Skills from './Skills.svelte';
	import Environment from './Environment.svelte';

	import { SITE_URL } from '$lib/scripts/variables';
	import { _ } from 'svelte-i18n';
	import { calcAge } from '$lib/scripts/util';

	const L10N_PATH: string = 'profile.intro.';
	$: intro = [
		[$_(L10N_PATH + '0'), $_(L10N_PATH + '1', { values: { age: calcAge() } }), $_(L10N_PATH + '2')],
		[$_(L10N_PATH + '3'), $_(L10N_PATH + '4'), $_(L10N_PATH + '5'), $_(L10N_PATH + '6')]
	];

	const HEAD = {
		title: 'Profile',
		desc: 'Rinrin.rs のプロフィール',
		url: SITE_URL + '/profile'
	};
</script>

<svelte:head>
	<title>Rinrin.rs | {HEAD.title}</title>
	<meta name="title" content="Rinrin.rs | {HEAD.title}" />
	<meta name="description" content={HEAD.desc} />

	<meta property="og:title" content={HEAD.title} />
	<meta property="og:description" content={HEAD.desc} />
	<meta property="og:url" content={HEAD.url} />

	<link rel="canonical" href={HEAD.url} />
</svelte:head>

<section>
	<Space height="64px" />

	<Title text="My Profile" />

	{#each intro as lines}
		<p>
			{#each lines as line, i}
				{#if i != 0}<br />{/if}
				{line}
			{/each}
		</p>
	{/each}

	<Details />
</section>

<Hr />

<section id="chronicle">
	<Title text="Chronicle" />
	<p>{$_('home.chronicle')}</p>
	<Chronicle />
</section>

<Hr />

<section id="hobby">
	<Title text="Hobby" />
	<p>
		{$_('profile.hobby')}
		<a href="/#activities">Major Activities</a>
	</p>
</section>

<Hr />

<section id="skills">
	<Title text="Skills" />
	<Skills />
</section>

<Hr />

<section id="environment">
	<Title text="Environment" />
	<Environment />
</section>

<style style="scss">
	section {
		margin-top: 28px;
	}
</style>
