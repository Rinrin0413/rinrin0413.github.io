<script lang="ts">
	
	interface Props {
		/** The intrinsic height of the space. */
		height: string;
	}

	let { height }: Props = $props();
</script>

<div style="height: {height};"></div>

<style>
	div {
		display: block;
	}
</style>
