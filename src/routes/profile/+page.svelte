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

	const HEAD = {
		title: 'Profile',
		desc: 'Rinrin.rs のプロフィール'
	};
</script>

<svelte:head>
	<title>Rinrin.rs | {HEAD.title}</title>
	<meta name="title" content="Rinrin.rs | {HEAD.title}" />
	<meta name="description" content={HEAD.desc} />

	<meta property="og:title" content={HEAD.title} />
	<meta property="og:description" content={HEAD.desc} />
	<meta property="og:url" content="{SITE_URL}/profile" />
	<meta property="og:type" content="article" />
</svelte:head>

<section>
	<Space height="64px" />

	<Title text="My Profile" />

	<p>
		{$_('profile.intro.0')}<br />
		{$_('profile.intro.1', { values: { age: calcAge() } })}<br />
		{$_('profile.intro.2')}
	</p>
	<p>
		{$_('profile.intro.3')}<br />
		{$_('profile.intro.4')}<br />
		{$_('profile.intro.5')}<br />
		{$_('profile.intro.6')}
	</p>

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
