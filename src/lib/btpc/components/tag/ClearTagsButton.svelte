<script lang="ts">
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
</script>

<a href={$page.url.pathname}>{$_('tag.clearFilters')}</a>

<style lang="scss">
	@use '$lib/stylesheets/variables/color' as *;

	a {
		display: inline-block;
		color: inherit;
		text-decoration: none;
		font-size: 16px;
		padding: 6px 8px;
		background: $btn-primary;
		border: 3px solid $btn-secondary;
		cursor: pointer;
		border-radius: 4px;
		margin: 0 6px;
		margin-top: 12px;
		font-family: inherit;
		box-shadow: 0 0 14px #00000050;
		transition: 0.2s;

		&:hover {
			filter: brightness(1.06);
			transform: translateY(3px);
		}
	}
</style>
