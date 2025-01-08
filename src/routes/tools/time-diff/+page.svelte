<script context="module" lang="ts">
	export const METADATA = {
		title: '時間差計算機',
		desc: '2つの時刻間の経過時間を計算します。',
		tags: ['計算', '時間']
	};
</script>

<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Space from '$lib/components/Space.svelte';
	import Title from '$lib/components/Title.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import Hr from '$lib/components/Hr.svelte';
	import TagList from '$lib/btpc/components/tag/TagList.svelte';
	import BackToIndexButton from '$lib/components/tools/BackToIndexButton.svelte';
	import ShareButton from '$lib/btpc/components/ShareButton.svelte';
	import Notes from '$lib/components/tools/Notes.svelte';

	import { SITE_URL } from '$lib/scripts/variables';

	let startTime = '15:30';
	let endTime = '19:20';
	let additionalDays = 0;
	let diffMs: number | null;
	let diffSec: number | null;
	let diffMin: number | null;
	let diffHr: number | null;
	let diffFull: string | null;

	const hrDigits = 10;

	$: if (startTime !== undefined && endTime !== undefined) {
		const start = new Date(`1970-01-01T${startTime}`);
		const end = new Date(`1970-01-01T${endTime}`);

		// Add one day to the end time if the end time is earlier than the start time.
		if (end < start) end.setDate(end.getDate() + 1);

		// Add additional days to the end time.
		if (0 < additionalDays) end.setDate(end.getDate() + additionalDays);

		diffMs = end.getTime() - start.getTime();
		if (isNaN(diffMs)) {
			diffMs = diffSec = diffMin = diffHr = diffFull = null;
		} else {
			diffSec = diffMs * 0.001;
			diffMin = diffSec / 60;
			diffHr = parseFloat((diffMin / 60).toPrecision(hrDigits));
			diffFull = `${Math.floor(diffMs / 3600000)}時間${Math.floor((diffMs % 3600000) / 60000)}分`;
		}
	}

	const pageTitle = 'Web Tools - ' + METADATA.title;
	const canonicalUrl = SITE_URL + '/tools/time-diff';
	const EMPTY = '-';
</script>

<HeadMetadata title={pageTitle} desc={METADATA.desc} {canonicalUrl} ogType="article" />

<Space height="64px" />
<Title text={METADATA.title} />
<p>{METADATA.desc}<br />終了時刻が開始時刻よりも早い場合は、終了時刻に1日を加算して計算します。</p>

<div>
	<div class="input">
		<div>
			<label for="start-time" class="with-colon">開始時刻</label><input
				type="time"
				bind:value={startTime}
				id="start-time"
			/>
		</div>
		<div>
			<button
				on:click={() => ([startTime, endTime] = [endTime, startTime])}
				title="入れ替える"
				tabindex="-1"
			>
				<!--
					Google Material Symbols and Icons - Swap Vertical Circle
					https://fonts.google.com/icons?selected=Material+Symbols+Outlined:swap_vertical_circle:FILL@1;wght@400;GRAD@0;opsz@24&icon.query=swap&icon.size=24&icon.color=%23e8eaed
					This icon is licensed under the Apache License Version 2.0: https://github.com/google/material-design-icons/blob/master/README.md
				-->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="#e8eaed"
					><path
						d="m560-200 160-160-56-56-64 62v-166h-80v166l-64-62-56 56 160 160ZM360-440h80v-166l64 62 56-56-160-160-160 160 56 56 64-62v166ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
					/></svg
				>
			</button>
		</div>
		<div>
			<label for="end-time" class="with-colon">終了時刻</label><input
				type="time"
				bind:value={endTime}
				id="end-time"
			/>
		</div>
		<div class="additional-days-container">
			<label for="additional-days">+</label><input
				type="number"
				bind:value={additionalDays}
				id="additional-days"
				min="0"
				max="9"
			/><label for="additional-days">日</label>
		</div>
	</div>
	<div class="result">
		<ul>
			<li><CopyButton text={diffFull} /><span>{diffFull ?? EMPTY}</span></li>
			<li><CopyButton text={diffHr} /><span>{diffHr ?? EMPTY}</span>時間</li>
			<li><CopyButton text={diffMin} /><span>{diffMin ?? EMPTY}</span>分</li>
			<li><CopyButton text={diffSec} /><span>{diffSec ?? EMPTY}</span>秒</li>
			<li><CopyButton text={diffMs} /><span>{diffMs ?? EMPTY}</span>ミリ秒</li>
		</ul>
	</div>
</div>

<Hr />
<TagList tags={METADATA.tags} />
<ShareButton href={canonicalUrl} title={pageTitle} expanded />
<Notes />
<BackToIndexButton />

<style lang="scss">
	@use '$lib/stylesheets/tools/tool_page';

	@use '$lib/stylesheets/variables/color' as *;

	label.with-colon::after {
		content: ':';
	}

	button {
		color: inherit;
		background: none;
		border: none;
		cursor: pointer;
	}

	svg {
		$size: 28px;
		width: $size;
		height: $size;
		fill: $txt-primary;
	}

	.additional-days-container {
		display: inline-block;
		position: relative;
		left: 29px;
	}

	input[type='number'] {
		width: 34px;
		text-align: right;
	}
</style>
