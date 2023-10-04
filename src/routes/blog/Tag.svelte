<script lang="ts">
    export let name: string;
    export let count: number;
    export let enabled: boolean;
</script>

<li class:enabled>
    <a href={`/blog${enabled ? '' : `?t=${name}`}`} class="tag-btn">
        {name}({count})
    </a>
</li>

<style lang="scss">;
	@use '/assets/stylesheets/blog/tag';

    li:not(.enabled) {
        opacity: 0.53;
        transition: 0.17s;

        &:hover {
            opacity: 0.7;
        }
    }
</style>
