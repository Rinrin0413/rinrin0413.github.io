<script lang="ts">
	import type { ProjectMetadata } from '$lib/btpc/scripts/types';
	import { omitDateByStatus, getStatusEmoji } from '$lib/btpc/scripts/projects/util';
	import { _ } from 'svelte-i18n';

	export let meta: ProjectMetadata;

	const id = meta.id ?? 'unreachable';
	const date =
		meta.initDate === null
			? null
			: omitDateByStatus(new Date(meta.date ?? meta.initDate), meta.status);
	const hasThumbnailImg = meta.thumbnailImg !== null;

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

<a href="/projects/works/{id}" class:force-mobile-view={false}
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
			<span class="more">see more -&gt;</span>
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
	@use '$lib/btpc/stylesheets/card';
	@use '$lib/btpc/stylesheets/wide_card';

	@use '$lib/stylesheets/variables/mixin' as *;

	.status {
		float: right;
		font-size: 17px;
	}

	.lang {
		margin-top: 15px;
		font-size: 16px;
	}

	.lang-col {
		display: inline-block;
		height: 13px;
		aspect-ratio: 1;
		position: relative;
		top: 2px;
		margin-right: 3px;
		border: 1px solid #00000060;
		border-radius: 50%;
	}

	@include sp {
		.status {
			font-size: 15px;
		}

		.lang {
			margin-top: 8px;
		}
	}
</style>
