<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<span>{@render children?.()}</span>

<style lang="scss">
	span {
		font-size: 13px;
		opacity: 0.7;
	}
</style>
