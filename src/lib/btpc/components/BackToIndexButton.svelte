<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let category: string;
</script>

<div><a href="/{category}">{$_(category + '.backToIndex')}</a></div>

<style lang="scss">
	a {
		display: inline-block;
		font-size: 18px;
		margin: 32px 0;
	}
</style>
