<script lang="ts">
	/**
	 * e.g.:
	 * - `"spring-roll_16px"`
	 * - `["gold-coin_16px", "silver-coin_16px"]`
	 *
	 * This filename is used like `/images/creations/{filename}.png` as a path of the image.
	 */
	export let filename: string | string[];
	/**
	 * e.g.:
	 * - `"春巻き"`
	 * - `"金貨と銀貨"`
	 *
	 * This subject name is used like `文字並に小さい{subjectName}のドット絵` as an alternative text of the image.
	 */
	export let subjectName: string;
</script>

<p>
	ドット絵の原寸大 → {#if typeof filename === 'string'}<img
			src="/images/creations/{filename}.png"
			alt="文字並に小さい{subjectName}のドット絵"
		/>{:else}{#each filename as name, i}<img
				src="/images/creations/{name}.png"
				alt={i === 0 ? `文字並に小さい${subjectName}のドット絵` : ''}
			/>{/each}{/if} ←
</p>

<style lang="scss">
	img {
		vertical-align: middle;
		image-rendering: pixelated;
	}
</style>
