<script context="module" lang="ts">
	export const CC_LICENSES = ['CC BY-SA 4.0', 'CC BY 4.0'];
</script>

<script lang="ts">
	export let license: string;

	let conditions: string[];
	if (CC_LICENSES.includes(license)) conditions = license.split(' ')[1].toLowerCase().split('-');
</script>

{#if conditions !== undefined}
	<a
		href="https://creativecommons.org/licenses/{conditions.join('-')}/4.0/"
		target="_blank"
		rel="license noopener noreferrer"
		class="no-after-icn"
		>{license}<img
			src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
			alt=""
		/>{#each conditions as condition}<img
				src="https://mirrors.creativecommons.org/presskit/icons/{condition}.svg"
				alt=""
			/>{/each}</a
	>
{:else}
	<!-- Fail-safe for non-CC licenses -->
	{license}
{/if}

<style lang="scss">
	img {
		height: 24px;
		aspect-ratio: 1;
		margin-left: 2px;
		vertical-align: text-bottom;
	}
</style>
