<script module lang="ts">
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
	import { slide } from 'svelte/transition';

	const DAY_OF_WEEK = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	] as const;

	const DAY_OF_WEEK_LABELS: Record<DayOfWeek, string> = {
		Sunday: '日曜日',
		Monday: '月曜日',
		Tuesday: '火曜日',
		Wednesday: '水曜日',
		Thursday: '木曜日',
		Friday: '金曜日',
		Saturday: '土曜日'
	};

	type VariableStats = {
		mean: number;
		median: number;
		stdDev: number;
		min: number;
		max: number;
		q1: number;
		q3: number;
	};

	type DayOfWeek = (typeof DAY_OF_WEEK)[number];

	type Statistics = {
		nSamples: number;
		date: string;
		corr: number;
		pVal: number;
		variableStats: {
			awakeStats: VariableStats;
			sleepStats: VariableStats;
		};
		regrModels: (
			| {
					name:
						| '4次多項式回帰'
						| '線形回帰'
						| '3次多項式回帰'
						| '2次多項式回帰'
						| '指数回帰'
						| '対数回帰'
						| '累乗回帰';
					f: (x: number) => number;
					r2: number;
					adjR2: number;
			  }
			| {
					name: '線形重回帰';
					f: (x: number, dow: DayOfWeek) => number;
					r2: number;
					adjR2: number;
			  }
		)[];
	};

	type ModelName = Statistics['regrModels'][number]['name'];

	const MODEL_COLORS: Record<ModelName, string> = {
		線形重回帰: '#63a7e4',
		'4次多項式回帰': '#aa84e6',
		'3次多項式回帰': '#e76b70',
		'2次多項式回帰': '#d29d38',
		線形回帰: '#48baaa',
		指数回帰: '#68bf68',
		対数回帰: '#eb8b52',
		累乗回帰: '#e06da8'
	};
	const MODEL_COLOR_ALPHA_HEX = '40';
	const AVG_POINT_COLOR = '#38220b';

	// prettier-ignore
	const STATISTICS: Statistics = {nSamples:723,date:'2026-09-21',corr:0.37776569017450007,pVal:6.097929990849042e-26,variableStats:{awakeStats:{mean:18.611479944816043,median:17.55,stdDev:6.172375043105346,min:1.1,max:38.8,q1:14.858333335000001,q3:21.116666665},sleepStats:{mean:10.078469340742737,median:9.866666667,stdDev:3.6664945513531833,min:1.066666667,max:20.75,q1:7.55,q3:12.56666667}},regrModels:[{name:'線形重回帰',f:(x,dow)=>{const dowAdj={'Friday':0.,'Monday':2.1517297614054773,'Saturday':-1.4137495509472477,'Sunday':3.3389299671269423,'Thursday':0.9630602719081417,'Tuesday':2.4239326596458248,'Wednesday':2.3101349516577079}[dow];return 0.2213426951392897*x+dowAdj+4.497586634276423},r2:0.346628818979718,adjR2:0.3400669850239907},{name:'4次多項式回帰',f:(x)=>8.221102696542664-0.0005718673206981*x-0.0062506883890610*(x*x)+0.0009378047068810*(x*x*x)-0.0000181507378305*(x*x*x*x),r2:0.15162054195242292,adjR2:0.1468941939967261},{name:'3次多項式回帰',f:(x)=>8.273898303994219-0.2030735261399484*x+0.0224907476823056*(x*x)-0.0003522363422562*(x*x*x),r2:0.14778070192879178,adjR2:0.1442248495029036},{name:'2次多項式回帰',f:(x)=>6.614152197985271+0.1461886349227861*x+0.0019340974024287*(x*x),r2:0.14378155615879828,adjR2:0.14140317159257276},{name:'線形回帰',f:(x)=>0.2243991713141499*x+5.902068664196098,r2:0.1427069166730166,adjR2:0.14151788327034387},{name:'指数回帰',f:(x)=>5.9357060116883860*Math.exp(0.0242233987848270*x),r2:0.12427421989128506,adjR2:0.12305962102844348},{name:'対数回帰',f:(x)=>2.9952139155808948*Math.log(x)+1.5205641877255474,r2:0.11086405632693686,adjR2:0.1096308580694153},{name:'累乗回帰',f:(x)=>3.4917297385643633*x**0.3434916482579419,r2:0.1089621844983456,adjR2:0.10772634841581907}]};

	const MAX_AWAKE_DURATION = 40;

	const CHART_OPTIONS: ChartOptions<'line'> = {
		scales: {
			x: {
				title: { display: true, text: '覚醒継続時間（時間）' },
				min: 0,
				max: MAX_AWAKE_DURATION
			},
			y: { title: { display: true, text: '睡眠時間（時間）' }, min: 4, max: 15 }
		}
	};

	Chart.register(...registerables);

	// The default value should be a multiple of 0.5 because the `<input>` element and graph steps are 0.5.
	let awakeDuration = $state(roundToHalf(STATISTICS.variableStats.awakeStats.mean));

	let renderGraph = $state(false);
	let chartData: ChartData<'line', (number | Point)[], unknown> | undefined = $state.raw();

	let chartRef: Chart<'line'> | null = $state(null);

	let enableMultiRegr = $state(false);
	let selectedDayOfWeek: DayOfWeek = $state(getCurrentDayOfWeek());

	let filteredRegrModels = $derived(
		STATISTICS.regrModels.filter((model) => model.name !== '線形重回帰' || enableMultiRegr)
	);

	/** Returns a supplied numeric expression rounded to the nearest multiple of 0.5. */
	function roundToHalf(x: number) {
		return Math.round(x * 2) * 0.5;
	}

	function getCurrentDayOfWeek(): DayOfWeek {
		return DAY_OF_WEEK[new Date().getDay()];
	}

	function setChartData() {
		if (!renderGraph) return;
		const xLabels = Array.from({ length: MAX_AWAKE_DURATION * 2 + 1 }, (_, i) => i * 0.5);
		chartData = {
			labels: xLabels,
			datasets: [
				...STATISTICS.regrModels.map((model) => ({
					label: model.name,
					data: xLabels.map((x) => {
						if (model.name === '線形重回帰') return model.f(x, selectedDayOfWeek);
						return model.f(x);
					}),
					borderColor: MODEL_COLORS[model.name],
					backgroundColor: MODEL_COLORS[model.name] + MODEL_COLOR_ALPHA_HEX,
					hidden: model.name === '線形重回帰' && !enableMultiRegr
				})),
				{
					label: 'ReLUの平均',
					data: [{ x: roundToHalf(awakeDuration), y: avgReluInference }],
					pointBackgroundColor: AVG_POINT_COLOR,
					borderColor: AVG_POINT_COLOR,
					backgroundColor: AVG_POINT_COLOR + MODEL_COLOR_ALPHA_HEX,
					pointBorderWidth: 0,
					pointRadius: 9,
					pointHoverRadius: 18,
					showLine: false,
					animation: false
				}
			]
		};
	}

	function updateMultiRegrChart() {
		if (!renderGraph || chartRef === null) return;

		const multiRegrDataset = chartRef.data.datasets.find(
			(dataset) => dataset.label === '線形重回帰'
		);
		const multiRegrModel = STATISTICS.regrModels.find((model) => model.name === '線形重回帰');

		if (multiRegrDataset !== undefined && multiRegrModel !== undefined) {
			chartRef.setDatasetVisibility(
				chartRef.data.datasets.indexOf(multiRegrDataset),
				enableMultiRegr
			);

			const xLabels = chartRef.data.labels as number[];
			multiRegrDataset.data = xLabels.map((x) => multiRegrModel.f(x, selectedDayOfWeek));
		}

		chartRef.update('none');
	}

	let sleepDurations = $derived(
		filteredRegrModels.reduce(
			(acc, model) => {
				let sleepDuration: number;

				if (model.name === '線形重回帰') {
					sleepDuration = model.f(awakeDuration, selectedDayOfWeek);
				} else {
					sleepDuration = model.f(awakeDuration);
				}

				acc[model.name] = sleepDuration;
				return acc;
			},
			{} as Record<string, number>
		)
	);
	let avgReluInference = $derived(
		filteredRegrModels.reduce((acc, model) => {
			let sleepDuration = sleepDurations[model.name];
			if (sleepDuration < 0) sleepDuration = 0;
			acc += sleepDuration;
			return acc;
		}, 0) / filteredRegrModels.length
	);
	$effect(() => {
		if (renderGraph && chartRef !== null) {
			chartRef.data.datasets[STATISTICS.regrModels.length].data[0] = {
				x: roundToHalf(awakeDuration),
				y: avgReluInference
			};

			chartRef.update('none');
		}
	});
