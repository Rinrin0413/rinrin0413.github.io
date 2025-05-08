<script context="module" lang="ts">
	export const metadata = {
		title: 'Rinrinの睡眠時間推論機',
		desc: '覚醒時間から Rinrin.rs の睡眠時間を回帰式を用いて推論します。',
		tags: ['推論', '時間', 'rinrin専用']
	};
</script>

<script lang="ts">
	import ToolHead from '$lib/components/tools/ToolHead.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import { Line } from 'svelte-chartjs';
	import Hr from '$lib/components/Hr.svelte';
	import Title2 from '$lib/components/Title2.svelte';
	import ToolFooter from '$lib/components/tools/ToolFoot.svelte';

	import type { ChartOptions, ChartData, Point } from 'chart.js';
	import { Chart, registerables } from 'chart.js';

	// prettier-ignore
	const DATASET: {
		sampleCount: number;
		date: string;
		stats: {
			awake: { mean: number; stdDeviation: number };
			sleep: { mean: number; stdDeviation: number };
			correlation: number;
		};
		regrModels: { name: string; f: (x: number) => number; r2: number }[];
	} = {sampleCount:314,date:'2025-04-25',stats:{awake:{mean:17.54453290873248,stdDeviation:5.590159244635496},sleep:{mean:10.108598726197448,stdDeviation:3.456711408780611},correlation:0.19892494754201323},regrModels:[{name:'4次多項式回帰',f:(x)=>5.802273424939721+1.2288310762230592*x-0.1276134710405372*x**2+0.005266980566072556*x**3-0.00007121641045662812*x**4,r2:0.05050919431140133},{name:'2次多項式回帰',f:(x)=>9.54485022109572-0.062476197126860075*x+0.004896918033820394*x**2,r2:0.044336644191008245},{name:'指数回帰',f:(x)=>7.376104026024257*Math.exp(0.014176460654327023*x),r2:0.04256598054438976},{name:'線形回帰',f:(x)=>0.12300653801936476*x+7.950506471927456,r2:0.03957113475458529},{name:'累乗回帰',f:(x)=>5.577721952613809*x**0.18828034147628198,r2:0.03470732121054587},{name:'対数回帰',f:(x)=>1.5636571295366162*Math.log(x)+5.722057368727447,r2:0.029558970498595127}]};

	const MAX_AWAKE_DURATION = 35;

	const CHART_OPTIONS: ChartOptions<'line'> = {
		scales: {
			x: { title: { display: true, text: '覚醒時間 (時間)' }, min: 0, max: MAX_AWAKE_DURATION },
			y: { title: { display: true, text: '睡眠時間 (時間)' }, min: 5, max: 14 }
		}
	};

	Chart.register(...registerables);

	// The default value should be a multiple of 0.5 because the `<input>` element and graph steps are 0.5.
	let awakeDuration = roundToHalf(DATASET.stats.awake.mean);

	$: sleepDurations = DATASET.regrModels.reduce(
		(acc, model) => {
			acc[model.name] = model.f(awakeDuration);
			return acc;
		},
		{} as Record<string, number>
	);

	let renderGraph = false;
	let chartData: ChartData<'line', (number | Point)[], unknown>;
	$: if (renderGraph && chartData !== undefined)
		chartData.datasets[DATASET.regrModels.length].data[0] = {
			x: roundToHalf(awakeDuration),
			y:
				DATASET.regrModels.reduce((acc, model) => {
					let sleepDuration = sleepDurations[model.name];
					if (sleepDuration < 0) sleepDuration = 0;
					return acc + sleepDuration;
				}, 0) / DATASET.regrModels.length
		};

	/** Returns a supplied numeric expression rounded to the nearest multiple of 0.5. */
	function roundToHalf(x: number) {
		return Math.round(x * 2) * 0.5;
	}

	function setChartData() {
		if (!renderGraph || chartData !== undefined) return;
		const xLabels = Array.from({ length: MAX_AWAKE_DURATION * 2 + 1 }, (_, i) => i * 0.5);
		chartData = {
			labels: xLabels,
			datasets: [
				...DATASET.regrModels.map((model) => ({
					label: model.name,
					data: xLabels.map((x) => model.f(x))
				})),
				{
					label: '推論値平均',
					data: [],
					pointBackgroundColor: '#38220b',
					pointBorderWidth: 0,
					pointRadius: 8,
					pointHoverRadius: 16,
					showLine: false,
					animation: false
				}
			]
		};
	}

	function fmtFunctionEquation(equation: (x: number) => number) {
		return (
			equation
				.toString()
				// Rename the minified variables to "x".
				.replace(/(?<![0-9A-Za-z])[A-Za-z](?![0-9A-Za-z])/g, 'x')
				// Replace "x => " and "x=>" with "y = ".
				.replace(/^(?:x => |x=>)/, 'y = ')
				// Restore the omitted zeros before a decimal point.
				.replace(/(?<![0-9A-Za-z])\.(?=\d)/g, '0.')
				// Add spaces around operators.
				// But ignore if the hyphen is a part of a exponential notation like `60369131017537305e-21`.
				// Maybe the division operator `/` will not be included in the regression equation.
				.replace(/ ?(?<!e)(\*\*|[+\-*]) ?/g, ' $1 ')
		);
	}
