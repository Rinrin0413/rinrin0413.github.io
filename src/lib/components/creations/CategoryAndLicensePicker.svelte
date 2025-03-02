<script lang="ts">
	import type { ItemWithCount } from '$lib/btpc/scripts/types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';

	export let allCategories: ItemWithCount[];
	export let allLicenses: ItemWithCount[];
	export let pickedCategory: string | null = null;
	export let pickedLicense: string | null = null;

	$: category = pickedCategory ?? 'all';
	$: license = pickedLicense ?? 'all';

	function updateParam(event: Event, paramName: string) {
		const params = new URLSearchParams(location.search);

		const value = (event.target as HTMLSelectElement).value;
		if (value === 'all') params.delete(paramName);
		else params.set(paramName, value);

		goto(`${$page.url.pathname}?${params.toString()}`);
	}
</script>

<div>
	<label
		><span>{$_('w.category')}</span><select
			bind:value={category}
			on:change={(e) => updateParam(e, 'c')}
		>
			<option value="all">{$_('w.all')}</option>
			{#each allCategories as c}
				{@const name = c.item}
				<option value={name}>{name} ({c.count})</option>
			{/each}
		</select></label
	>
</div>
<div>
	<label
		><span>{$_('w.license')}</span><select
			bind:value={license}
			on:change={(e) => updateParam(e, 'license')}
		>
			<option value="all">{$_('w.all')}</option>
			{#each allLicenses as l}
				{@const name = l.item}
				<option value={name}>{name} ({l.count})</option>
			{/each}
		</select></label
	>
</div>

<style lang="scss">
	@use '$lib/stylesheets/variables/mixin' as *;
	@use '$lib/stylesheets/variables/color' as *;

	div {
		margin: 6px auto;
		@include hideWhenNoJs;
	}

	label {
		font-size: 16px;
	}

	span::after {
		content: ': ';
	}

	select {
		font-family: inherit;
		font-size: 14px;
		padding: 1px 3px;
		background-color: #ffffff80;
		border: 2px solid #00000070;
		border-radius: 6px;
		cursor: pointer;
	}
</style>
