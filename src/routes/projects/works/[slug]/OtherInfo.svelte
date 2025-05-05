<script context="module">
	export const RECOGNIZED_LICENSES = ['MIT', 'GPL-3.0', ...CC_LICENSES];
</script>

<script lang="ts">
	import CcLicense from '$lib/btpc/components/CcLicense.svelte';

	import type { ProjectMetadata } from '$lib/btpc/scripts/types';
	import { omitDateByStatus, fmtToFullDate } from '$lib/btpc/scripts/projects/util';
	import { _ } from 'svelte-i18n';
	import { CC_LICENSES } from '$lib/btpc/components/CcLicense.svelte';

	export let metadata: ProjectMetadata;

	$: date = metadata.date === null ? null : new Date(metadata.date);
	$: initDate = metadata.initDate === null ? null : new Date(metadata.initDate);

	function removeUrlScheme(url: string) {
		return url.replace(/^https?:\/\//, '');
	}
</script>

<div class="other-info">
	<table>
		{#if date !== null}
			<tr>
				<td>{$_('projects.latestUpdate')}</td>
				<td><span>{omitDateByStatus(date, metadata.status)}</span></td>
			</tr>
		{/if}
		{#if initDate !== null}
			<tr>
				<td>{$_('projects.initRelease')}</td>
				<td><span>{fmtToFullDate(initDate)}</span></td>
			</tr>
		{/if}
		<tr>
			<td>{$_('w.tags')}</td>
			<td
				>{#each metadata.tags as tag}<a href="/projects?t={tag}" class="tag link">{tag}</a
					>{/each}</td
			>
		</tr>
		<tr>
			<td>{$_('projects.writtenIn')}</td>
			<td
				>{#each metadata.langs as lang, i}{#if 0 < i},{/if}<a
						href="/projects?langs={lang}"
						class="lang link">{lang}</a
					>{/each}</td
			>
		</tr>
		{#if metadata.repo !== null}
			<tr>
				<td>{$_('w.repo')}</td>
				<td
					><a href={metadata.repo} target="_blank" rel="noopener noreferrer" class="link"
						>{removeUrlScheme(metadata.repo)}</a
					></td
				>
			</tr>
		{/if}
		{#if metadata.website !== null}
			<tr>
				<td>{$_('w.website')}</td>
				<td
					><a href={metadata.website} target="_blank" rel="noopener noreferrer" class="link"
						>{removeUrlScheme(metadata.website)}</a
					></td
				>
			</tr>{/if}
		{#if metadata.license !== null}
			<tr>
				<td>{$_('w.license')}</td>
				<td
					><span>
						{#if metadata.license === 'MIT'}
							<a
								href="https://opensource.org/license/mit"
								target="_blank"
								rel="license noopener noreferrer"
								class="no-after-icn">MIT License</a
							>
						{:else if metadata.license === 'GPL-3.0'}
							<a
								href="https://gnu.org/licenses/gpl-3.0"
								target="_blank"
								rel="license noopener noreferrer"
								class="no-after-icn">GPL-3.0</a
							>
						{:else if CC_LICENSES.includes(metadata.license)}
							<CcLicense license={metadata.license} />
						{:else}
							{metadata.license}
						{/if}
					</span></td
				>
			</tr>
		{/if}
	</table>
</div>

<style lang="scss">
	@use '$lib/btpc/stylesheets/other_info.scss';
</style>
