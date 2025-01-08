<script context="module" lang="ts">
	export const METADATA = {
		title: 'BMI計算機',
		desc: '体重と身長からボディマス指数(BMI)を計算します。',
		tags: ['計算', 'BMI']
	};
</script>

<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Space from '$lib/components/Space.svelte';
	import Title from '$lib/components/Title.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import ToolFooter from '$lib/components/tools/ToolFoot.svelte';

	import { SITE_URL } from '$lib/scripts/variables';
	import { page } from '$app/stores';

	let weight = 39.1;
	let height = 162.3;
	let bmi: number | null;
	let formula: string | null;
	let bmiCategoryJasso: string | null;
	let bmiCategoryWho: string | null;
	let stdWeight: number | null;
	let weightDiff: number | null;

	$: if (weight !== undefined && height !== undefined) {
		const heightMeters = height * 0.01;
		const heightPow2 = heightMeters * heightMeters;
		// BMI = weight / height^2
		bmi = parseFloat((weight / heightPow2).toFixed(4));

		if (isNaN(bmi)) {
			bmi = null;
			formula = null;
			bmiCategoryJasso = null;
			bmiCategoryWho = null;
			stdWeight = null;
			weightDiff = null;
		} else {
			formula = `${weight}/(${height}/100)^2 ≒ ${bmi}`;

			// BMI categories by JASSO
			if (bmi < 18.5) {
				bmiCategoryJasso = '低体重';
			} else if (bmi < 25) {
				bmiCategoryJasso = '普通体重';
			} else if (bmi < 30) {
				bmiCategoryJasso = '肥満（1 度）';
			} else if (bmi < 35) {
				bmiCategoryJasso = '肥満（2 度）';
			} else if (bmi < 40) {
				bmiCategoryJasso = '肥満（3 度）';
			} else {
				bmiCategoryJasso = '肥満（4 度）';
			}

			// BMI categories by WHO
			if (bmi < 16) {
				bmiCategoryWho = 'Severe thinness';
			} else if (bmi < 17) {
				bmiCategoryWho = 'Moderate thinness';
			} else if (bmi < 18.5) {
				bmiCategoryWho = 'Mild thinness';
			} else if (bmi < 25) {
				bmiCategoryWho = 'Normal range';
			} else if (bmi < 30) {
				bmiCategoryWho = 'Pre-obese';
			} else if (bmi < 35) {
				bmiCategoryWho = 'Obese (Class I)';
			} else if (bmi < 40) {
				bmiCategoryWho = 'Obese (Class II)';
			} else {
				bmiCategoryWho = 'Obese (Class III)';
			}

			// 22 is the ideal BMI value.
			// x = height (m), y = healthy weight (kg)
			// 22 = y / x^2
			// y = 22 * x^2
			stdWeight = parseFloat((22 * heightPow2).toFixed(2));
			weightDiff = weight - stdWeight;
		}
	}

	const pageTitle = 'Web Tools - ' + METADATA.title;
	const canonicalUrl = SITE_URL + $page.url.pathname;
	const EMPTY = '-';
</script>

<HeadMetadata title={pageTitle} desc={METADATA.desc ?? ''} {canonicalUrl} ogType="article" />

<Space height="64px" />
<Title text={METADATA.title} />
<p>{METADATA.desc}</p>

<div>
	<div class="input">
		<div>
			<label for="weight" class="with-colon">体重</label><input
				type="number"
				bind:value={weight}
				min="0"
				step="0.1"
				id="weight"
			/><label for="weight">kg</label>
		</div>
		<div>
			<label for="height" class="with-colon">身長</label><input
				type="number"
				bind:value={height}
				min="0"
				step="0.1"
				id="height"
			/><label for="height">cm</label>
		</div>
	</div>
	<div class="result">
		<ul>
			<li><CopyButton text={bmi} />BMI: <span>{bmi ?? EMPTY}</span>kg/m²</li>
			<li><CopyButton text={formula} /><span>{formula ?? EMPTY}</span></li>
			<li>
				<CopyButton text={bmiCategoryJasso} /><a href="http://jasso.or.jp">JASSO</a
				>&nbsp;肥満度分類: <span>{bmiCategoryJasso ?? EMPTY}</span>
			</li>
			<li>
				<CopyButton text={bmiCategoryWho} /><a href="https://who.int">WHO</a>&nbsp;BMIカテゴリ:
				<span>{bmiCategoryWho ?? EMPTY}</span>
			</li>
			<li><CopyButton text={stdWeight} />標準体重: <span>{stdWeight ?? EMPTY}</span>kg</li>
			<li><CopyButton text={weightDiff} />標準体重との差: <span>{weightDiff ?? EMPTY}</span>kg</li>
		</ul>
	</div>
</div>

<ToolFooter {METADATA} />

<!-- svelte-ignore css-unused-selector -->
<style lang="scss">
	@use '$lib/stylesheets/tools/tool_page';

	@use '$lib/stylesheets/variables/color' as *;

	input[type='number'] {
		width: 87px;
	}
</style>
