<script context="module" lang="ts">
	export const metadata = {
		title: '色混合機',
		desc: '複数の色を混合します。',
		tags: ['色']
	};
</script>

<script lang="ts">
	import ToolHead from '$lib/components/tools/ToolHead.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import ToolFooter from '$lib/components/tools/ToolFoot.svelte';

	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	const METHODS = ['中間混色', '加法混色', '減法混色'] as const;

	type Method = (typeof METHODS)[number];
	type Triplet = [number, number, number];

	let method: Method = METHODS[0];
	let colorCodes = ['#ff0000', '#0000ff'];

	let colors: Triplet[];
	$: colors = colorCodes.map(colorCodeToRgb);
	let mixedColor: Triplet;
	$: mixedColor = mixColors(colors, method);

	$: [colorCode, rgb255, rgb1, cmyk, hsl, hsv] = format(mixedColor);

	/** Converts a six-digit hexadecimal color code string to an RGB array `[r, g, b]` (0~255). */
	function colorCodeToRgb(color: string): Triplet {
		if (!/^#([0-9a-f]{6})$/i.test(color)) return [NaN, NaN, NaN];

		// ('#' + 'XXXXXX').length === 7
		if (color.length === 7)
			return [
				parseInt(color.slice(1, 3), 16),
				parseInt(color.slice(3, 5), 16),
				parseInt(color.slice(5, 7), 16)
			];

		return [NaN, NaN, NaN];
	}

	/** Mixes the colors using the specified method. */
	function mixColors(colors: Triplet[], method: Method) {
		let result: number[];
		switch (method) {
			case '中間混色': {
				result = sumColors(colors).map((c) => Math.round(c / colors.length));
				break;
			}
			case '加法混色': {
				result = sumColors(colors).map((v) => Math.min(v, 255));
				break;
			}
			case '減法混色': {
				result = colors
					.reduce(
						(acc, cur) => [
							acc[0] * (cur[0] / 255),
							acc[1] * (cur[1] / 255),
							acc[2] * (cur[2] / 255)
						],
						[255, 255, 255]
					)
					.map((v) => Math.round(v));
				break;
			}
		}
		if (colors.length === 0) result = [NaN, NaN, NaN];
		return result as Triplet;
	}

	/** Sums the given RGB colors (0~255). */
	function sumColors(colors: Triplet[]) {
		return colors.reduce(
			(acc, cur) => [acc[0] + cur[0], acc[1] + cur[1], acc[2] + cur[2]],
			[0, 0, 0]
		);
	}

	/** Generates color strings from the mixed color array. */
	function format(mixedColor: Triplet): [string, string, string, string, string, string] {
		const INVALID = 'INVALID';
		const mixedColorIsInvalid = mixedColor !== undefined && mixedColor.some((c) => isNaN(c));
		if (mixedColor === undefined || mixedColorIsInvalid)
			return [INVALID, INVALID, INVALID, INVALID, INVALID, INVALID];

		// RGB (0~1)
		const rgb1 = mixedColor.map((c) => c / 255) as Triplet;

		return [
			'#' + mixedColor.map((c) => c.toString(16).padStart(2, '0')).join(''),
			`rgb(${mixedColor.join(', ')})`,
			`rgb(${rgb1.map((c) => parseFloat(c.toFixed(2))).join(', ')})`,
			rgb1ToCmyk(rgb1),
			rgb1ToHsl(rgb1),
			rgb1ToHsv(rgb1)
		];
	}

	/** Converts the RGB (0~1) color to CMYK string. */
	function rgb1ToCmyk(rgb1: Triplet) {
		const [r, g, b] = rgb1;

		let k = 1 - Math.max(r, g, b);
		let c = (1 - r - k) / (1 - k);
		let m = (1 - g - k) / (1 - k);
		let y = (1 - b - k) / (1 - k);

		if (k === 1) [c, m, y] = [0, 0, 0];

		[c, m, y, k] = [c, m, y, k].map((v) => Math.round(v * 100));

		return `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
	}

	/** Converts the RGB (0~1) color to HSL string. */
	function rgb1ToHsl(rgb1: Triplet) {
		const [r, g, b] = rgb1;

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		const delta = max - min;

		let h = 0;
		let s = 0;
		let l = (max + min) * 0.5;

		if (delta !== 0) {
			s = l <= 0.5 ? delta / (max + min) : delta / (2 - max - min);
			switch (max) {
				case r:
					h = (g - b) / delta;
					break;
				case g:
					h = 2 + (b - r) / delta;
					break;
				case b:
					h = 4 + (r - g) / delta;
					break;
			}
			h *= 60;
			if (h < 0) h += 360;
		}

		return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
	}

	/** Converts the RGB (0~1) color to HSV string. */
	function rgb1ToHsv(rgb1: Triplet) {
		const [r, g, b] = rgb1;

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		const delta = max - min;

		let h = 0;
		let s = 0;
		let v = max;

		if (delta !== 0) {
			s = delta / max;
			switch (max) {
				case r:
					h = (g - b) / delta;
					break;
				case g:
					h = 2 + (b - r) / delta;
					break;
				case b:
					h = 4 + (r - g) / delta;
					break;
			}
			h *= 60;
			if (h < 0) h += 360;
		}

		return `hsv(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%)`;
	}

	/** Normalizes the hexadecimal color code string. */
	function normalizeColorCode(colorIndex: number) {
		let color = colorCodes[colorIndex];

		// Prepend `'#'` to the color code if it does not start with `'#'`.
		if (!color.startsWith('#')) color = `#${color}`;

		// Convert the three-digit format color code to six-digit format.
		// ('#' + 'XXX').length === 4
		if (color.length === 4) {
			const r = color[1] + color[1];
			const g = color[2] + color[2];
			const b = color[3] + color[3];
			color = `#${r}${g}${b}`;
		}

		colorCodes[colorIndex] = color;
	}

	/** Deletes the color at the specified index from the `colors` array. */
	function deleteColor(index: number) {
		colorCodes = colorCodes.filter((_, i) => i !== index);
	}

	/** Converts the CMYK color string to RGB color string. */
	function cmykToRgb(cmyk: string) {
		const [c, m, y, k] = cmyk
			.replace(/cmyk\(|\)/g, '')
			.replace(/%/g, '')
			.split(',')
			.map((v) => parseFloat(v) * 0.01);

		const r = 255 * (1 - c) * (1 - k);
		const g = 255 * (1 - m) * (1 - k);
		const b = 255 * (1 - y) * (1 - k);

		return `rgb(${r}, ${g}, ${b})`;
	}

	/** Converts the HSV color string to HSL color string. */
	function hsvToHsl(hsv: string) {
		const [h, s, v] = hsv
			.replace(/hsv\(|\)/g, '')
			.replace(/%/g, '')
			.split(',')
			.map((v) => parseFloat(v) * 0.01);

		const l = v * (1 - s * 0.5);
		const sHsl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);

		return `hsl(${h * 100}, ${sHsl * 100}%, ${l * 100}%)`;
	}
