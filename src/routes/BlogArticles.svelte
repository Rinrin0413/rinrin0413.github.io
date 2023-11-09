<script lang="ts">
    import type { ArticleMetadata } from "$lib/types";
    import { _ } from "svelte-i18n";

    export let articles: ArticleMetadata[];
</script>

<ul>
    {#each articles as meta}
        <li>
            <a href="/blog/articles/{meta.slug}">{meta.title}</a>
        </li>
    {/each}
</ul>
