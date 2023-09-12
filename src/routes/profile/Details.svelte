<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { calcAge } from '$lib/util';
</script>

<div>
	<table class="glassmorphism">
		<tr>
			<td>{$_('w.name')}</td>
			<td>Rinrin.rs</td>
		</tr>
		<tr>
			<td>{$_('w.age')}</td>
			<td>{calcAge()}{$_('w.yearsOld')}</td>
		</tr>
		<tr>
			<td>{$_('w.birthday')}</td>
			<td>{$_('profile.birthday')}</td>
		</tr>
		<tr>
			<td>{$_('profile.school')}</td>
			<td>{$_('w.sHighSchool')}</td>
		</tr>
		<tr>
			<td>{$_('profile.birthplace')}</td>
			<td>{$_('w.yokohama')}</td>
		</tr>
	</table>
</div>

<style lang="scss">
	@use '/assets/stylesheets/utils/glassmorphism';
	@use '/assets/stylesheets/variables/mixin' as *;
	@use '/assets/stylesheets/variables/color' as *;

	div {
		max-width: 420px;
		padding: 0 12px;
		margin: 28px auto;
	}

	table {
		padding: 12px;
		margin: 0 auto;
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
