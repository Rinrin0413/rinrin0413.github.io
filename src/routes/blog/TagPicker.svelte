<script lang="ts">
    import Title2 from "$lib/components/Title2.svelte";
    import Tag from "./Tag.svelte";

    import type ArticleTagWithCount from "$lib/types/ArticleTagWithCount";

    export let allTags: ArticleTagWithCount[];
    export let pickedTags: string[];
</script>

<details open>
    <summary><Title2 text='Tags' /></summary>

    <ul>
        {#each allTags as { tag, count }}
            <Tag name={tag} count={count} enabled={pickedTags.includes(tag)} />
        {/each}
    </ul>
</details>

<style lang="scss">
    details[open] summary::before {
        rotate: 0deg;
    }

    summary {
        list-style: none;
        cursor: pointer;

        &::-webkit-details-marker {
            display: none;
        }

        &::before {
            content: '▼';
            display: inline-block;
            font-size: 18px;
            rotate: -90deg;
            transition: 0.2s;
        }
    }

    ul {
	    padding: 0;
		margin: 6px 0;
        margin-bottom: 32px;
    }
</style>
