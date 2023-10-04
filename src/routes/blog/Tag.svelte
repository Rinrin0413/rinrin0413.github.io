<script lang="ts">
    import { goto } from "$app/navigation";

	export let name: string;
	export let count: number;
	export let isEnabled: boolean;

    function toggle() {
        isEnabled = !isEnabled;

        const params = new URLSearchParams(location.search).getAll('t');
        let tagsInParam = 0 < params.length ? params[0].split(',') : [];
        if (isEnabled) {
            tagsInParam.push(name);
        } else {
            tagsInParam = tagsInParam.filter(t => t != name);
        }

        goto('/blog' + (0 < tagsInParam.length ? '?t=' + tagsInParam.join(',') : ''));
    }
</script>

<li class:enabled={isEnabled}>
	<button on:click={toggle} class="tag-btn">
		{name}({count})
    </button>
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
