<script lang="ts">
	import type { ItemWithCount } from '$lib/btpc/scripts/types';
	import { _ } from 'svelte-i18n';
	import { updateParamOnElmValueChange } from '$lib/btpc/scripts/utils';
	import { PROJECT_STATUSES, getStatusEmoji } from '$lib/btpc/scripts/projects/util';

	interface Props {
		allStatuses: ItemWithCount[];
		allLangs: ItemWithCount[];
		allLicenses: ItemWithCount[];
		pickedStatus?: string | null;
		pickedLang?: string | null;
		pickedLicense?: string | null;
	}

	let {
		allStatuses,
		allLangs,
		allLicenses,
		pickedStatus = null,
		pickedLang = null,
		pickedLicense = null
	}: Props = $props();

	let status = $derived(pickedStatus ?? 'all');
	let lang = $derived(pickedLang ?? 'all');
	let license = $derived(pickedLicense ?? 'all');
</script>

<div>
	<label
		><span>{$_('projects.status')}</span><select
			bind:value={status}
			onchange={(e) => updateParamOnElmValueChange(e, 'status')}
		>
			<option value="all">{$_('w.all')}</option>
			{#each PROJECT_STATUSES as s (s)}
				<option value={s} title={$_('projects.statusDescriptions.' + s)}
					>{getStatusEmoji(s)}
					{$_('projects.statuses.' + s)} ({(allStatuses.find((st) => st.item === s) ?? { count: 0 })
						.count})</option
				>
			{/each}
		</select></label
	>
</div>
<div>
	<label
		><span>{$_('projects.writtenIn')}</span><select
			bind:value={lang}
			onchange={(e) => updateParamOnElmValueChange(e, 'langs')}
		>
			<option value="all">{$_('w.all')}</option>
			{#each allLangs as l (l.item)}
				{@const name = l.item}
				<option value={name}>{name} ({l.count})</option>
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
