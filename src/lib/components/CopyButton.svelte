<script lang="ts">
	import toast from 'svelte-french-toast';
	import { TOAST_OPTIONS } from '$lib/scripts/variables';
	import { _ } from 'svelte-i18n';

	/** A text to be copied. */
	export let text: number | string | null;
</script>

<button
	on:click={() => {
		if (text === undefined || text === null) {
			toast.error($_('copy.failed'), TOAST_OPTIONS);
			console.error(`The text to be copied is \`${text}\`.`);
		} else {
			navigator.clipboard
				.writeText(text.toString())
				.then(() => toast.success($_('copy.copied') + '\n' + text, TOAST_OPTIONS))
				.catch((e) => {
					toast.error($_('copy.failed'), TOAST_OPTIONS);
					console.error(e);
				});
		}
	}}
	title={$_('copy.copy')}
>
	<img
		src="/images/google-material-design-icons/content_copy_24dp_533618_FILL0_wght400_GRAD0_opsz24_trimmed.svg"
		alt={$_('copy.copy')}
	/>
</button>

<style lang="scss">
	@use '$lib/stylesheets/variables/color' as *;

	$size: 20px;

	button {
		height: $size;
		padding: 0 6px 0 2px;
		background: none;
		border: none;
		cursor: pointer;
	}

	img {
		height: $size;
		aspect-ratio: 17 / 20;
	}
</style>
