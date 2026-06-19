<script module lang="ts">
	export const metadata = {
		title: 'BMI計算機',
		desc: '体重と身長からボディマス指数(BMI)を計算します。',
		tags: ['計算', 'bmi']
	};
</script>

<script lang="ts">
	import ToolHead from '$lib/components/tools/ToolHead.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import ToolFooter from '$lib/components/tools/ToolFoot.svelte';

	let weight = $state(39.1);
	let height = $state(162.3);

	let result = $derived.by(() => {
		const emptyResult = {
			bmi: null,
			formula: null,
			bmiCategoryJasso: null,
			bmiCategoryWho: null,
			stdWeight: null,
			weightDiff: null
		};

		if (weight === undefined || height === undefined) return emptyResult;

		const heightMeters = height * 0.01;
		const heightPow2 = heightMeters * heightMeters;
		// BMI = weight / height^2
		const bmi = parseFloat((weight / heightPow2).toFixed(4));

		if (isNaN(bmi)) return emptyResult;

		// BMI categories by JASSO
		let bmiCategoryJasso: string;
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
		let bmiCategoryWho: string;
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
		const stdWeight = parseFloat((22 * heightPow2).toFixed(2));

		return {
			bmi,
			formula: `${weight}/(${height}/100)^2 ≒ ${bmi}`,
			bmiCategoryJasso,
			bmiCategoryWho,
			stdWeight,
			weightDiff: parseFloat((weight - stdWeight).toFixed(2))
		};
	});

	const EMPTY = '-';
</script>

<ToolHead {metadata} />
<p>{metadata.desc}</p>

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
			<li><CopyButton text={result.bmi} />BMI: <span>{result.bmi ?? EMPTY}</span>kg/m²</li>
			<li><CopyButton text={result.formula} /><span>{result.formula ?? EMPTY}</span></li>
			<li>
				<CopyButton text={result.bmiCategoryJasso} /><a href="http://jasso.or.jp">JASSO</a
				>&nbsp;肥満度分類: <span>{result.bmiCategoryJasso ?? EMPTY}</span>
			</li>
			<li>
				<CopyButton text={result.bmiCategoryWho} /><a href="https://who.int">WHO</a
				>&nbsp;BMIカテゴリ: <span>{result.bmiCategoryWho ?? EMPTY}</span>
			</li>
			<li>
				<CopyButton text={result.stdWeight} />標準体重: <span>{result.stdWeight ?? EMPTY}</span>kg
			</li>
			<li>
				<CopyButton text={result.weightDiff} />標準体重との差:
				<span>{result.weightDiff ?? EMPTY}</span>kg
			</li>
		</ul>
	</div>
</div>

<ToolFooter {metadata} />

<!-- svelte-ignore css_unused_selector -->
<style lang="scss">
	@use '$lib/stylesheets/tools/tool_page';

	@use '$lib/stylesheets/variables/color' as *;

	input[type='number'] {
		width: 87px;
	}
</style>
