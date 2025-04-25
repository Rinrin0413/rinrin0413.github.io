<script context="module" lang="ts">
	export const metadata = {
		title: '犬・猫と人間の年齢換算機',
		desc: '犬や猫の年齢を人間の年齢に換算します。',
		tags: ['換算', '計算', '年齢']
	};
</script>

<script lang="ts">
	import ToolHead from '$lib/components/tools/ToolHead.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import ToolFooter from '$lib/components/tools/ToolFoot.svelte';

	let creature = '小〜中型犬';
	let creatureAge = 5.5;
	let humanAgeMoe: number | null;
	let humanAgeVetsNeJp: number | null;
	let humanAgeDnaMethylationBased: number | null;

	const MOE_TABLES = {
		smallMediumDogAndCat: [
			[0, 0],
			[1, 15],
			[2, 24],
			[3, 28]
		]
	};
	// Source:
	// 獣医師広報板(www.vets.ne.jp) より 犬・猫と人間の年齢換算表
	// https://vets.ne.jp/age/pc
	const VETS_NE_JP_TABLES = {
		smallMediumDogAndCat: [
			[0, 0],
			[1 / 12, 1],
			[2 / 12, 3],
			[0.25, 5],
			[0.5, 9],
			[0.75, 13],
			[1, 17],
			[1.5, 20],
			[2, 23],
			[3, 28],
			[4, 32],
			[5, 36],
			[6, 40],
			[7, 44],
			[8, 48],
			[9, 52],
			[10, 56],
			[11, 60],
			[12, 64],
			[13, 68],
			[14, 72],
			[15, 76],
			[16, 80],
			[17, 84],
			[18, 88],
			[19, 92],
			[20, 96]
		],
		largeDog: [
			[0, 0],
			[1, 12],
			[2, 19],
			[3, 26],
			[4, 33],
			[5, 40],
			[6, 48],
			[7, 54],
			[8, 60],
			[9, 68],
			[10, 76],
			[11, 81],
			[12, 86],
			[13, 92]
		]
	};

	$: if (creatureAge !== undefined) {
		if (creature === '小〜中型犬' || creature === '猫')
			humanAgeMoe =
				2 <= creatureAge
					? 24 + (creatureAge - 2) * 4
					: interpolate(creatureAge, MOE_TABLES.smallMediumDogAndCat);
		else if (creature === '大型犬')
			humanAgeMoe = 1 <= creatureAge ? 12 + (creatureAge - 1) * 7 : creatureAge * 12;
		else humanAgeMoe = null; // unreachable
		humanAgeMoe = toFixed(humanAgeMoe);

		let vetsNeJpTable: number[][] | null;
		if (creature === '小〜中型犬' || creature === '猫')
			vetsNeJpTable = VETS_NE_JP_TABLES.smallMediumDogAndCat;
		else if (creature === '大型犬') vetsNeJpTable = VETS_NE_JP_TABLES.largeDog;
		else vetsNeJpTable = null; // unreachable
		if (vetsNeJpTable !== null) humanAgeVetsNeJp = interpolate(creatureAge, vetsNeJpTable);
		else humanAgeVetsNeJp = null;
		humanAgeVetsNeJp = toFixed(humanAgeVetsNeJp);

		if (creature.includes('犬')) humanAgeDnaMethylationBased = 16 * Math.log(creatureAge) + 31;
		if (humanAgeDnaMethylationBased !== null && isNaN(humanAgeDnaMethylationBased))
			humanAgeDnaMethylationBased = null;
		if (humanAgeDnaMethylationBased !== null)
			humanAgeDnaMethylationBased = toFixed(humanAgeDnaMethylationBased);
	}

	function interpolate(age: number, table: number[][]) {
		if (age < table[0][0] || table[table.length - 1][0] < age) return null;
		for (let i = 0; i < table.length - 1; i++) {
			const [x1, y1] = table[i];
			const [x2, y2] = table[i + 1];
			if (x1 <= age && age <= x2) return y1 + ((age - x1) * (y2 - y1)) / (x2 - x1);
		}
		return table[table.length - 1][1];
	}

	function toFixed(value: number | null) {
		if (value === null) return null;
		return parseFloat(value.toFixed(4));
	}

	const EMPTY = '-';
</script>

<ToolHead {metadata} />
<p>{metadata.desc}参考程度に。</p>

<div>
	<div class="input">
		<div>
			<label for="dog-age" class="with-colon"
				><select bind:value={creature}>
					{#each ['小〜中型犬', '大型犬', '猫'] as c}
						<option value={c}>{c}</option>
					{/each}
				</select>の年齢</label
			><input type="number" bind:value={creatureAge} min="0" max="20" step="0.5" id="dog-age" />才
		</div>
	</div>
	<div class="result">
		<ul>
			<li>
				<CopyButton text={humanAgeVetsNeJp} /><a href="https://vets.ne.jp/age/pc"
					>獣医師広報板の表</a
				>より: <span>{humanAgeVetsNeJp ?? EMPTY}</span>歳
			</li>
			<li>
				<CopyButton text={humanAgeMoe} /><a
					href="https://www.env.go.jp/nature/dobutsu/aigo/2_data/pamph/petfood_guide_1808/pdf/full.pdf#page=11"
					>環境省パンフの目安</a
				>より: <span>{humanAgeMoe ?? EMPTY}</span>歳
			</li>
			{#if creature.includes('犬')}
				<li>
					<CopyButton text={humanAgeDnaMethylationBased} /><a
						href="https://cell.com/cell-systems/fulltext/S2405-4712(20)30203-9">DNAメチル化ベース</a
					>: <span>{humanAgeDnaMethylationBased ?? EMPTY}</span>歳
				</li>
			{/if}
		</ul>
	</div>
</div>

<ToolFooter {metadata} />

<!-- svelte-ignore css-unused-selector -->
<style lang="scss">
	@use '$lib/stylesheets/tools/tool_page';

	select {
		text-align: right;
	}

	input[type='number'] {
		width: 66px;
	}
</style>
