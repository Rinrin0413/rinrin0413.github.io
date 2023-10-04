<script lang="ts">
	export let name: string;
	export let count: number;
	export let isEnabled: boolean;
</script>

<li class:isEnabled>
	<a href={`/blog${isEnabled ? '' : `?t=${name}`}`} class="tag-btn">
		{name}({count})
	</a>
</li>

<style lang="scss">
	@use '/assets/stylesheets/variables/mixin' as *;

	@use '/assets/stylesheets/blog/tag';

	li:not(.enabled) {
        $disabled-opacity: 0.53;

		opacity: $disabled-opacity;
		transition: 0.17s;

		&:hover {
			opacity: 0.7;

            @include sp {
                opacity: $disabled-opacity;
            }
		}
	}
</style>
