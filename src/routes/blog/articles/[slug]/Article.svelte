<script lang="ts">
	import type { SvelteComponentTyped } from 'svelte';

	export let body: typeof SvelteComponentTyped;
</script>

<article><div><svelte:component this={body} /></div></article>

<style lang="scss" global>
	@use '/assets/stylesheets/variables/mixin' as *;

	article {
		max-width: 768px;
		margin: 0 auto;
		padding: 0 13px;

		> div {
			text-align: left;
			font-size: 18px;
			font-weight: lighter;
			letter-spacing: 1.2px;
			padding: 0 18px;
			@include glassmorphism;

			@include sp {
				font-size: 16px;
				padding: 0 10px;
			}

			img {
				max-width: 100%;
			}
		}
	}
</style>
