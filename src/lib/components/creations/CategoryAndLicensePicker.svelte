<script lang="ts">
	import type { ItemWithCount } from '$lib/btpc/scripts/types';
	import { updateParamOnElmValueChange } from '$lib/btpc/scripts/utils';
	import { _ } from 'svelte-i18n';

	interface Props {
		allCategories: ItemWithCount[];
		allLicenses: ItemWithCount[];
		pickedCategory?: string | null;
		pickedLicense?: string | null;
	}

	let { allCategories, allLicenses, pickedCategory = null, pickedLicense = null }: Props = $props();

	let category = $derived(pickedCategory ?? 'all');
	let license = $derived(pickedLicense ?? 'all');
</script>

<div>
	<label
		><span>{$_('w.category')}</span><select
			bind:value={category}
			onchange={(e) => updateParamOnElmValueChange(e, 'c')}
		>
			<option value="all">{$_('w.all')}</option>
			{#each allCategories as c (c.item)}
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
			onchange={(e) => updateParamOnElmValueChange(e, 'license')}
		>
			<option value="all">{$_('w.all')}</option>
			{#each allLicenses as l (l.item)}
				{@const name = l.item}
				<option value={name}>{name} ({l.count})</option>
			{/each}
		</select></label
	>
</div>

<style lang="scss">
	@use '$lib/btpc/stylesheets/picker';
</style>
