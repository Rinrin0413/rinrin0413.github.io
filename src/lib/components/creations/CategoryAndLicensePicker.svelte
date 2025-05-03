<script lang="ts">
	import type { ItemWithCount } from '$lib/btpc/scripts/types';
	import { updateParamOnElmValueChange } from '$lib/btpc/scripts/utils';
	import { _ } from 'svelte-i18n';

	export let allCategories: ItemWithCount[];
	export let allLicenses: ItemWithCount[];
	export let pickedCategory: string | null = null;
	export let pickedLicense: string | null = null;

	$: category = pickedCategory ?? 'all';
	$: license = pickedLicense ?? 'all';
</script>

<div>
	<label
		><span>{$_('w.category')}</span><select
			bind:value={category}
			on:change={(e) => updateParamOnElmValueChange(e, 'c')}
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
			on:change={(e) => updateParamOnElmValueChange(e, 'license')}
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
	@use '$lib/btpc/stylesheets/picker';
</style>
