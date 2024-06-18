<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { calcAge } from '$lib/scripts/utils';

	$: details = [
		{ key: $_('w.name'), value: 'Rinrin.rs' },
		{ key: $_('w.age'), value: `${calcAge()}${$_('w.yearsOld')}` },
		{ key: $_('w.birthday'), value: $_('profile.birthday') },
		{ key: $_('profile.primaryLang'), value: $_('w.jaLang') },
		{ key: $_('profile.timezone'), value: 'JST (UTC +9)' },
		{ key: $_('profile.school'), value: $_('w.sHighSchool') },
		{ key: $_('profile.birthplace'), value: $_('w.yokohama') }
	];
</script>

<div>
	<table>
		{#each details as { key, value }}
			<tr>
				<td>{key}</td>
				<td>{value}</td>
			</tr>
		{/each}
	</table>
</div>

<style lang="scss">
	@use '$lib/stylesheets/variables/mixin' as *;
	@use '$lib/stylesheets/variables/color' as *;

	div {
		max-width: 420px;
		padding: 0 12px;
		margin: 28px auto;
	}

	table {
		padding: 12px;
		margin: 0 auto;
		@include glassmorphism;
	}

	td {
		text-align: left;
		font-size: 18px;
		line-height: 1.4;
		padding: 0 4px;

		@include sp {
			font-size: 16px;
		}

		&:first-child {
			padding-right: 0;
			text-align: right;

			&::after {
				content: ':';
			}
		}
	}
</style>