</script>

<ToolHead {metadata} />
<p>{metadata.desc}<br />アルファ成分(不透明度)は非対応です。</p>

<div>
	<div class="input">
		<select bind:value={method}>
			{#each METHODS as m}
				<option value={m}>{m}</option>
			{/each}
		</select>
		<ul class="colors">
			{#each colorCodes as color, i (i)}
				<li
					class="color"
					class:invalid={colors[i].some((v) => isNaN(v))}
					transition:scale={{ duration: 200 }}
					animate:flip={{ duration: 200 }}
				>
					<input type="color" bind:value={color} /><input
						type="text"
						bind:value={color}
						placeholder="#00ff00"
						on:change={() => normalizeColorCode(i)}
						aria-label="色{i + 1}"
					/><button class="delete-btn" on:click={() => deleteColor(i)} aria-label="色を削除">
						<img
							src="/images/google-material-design-icons/close_24dp_533618_FILL0_wght400_GRAD0_opsz24.svg"
							alt="色を削除"
						/>
					</button>
				</li>
			{/each}
		</ul>
		<div>
			<button
				class="add-btn"
				on:click={() =>
					(colorCodes = [
						...colorCodes,
						`#${Math.floor(Math.random() * 0xffffff)
							.toString(16)
							.padStart(6, '0')}`
					])}
				aria-label="色を追加">+</button
			>
		</div>
	</div>
	<div class="result" class:invalid={colorCode === 'INVALID'}>
		<ul>
			<li>
				<CopyButton text={colorCode} />カラーコード:
				<div style="background-color: {colorCode};" />
				<span>{colorCode}</span>
			</li>
			<li>
				<CopyButton text={rgb255} />RGB:
				<div style="background-color: {rgb255};" />
				<span>{rgb255}</span>
			</li>
			<li>
				<CopyButton text={rgb1} />RGB(比率):
				<div
					style="background-color: rgb({rgb1
						.replace(/rgb\(|\)/g, '')
						.split(',')
						.map((c) => parseFloat(c) * 255)
						.join(', ')});"
				/>
				<span>{rgb1}</span>
			</li>
			<li>
				<CopyButton text={cmyk} />CMYK:
				<div style="background-color: {cmykToRgb(cmyk)};" />
				<span>{cmyk}</span>
			</li>
			<li>
				<CopyButton text={hsl} />HSL:
				<div style="background-color: {hsl};" />
				<span>{hsl}</span>
			</li>
			<li>
				<CopyButton text={hsv} />HSV:
				<div style="background-color: {hsvToHsl(hsv)};" />
				<span>{hsv}</span>
			</li>
		</ul>
	</div>
