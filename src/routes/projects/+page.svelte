<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Title from '$lib/components/Title.svelte';
	import ShareButton from '$lib/btpc/components/ShareButton.svelte';
	import StatusAndLangAndLicensePicker from '$lib/components/projects/StatusAndLangAndLicensePicker.svelte';
	import TagPicker from '$lib/btpc/components/tag/picker/TagPicker.svelte';
	import ProjectCard from '$lib/components/projects/ProjectCard.svelte';
	import ClearTagsButton from '$lib/btpc/components/tag/ClearTagsButton.svelte';

	import type { PageData } from './$types';
	import { PAGE_FULL_TITLE_PART } from '$lib/scripts/variables';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { WIDE_CARD_ANIM_PARAMS } from '$lib/btpc/scripts/variables';
	import { _ } from 'svelte-i18n';

	export let data: PageData;

	$: projects = data.projects;

	const TITLE = 'Dev. Projects';
</script>

<HeadMetadata title={TITLE} desc="Rinrin.rs の開発プロジェクト" />

<section>
	<Title text={TITLE} atPageTop />
	<p><ShareButton title={PAGE_FULL_TITLE_PART + TITLE} /></p>
	<StatusAndLangAndLicensePicker
		allStatuses={data.allStatuses}
		allLangs={data.allLangs}
		allLicenses={data.allLicenses}
		pickedStatus={data.status}
		pickedLang={data.lang}
		pickedLicense={data.license}
	/>
	<TagPicker allTags={data.allTags} pickedTags={data.tags} doesNotConvertToUpperCase />

	{#if 0 < projects.length}
		<ul>
			{#each projects as meta (meta.id)}
				<li
					in:fly|global={WIDE_CARD_ANIM_PARAMS.transitionIn}
					out:fly|global={WIDE_CARD_ANIM_PARAMS.transitionOut}
					animate:flip={WIDE_CARD_ANIM_PARAMS.animate}
				>
					<ProjectCard {meta} />
				</li>
			{/each}
		</ul>
	{:else}
		<h2>{$_('projects.noMatchingProjectsFound')}</h2>
		<ClearTagsButton />
	{/if}
</section>

<style lang="scss">
	@use '$lib/stylesheets/variables/color' as *;
	@use '$lib/stylesheets/variables/mixin' as *;

	@use '$lib/btpc/stylesheets/index_page';

	ul {
		max-width: 1024px;
		padding: 0;
		margin: 0 auto;
		list-style: none;
	}

	li {
		margin: 24px 16px;
	}

	@include sp {
		li {
			margin: 17px 14px;
		}
	}
</style>
