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
	<!--
		Google Material Symbols and Icons - Content Copy
		https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Acontent_copy%3AFILL%400%3Bwght%40400%3BGRAD%400%3Bopsz%4024
		This icon is licensed under the Apache License Version 2.0: https://github.com/google/material-design-icons/blob/master/README.md
	-->
	<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
		><path
			d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"
		/></svg
	>
</button>

<style lang="scss">
	@use '$lib/stylesheets/variables/color' as *;

	$size: 26px;

	button {
		height: $size;
		padding: 0;
		background: none;
		border: none;
		cursor: pointer;
	}

	svg {
		width: $size;
		height: $size;
		fill: $txt-primary;
	}
</style>
