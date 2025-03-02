<script lang="ts">
	export let license: string | null;
</script>

{#if license !== null}
	<p>
		{#if license === 'CC BY-SA 4.0'}
			<a
				href="https://creativecommons.org/licenses/by-sa/4.0/"
				target="_blank"
				rel="noopener noreferrer"
				class="cc no-after-icn"
			>
				<img
					src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-sa.svg"
					alt="CC BY-SA"
				/>
			</a>
		{/if}
	</p>
{/if}

<style lang="scss">
	img {
		width: 198px;
		height: auto;
		max-width: 100%;
		aspect-ratio: 20 / 7;
	}
</style>
