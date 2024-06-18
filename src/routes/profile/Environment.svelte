<script lang="ts">
	import Title2 from '$lib/components/Title2.svelte';

	import { _ } from 'svelte-i18n';

	$: envs = [
		{
			type: $_('w.hardware'),
			items: [
				{ key: $_('w.model'), value: 'MouseComputer Z7-Z690' },
				{ key: 'CPU', value: 'Intel® Core™ i7-12700 Processor' },
				{ key: $_('w.memory'), value: '16GB✕2' },
				{ key: $_('w.gpu'), value: 'NVIDIA GeForce RTX 3060 / 12GB' }
			]
		},
		{
			type: $_('w.software'),
			items: [
				{ key: 'OS', value: 'openSUSE Leap 15.5 x86_64' },
				{ key: $_('w.shell'), value: 'bash 4.4.23' },
				{ key: $_('w.desktopEnv'), value: 'GNOME 41.9' },
				{ key: $_('w.webBrowser'), value: 'Mozilla Firefox ESR' },
				{ key: $_('w.codeEditor'), value: 'Visual Studio Code Insiders' }
			]
		}
	];
</script>

<p>{$_('env.intro')}</p>

{#each envs as { type, items }}
	<Title2 text={type} />

	<div>
		{#each items as { key, value }}
			<h3>{key}</h3>
			<p>{value}</p>
		{/each}
	</div>
{/each}

<p>
	{$_('env.notes.0')}<a href="https://geartics.com/rinrin" target="_blank" rel="noopener noreferrer"
		>Geartics</a
	>{$_('env.notes.1')}
</p>

<style lang="scss">
	@use '$lib/stylesheets/variables/color' as *;
	@use '$lib/stylesheets/variables/mixin' as *;

	h3,
	div p {
		max-width: 365px;
		padding: 4px 14px;

		@include sp {
			max-width: 291px;
		}
	}

	$glassmorphism-border-light: 2px solid #e7dfd57a;
	$glassmorphism-border-dark: 2px solid rgba($txt-primary, 0.1);

	h3 {
		margin: 0 auto;
		font-size: 20px;
		padding: 0 14px;
		border-bottom: 2px solid rgba($txt-primary, 0.75);
		background-color: rgba($txt-primary, 0.16);
		$blur: blur(4px);
		backdrop-filter: $blur;
		-webkit-backdrop-filter: $blur;
		border-right: $glassmorphism-border-dark;
		border-left: $glassmorphism-border-light;
		border-top: $glassmorphism-border-light;

		@include sp {
			font-size: 18px;
		}
	}

	div p {
		padding-bottom: 8px;
		margin-top: 0;
		margin-bottom: 14px;
		background-color: rgba($txt-primary, 0.08);
		$blur: blur(24px);
		backdrop-filter: $blur;
		-webkit-backdrop-filter: $blur;
		$border-rad: 4px;
		border-bottom-left-radius: $border-rad;
		border-bottom-right-radius: $border-rad;
		border-right: $glassmorphism-border-dark;
		border-bottom: $glassmorphism-border-dark;
		border-left: $glassmorphism-border-light;
	}
</style>
