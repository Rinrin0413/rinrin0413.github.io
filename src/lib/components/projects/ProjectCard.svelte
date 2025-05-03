<script lang="ts">
	import type { ProjectMetadata } from '$lib/btpc/scripts/types';
	import { _ } from 'svelte-i18n';
	import { getStatusEmoji } from '$lib/btpc/scripts/projects/util';

	export let meta: ProjectMetadata;

	const id = meta.id ?? 'unreachable';
	const date = meta.initDate === null ? null : omitDate(new Date(meta.date ?? meta.initDate));
	const hasThumbnailImg = meta.thumbnailImg !== null;

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
		switch (meta.status) {
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

	function langCol(lang: string) {
		switch (lang) {
			case 'Rust':
				return '#dea584';
			case 'Svelte':
				return '#ff3e00';
			case 'TypeScript':
				return '#3178c6';
			case 'JavaScript':
				return '#f1e05a';
			case 'GLSL':
				return '#5686a5';
			case 'Shell':
				return '#89e051';
			case 'Go':
				return '#00add8';
			case 'C':
				return '#555555';
			case 'C++':
				return '#f34b7d';
			case 'C#':
				return '#178600';
			case 'HTML':
				return '#e34c26';
			case 'SCSS':
				return '#c6538c';
			case 'CSS':
				return '#663399';
			case 'Python':
				return '#3572a5';
			case 'HLSL':
				return '#aace60';
			case 'Java':
				return '#b07219';
			case 'Assembly':
				return '#6e4c13';
			default:
				return 'initial';
		}
	}
</script>

<a href="/projects/works/{id}"
	><article>
		<div class="thumbnail">
			<img
				src="/images/{hasThumbnailImg
					? `projects/thumbnails/${meta.thumbnailImg}`
					: 'no-image_oxipng.png'}"
				alt=""
				loading="lazy"
				class:no-image={!hasThumbnailImg}
			/>
		</div>
		<div class="meta">
			<h2>
				{meta.title}
				<span class="status"
					>{getStatusEmoji(meta.status)} {$_('projects.statuses.' + meta.status)}</span
				>
			</h2>
			<div class="date">{date} に更新</div>
			{#if meta.desc}<p>{meta.desc}</p>{/if}
			<span class="see-more">see more -&gt;</span>
			{#if 0 < meta.tags.length}
				<ul>
					{#each meta.tags as tag}
						<li><span class="tag-btn">{tag}</span></li>
					{/each}
				</ul>
			{/if}
			{#if 1 <= meta.langs.length}
				<div class="lang">
					<span class="lang-col" style="background-color: {langCol(meta.langs[0])};" />{meta
						.langs[0]}
				</div>
			{/if}
		</div>
	</article></a
>

<style lang="scss">
	@use '$lib/stylesheets/projects/project_card';
	@use '$lib/btpc/stylesheets/card';
</style>