</script>

<ToolHead {metadata} />
<p>{metadata.desc}</p>

<div>
	<div class="input">
		<div>
			<label for="awake-dur" class="with-colon">覚醒継続時間</label><input
				type="number"
				bind:value={awakeDuration}
				min="0"
				max={MAX_AWAKE_DURATION}
				step="0.5"
				id="awake-dur"
			/><label for="awake-dur">時間</label>
		</div>
		<div>
			<input
				type="checkbox"
				bind:checked={enableMultiRegr}
				onchange={updateMultiRegrChart}
				id="dow-toggle"
			/><label for="dow-toggle" class:with-colon={enableMultiRegr}>覚醒曜日を指定（重回帰）</label
			>{#if enableMultiRegr}<select
					bind:value={selectedDayOfWeek}
					onchange={updateMultiRegrChart}
					aria-label="覚醒曜日"
					transition:slide={{ axis: 'x', duration: 150 }}
				>
					{#each DAY_OF_WEEK as dow (dow)}
						<option value={dow}>{DAY_OF_WEEK_LABELS[dow]}</option>
					{/each}
				</select>
			{/if}
		</div>
	</div>
	<div class="result">
		<ul>
			<li>睡眠時間の推論結果</li>
			{#each filteredRegrModels as model, i (model.name)}
				{@const adjR2 = model.adjR2.toFixed(4)}
				{@const name = model.name}
				{@const duration = sleepDurations[name]}
				{#if i !== 0}
					<li transition:slide><hr /></li>
				{/if}
				<li transition:slide><CopyButton text={adjR2} />{name} (補正R²<span>{adjR2}</span>)</li>
				<li transition:slide><CopyButton text={duration} /><span>{duration}</span>時間</li>
			{/each}
			<li><hr /></li>
			<li>ReLU の平均 = 1/n ∑max(0, xᵢ)</li>
			<li><CopyButton text={avgReluInference} /><span>{avgReluInference}</span>時間</li>
		</ul>
		{#if renderGraph}
			<div class="chart card">
				{#if chartData !== undefined}
					<Line
						bind:chart={chartRef}
						data={chartData}
						options={CHART_OPTIONS}
						width={window.innerWidth < 700 ? 3 : 7}
						height={4}
					/>
				{/if}
			</div>
		{/if}
		<p>
			<label for="render-graph">グラフを表示</label><input
				type="checkbox"
				bind:checked={renderGraph}
				onchange={setChartData}
				id="render-graph"
			/>
		</p>
	</div>
	<Hr />
	<div class="result">
		<Title2 text="データセットの統計" />
		<p>
			<CopyButton
				text={JSON.stringify(STATISTICS, (_, v) => (typeof v === 'function' ? v.toString() : v))}
			/>統計情報をコピー (JSON)
		</p>
		<div>
			<ul class="dataset">
				<li>標本数: {STATISTICS.nSamples}</li>
				<li>最終更新日: {STATISTICS.date}</li>
				<li>相関係数: {STATISTICS.corr}</li>
				<li>p値: {STATISTICS.pVal}</li>
				{#each Object.entries(STATISTICS.variableStats) as [varName, stats] (varName)}
					{@const varLabel = (varName === 'awakeStats' ? '覚醒時間' : '睡眠時間') + 'の'}
					<li>{varLabel}平均: {stats.mean}</li>
					<li>{varLabel}中央値: {stats.median}</li>
					<li>{varLabel}標準偏差: {stats.stdDev}</li>
					<li>{varLabel}最小値: {stats.min}</li>
					<li>{varLabel}最大値: {stats.max}</li>
					<li>{varLabel}第1四分位数: {stats.q1}</li>
					<li>{varLabel}第3四分位数: {stats.q3}</li>
				{/each}
				{#each STATISTICS.regrModels as model (model.name)}
					<li>{model.name}の関数: {model.f}</li>
					<li>{model.name}のR²: {model.r2}</li>
					<li>{model.name}の補正R²: {model.adjR2}</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
<ToolFooter {metadata} />

<!-- svelte-ignore css_unused_selector -->
<style lang="scss">
	@use '$lib/stylesheets/tools/tool_page';

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
