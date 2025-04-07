<script context="module" lang="ts">
	export const metadata: ToolMetadata = {
		title: '時間の単位換算機',
		desc: '様々な時間の単位を相互的に換算します。',
		tags: ['換算', '計算', '時間']
	};
</script>

<script lang="ts">
	import ToolHead from '$lib/components/tools/ToolHead.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import ToolFooter from '$lib/components/tools/ToolFoot.svelte';

	import { onMount } from 'svelte';
	import type { ToolMetadata } from '$lib/btpc/scripts/types';

	let tNs: number;
	let tUs: number;
	let tMs: number;
	let tSec = 86_400; // 86,400s = 1d
	let tMin: number;
	let tHou: number;
	let tDay: number;
	let tWeek: number;
	let tMon: number;
	let tYear: number;
	let tCentury: number;

	onMount(update);

	function update(e?: Event) {
		if (e !== undefined) {
			const target = e.target as HTMLInputElement;
			const nextSibling = target.nextSibling;
			if (nextSibling === null) {
				console.error('A next sibling of the input element does not exist.', target);
				return;
			}
			const baseUnit = nextSibling.textContent;

			const UNIT_FACTORS: Record<string, number> = {
				ns: 0.000_000_001, // 1ns = 0.001s * 0.001 * 0.001 = 0.000 000 001s
				µs: 0.000_001, // 1µs = 0.001s * 0.001 = 0.000 001s
				ms: 0.001, // 1ms = 0.001s
				s: 1, // 1s = 1s
				min: 60, // 1min = 60s
				h: 3600, // 1h = 60s * 60 = 3600s
				d: 86_400, // 1d = 60s * 60 * 24 = 86,400s
				w: 604_800, // 1w = 60s * 60 * 24 * 7 = 604,800s
				mon: 2_629_800, // 1mon = 60s * 60 * 24 * 365.25 / 12 = 2,629,800s
				y: 31_557_600, // 1y = 60s * 60 * 24 * 365.25 = 31,557,600s
				T: 3_155_760_000 // 1T = 60s * 60 * 24 * 365.25 * 100 = 3,155,760,000s
			};
			if (baseUnit !== null && baseUnit in UNIT_FACTORS) {
				tSec = parseFloat(target.value) * UNIT_FACTORS[baseUnit];
			} else {
				console.error(`Unexpected time unit: "${baseUnit}"`);
				return;
			}
		}

		tMs = tSec * 1000; // 1000ms = 1s
		tUs = tMs * 1000; // 1000µs = 1ms
		tNs = tUs * 1000; // 1000ns = 1µs

		tMin = tSec / 60; // 1min = 60s
		tHou = tMin / 60; // 1h = 60min
		tDay = tHou / 24; // 1d = 24h
		tWeek = tDay / 7; // 1w = 7d
		tMon = tDay / 30.4375; // 1mon = 365.25 / 12 = 30.4375d
		tYear = tMon / 12; // 1y = 12mon
		tCentury = tYear / 100; // 1T = 100y
	}
</script>

<ToolHead {metadata} />
<p>{metadata.desc}<br />月以上はユリウス暦を基準にしています。</p>

<div>
	<div class="result">
		<ul>
			<li>
				<CopyButton text={tNs} />ナノ秒:
				<input type="number" bind:value={tNs} on:input={update} />ns
			</li>
			<li>
				<CopyButton text={tUs} />マイクロ秒:
				<input type="number" bind:value={tUs} on:input={update} />µs
			</li>
			<li>
				<CopyButton text={tMs} />ミリ秒:
				<input type="number" bind:value={tMs} on:input={update} />ms
			</li>
			<li>
				<CopyButton text={tSec} />秒: <input type="number" bind:value={tSec} on:input={update} />s
			</li>
			<li>
				<CopyButton text={tMin} />分: <input type="number" bind:value={tMin} on:input={update} />min
			</li>
			<li>
				<CopyButton text={tHou} />時間: <input type="number" bind:value={tHou} on:input={update} />h
			</li>
			<li>
				<CopyButton text={tDay} />日: <input type="number" bind:value={tDay} on:input={update} />d
			</li>
			<li>
				<CopyButton text={tWeek} />週: <input type="number" bind:value={tWeek} on:input={update} />w
			</li>
			<li>
				<CopyButton text={tMon} />月(平均):
				<input type="number" bind:value={tMon} on:input={update} />mon
			</li>
			<li>
				<CopyButton text={tYear} />年: <input type="number" bind:value={tYear} on:input={update} />y
			</li>
			<li>
				<CopyButton text={tCentury} />世紀:
				<input type="number" bind:value={tCentury} on:input={update} />T
			</li>
		</ul>
	</div>
</div>

<ToolFooter {metadata} />

<!-- svelte-ignore css-unused-selector -->
<style lang="scss">
	@use '$lib/stylesheets/tools/tool_page';
	@use '$lib/stylesheets/variables/color' as *;

	input[type='number'] {
		width: 190px;
	}
</style>
