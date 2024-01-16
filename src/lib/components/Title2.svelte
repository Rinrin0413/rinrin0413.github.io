<script lang="ts">
	export let text: string;

	/**
	 * Defines a unique identifier (ID) which must be unique in the whole document.
	 * Its purpose is to identify the element when linking (using a fragment identifier).
	 */
	export let id: string | undefined | null = null;

	/** Defines inline CSS styles for an element. */
	export let style: string | undefined | null = null;
</script>

<h2 {id} {style}>{text}</h2>

<style lang="scss">
	@use '/assets/stylesheets/variables/color' as *;
	@use '/assets/stylesheets/variables/mixin' as *;

	h2 {
		display: inline-block;
		text-align: center;
		font-size: 28px;
		border-bottom: 6px solid rgba($text-primary, 0.5);
		padding: 0 10px;

		@include sp {
			font-size: 24px;
		}
	}
</style>