</div>

<ToolFooter {metadata} />

<!-- svelte-ignore css-unused-selector -->
<style lang="scss">
	@use '$lib/stylesheets/tools/tool_page';
	@use '$lib/stylesheets/variables/color' as *;

	.colors {
		display: flex;
		padding: 0;
		gap: 12px 6px;
		list-style: none;
		flex-wrap: wrap;
		justify-content: center;
	}

	$bg-col: #ffffff80;
	$border: 2px solid #00000050;
	$border-radius: 4px;

	.color {
		width: 136px;
		padding: 4px 0;
		background-color: $bg-col;
		border: $border;
		border-radius: $border-radius;

		&.invalid {
			border-color: red;

			input[type='color'] {
				opacity: 0.4;
			}
		}
	}

	input {
		&[type='color'] {
			$margin: 3px;
			display: block;
			width: calc(100% - $margin * 2);
			height: 54px;
			margin: 0 $margin;
			padding: 2px;
			background: none;
			border: none;
		}

		&[type='text'] {
			width: 88px;
		}
	}

	.delete-btn {
		padding: 0;
		position: relative;
		bottom: 1px;
		background: none;
		border: none;
		cursor: pointer;
	}

	img {
		height: 26px;
		aspect-ratio: 1;
		vertical-align: middle;
	}

	.add-btn {
		height: 38px;
		aspect-ratio: 1;
		font-size: 34px;
		color: inherit;
		background-color: $bg-col;
		border: $border;
		border-radius: 6px;
		line-height: 0;
		cursor: pointer;
	}

	.result {
		&.invalid div {
			background: repeating-conic-gradient(
				#000000 0% 25%,
				#ff00ff 0% 50%,
				#000000 0% 75%,
				#ff00ff 0% 100%
			);
		}

		div {
			aspect-ratio: 1;
			width: 20px;
			margin-left: 6px;
			border: 1px solid #808080;
			border-radius: 2px;
		}
	}
</style>