</script>

<ToolHead {metadata} />
<p>{metadata.desc}</p>

<div>
	<div class="input">
		<label for="awake-dur" class="with-colon">覚醒時間</label><input
			type="number"
			bind:value={awakeDuration}
			min="0"
			max={MAX_AWAKE_DURATION}
			step="0.5"
			id="awake-dur"
		/><label for="awake-dur">時間</label>
	</div>
	<div class="result">
		<ul>
			<li>睡眠時間の推論結果</li>
			{#each DATASET.regrModels as model, i}
				{@const r2 = model.r2.toFixed(4)}
				{@const name = model.name}
				{@const duration = sleepDurations[name]}
				{#if i !== 0}
					<li><hr /></li>
				{/if}
				<li><CopyButton text={r2} />{name} (R² ≒ <span>{r2}</span>)</li>
				<li><CopyButton text={duration} /><span>{duration}</span>時間</li>
			{/each}
		</ul>
		{#if renderGraph}
			<div class="chart card">
				<Line
					data={chartData}
					options={CHART_OPTIONS}
					width={window.innerWidth < 700 ? 3 : 7}
					height={4}
				/>
			</div>
		{/if}
		<p>
			<label for="render-graph">グラフを表示</label><input
				type="checkbox"
				bind:checked={renderGraph}
				on:change={setChartData}
				id="render-graph"
			/>
		</p>
	</div>
	<Hr />
	<div class="result">
		<Title2 text="データセットの概要" />
		<p>
			<CopyButton
				text={JSON.stringify(DATASET, (_, v) => (typeof v === 'function' ? v.toString() : v))}
			/>データセットをコピー (JSON)
		</p>
		<div>
			<ul class="dataset">
				<li>サンプル数: {DATASET.sampleCount}</li>
				<li>最終更新日: {DATASET.date}</li>
				<li>相関係数: {DATASET.stats.correlation}</li>
				<li>平均覚醒時間: {DATASET.stats.awake.mean}時間</li>
				<li>平均睡眠時間: {DATASET.stats.sleep.mean}時間</li>
				<li>覚醒時間の標準偏差: {DATASET.stats.awake.stdDeviation}時間</li>
				<li>睡眠時間の標準偏差: {DATASET.stats.sleep.stdDeviation}時間</li>
				{#each DATASET.regrModels as model}
					<li>{model.name}式: {fmtFunctionEquation(model.f)}</li>
					<li>{model.name}の決定係数: {model.r2}</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
<ToolFooter {metadata} />

<!-- svelte-ignore css-unused-selector -->
<style lang="scss">
	@use '$lib/stylesheets/tools/tool_page';

	@use '$lib/stylesheets/variables/mixin' as *;

	input[type='number'] {
		width: 80px;
	}

	.chart {
		max-width: min(1028px, 90%);
		margin-top: 22px !important;
		background-color: #ffffffb0 !important;
		border-color: #ffffff !important;
	}

	.dataset,
	code {
		@include source-code-pro;
	}

	.dataset {
		display: inline-block;
		max-width: min(449px, 90%);
		margin: 0 auto;
		margin-bottom: 48px;
		text-align: left;
		white-space: nowrap;
		overflow-x: scroll;
	}
</style>
