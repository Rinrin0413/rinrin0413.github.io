<script lang="ts">
	import type { ItemWithCount } from '$lib/btpc/scripts/types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import { getStatusEmoji } from '$lib/btpc/scripts/projects/util';

	export let allStatuses: ItemWithCount[];
	export let allLangs: ItemWithCount[];
	export let allLicenses: ItemWithCount[];
	export let pickedStatus: string | null = null;
	export let pickedLang: string | null = null;
	export let pickedLicense: string | null = null;

	$: status = pickedStatus ?? 'all';
	$: lang = pickedLang ?? 'all';
	$: license = pickedLicense ?? 'all';

	const STATUS_ORDER = ['wip', 'active', 'completed', 'archived', 'abandoned'];
	const STATUS_LABELS: Record<(typeof STATUS_ORDER)[number], string> = {
		wip: '開発が進行中で未完成のもの',
		active: '完成しているが、機能追加等の開発が続いているもの',
		completed: '完成していて、現時点で更新の予定がないもの',
		archived: '開発が終了しているもの',
		abandoned: '完成する前に放棄したもの'
	};

	function updateParam(event: Event, paramName: string) {
		const params = new URLSearchParams(location.search);

		const value = (event.target as HTMLSelectElement).value;
		if (value === 'all') params.delete(paramName);
		else params.set(paramName, value);

		goto(`${$page.url.pathname}?${params.toString()}`, { noScroll: true });
	}
</script>

<div>
	<label
		><span>{$_('projects.status')}</span><select
			bind:value={status}
			on:change={(e) => updateParam(e, 'status')}
		>
			<option value="all">{$_('w.all')}</option>
			{#each STATUS_ORDER as s}
				<option value={s} title={STATUS_LABELS[s]}
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
			on:change={(e) => updateParam(e, 'langs')}
		>
			<option value="all">{$_('w.all')}</option>
			{#each allLangs as l}
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
</style>
