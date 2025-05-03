<script lang="ts">
	import type { ProjectMetadata } from '$lib/btpc/scripts/types';
	import { _ } from 'svelte-i18n';

	export let metadata: ProjectMetadata;

	$: date = metadata.date === null ? null : new Date(metadata.date);
	$: initDate = metadata.initDate === null ? null : new Date(metadata.initDate);

	function calcHowLongAgo(date: Date) {
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const daysAgo = Math.floor(diff / 86400000) + 1;

		const yearsAgo = Math.floor(daysAgo / 365);
		if (0 < yearsAgo) return yearsAgo + '年前';

		const monthsAgo = Math.floor(daysAgo / 30.4375);
		if (0 < monthsAgo) return monthsAgo + 'ヶ月前';

		const weeksAgo = Math.floor(daysAgo / 7);
		if (0 < weeksAgo) {
			return weeksAgo + '週間前';
		} else if (0 < daysAgo) {
			return daysAgo + '日前';
		} else {
			return '今日';
		}
	}

	function fmtToFullDate(date: Date) {
		return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 (${calcHowLongAgo(
			date
		)})`;
	}

	function omitDate(date: Date) {
		switch (metadata.status) {
			case 'wip':
			case 'active':
				return `${date.getFullYear()}年`;
			case 'completed':
				return `${date.getFullYear()}年${date.getMonth() + 1}月`;
			case 'archived':
			case 'abandoned':
				return fmtToFullDate(date);
		}
	}

	function removeUrlScheme(url: string) {
		return url.replace(/^https?:\/\//, '');
	}
</script>

<div class="other-info">
	<table>
		{#if date !== null}
			<tr>
				<td>{$_('projects.latestUpdate')}</td>
				<td><span>{omitDate(date)}</span></td>
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
						{:else if metadata.license === 'CC BY-SA 4.0'}
							<a
								href="https://creativecommons.org/licenses/by-sa/4.0/"
								target="_blank"
								rel="license noopener noreferrer"
								class="cc no-after-icn"
								>CC BY-SA 4.0<img
									src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
									alt=""
								/><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" /><img
									src="https://mirrors.creativecommons.org/presskit/icons/sa.svg"
									alt=""
								/></a
							>
						{:else if metadata.license === 'CC BY 4.0'}
							<a
								href="https://creativecommons.org/licenses/by/4.0/"
								target="_blank"
								rel="license noopener noreferrer"
								class="cc no-after-icn"
								>CC BY 4.0<img
									src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
									alt=""
								/><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" /></a
							>
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
