<script lang="ts">
    import type { ArticleMetadata } from "$lib/types";

    export let articles: ArticleMetadata[];
</script>

<ul>
    {#each articles as meta}
        <li>
            <a href="/blog/articles/{meta.slug}">{meta.title}</a>
        </li>
    {/each}
</ul>
