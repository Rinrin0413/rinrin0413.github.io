<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Title from '$lib/components/Title.svelte';
	import Details from './Details.svelte';
	import Hr from '$lib/components/Hr.svelte';
	import Chronicle from '$lib/components/home/Chronicle.svelte';
	import Skills from './Skills.svelte';
	import Environment from './Environment.svelte';

	import { _ } from 'svelte-i18n';
	import { calcAge } from '$lib/scripts/utils';

	const L10N_PATH: string = 'profile.intro.';
	$: intro = [
		[$_(L10N_PATH + '0'), $_(L10N_PATH + '1', { values: { age: calcAge() } }), $_(L10N_PATH + '2')],
		[$_(L10N_PATH + '3'), $_(L10N_PATH + '4'), $_(L10N_PATH + '5'), $_(L10N_PATH + '6')]
	];
</script>

<HeadMetadata title="Profile" desc="Rinrin.rs のプロフィール" ogType="profile" />

<section>
	<Title text="My Profile" atPageTop />

	{#each intro as lines}
		<p>
			{#each lines as line, i}
				{#if i !== 0}<br />{/if}
				{line}
			{/each}
		</p>
	{/each}

	<Details />
</section>

<Hr />

<section id="chronicle">
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

<section id="wakatime">
	<Title text="Wakatime" />
	<p>My coding activity.</p>
	<figure>
		<embed src="https://wakatime.com/share/@Rinrin/e0c30dca-c019-4c56-a8d8-0a200e9b5cca.svg" />
	</figure>
	<p>
		<a href="https://wakatime.com/@Rinrin"
			><img
				src="https://wakatime.com/badge/user/88c05ffc-234e-402c-9f4e-d3b542e7309f.svg"
				alt="Total time coded since Mar 17 2023"
			/></a
		>
	</p>
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

	figure {
		aspect-ratio: 115 / 88;
		width: 99vw;
		max-width: 1150px;
		margin: 0 auto;
	}
</style>
