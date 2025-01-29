<script lang="ts">
	/**
	 * e.g. "spring-roll_16px"
	 *
	 * This filename is used like `/images/creations/{filename}.png` as a path of the image.
	 */
	export let filename: string;
	/**
	 * e.g. "春巻き"
	 *
	 * This subject name is used like `文字並に小さい{subjectName}のドット絵` as an alternative text of the image.
	 */
	export let subjectName: string;
</script>

<p>
	ドット絵の原寸大 → <img
		src="/images/creations/{filename}.png"
		alt="文字並に小さい{subjectName}のドット絵"
	/> ←
</p>
