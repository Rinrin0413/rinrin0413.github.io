<script lang="ts">
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
</script>

<a href={$page.url.pathname}>{$_('tag.clearFilters')}</a>

<style lang="scss">
	@use '$lib/stylesheets/variables/mixin' as *;

	a {
		font-size: 16px;
		margin: 0 6px;
		margin-top: 12px;
		padding: 6px 8px;
		@include button;
	}
</style>
