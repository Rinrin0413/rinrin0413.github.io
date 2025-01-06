<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<p>
	{$_('tools.notes.0')}<br />{$_('tools.notes.1')}<a
		href="https://github.com/Rinrin0413/rinrin0413.github.io/issues/new"
		target="_blank"
		rel="noopener noreferrer">GitHub</a
	>{$_('tools.notes.2')}
</p>

<style lang="scss">
	p {
		font-size: 13px;
	}

	a::after {
		$size: 0.7rem !important;
		width: $size;
		height: $size;
	}
</style>
