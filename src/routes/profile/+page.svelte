<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import Space from '$lib/components/Space.svelte';
	import Details from './Details.svelte';
	import Hr from '$lib/components/Hr.svelte';
	import Skills from './Skills.svelte';
	import Environment from './Environment.svelte';

	import { SITE_URL } from '$lib/variables';
	import { _ } from 'svelte-i18n';
	import { calcAge } from '$lib/util';

	const L10N_PATH: string = 'profile.intro.';
	const intro = [
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

	<Hr />
	<Space height="28px" />

	<Title text="Hobby" id="hobby" />

	<p>
		{$_('profile.hobby')}
		<a href="/#activities">Major Activities</a>
	</p>

	<Space height="28px" />

	<Title text="Skills" id="skills" />

	<Skills />

	<Space height="28px" />

	<Title text="Environment" id="environment" />

	<Environment />
</section>
