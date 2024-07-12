# 新規ページを追加した際にすべきこと

1. クロールさせるなら [`sitemap.xml/+server.ts`](../src/routes/sitemap.xml/+server.ts) に追加する。
1. ユーザー向けサイトマップに載せるなら [`Footer.svelte`](../src/lib/components/Footer.svelte) と [`README.md`](../README.md) に追加する。
1. 静的ならば [`svelte.config.js`](../svelte.config.js) の `CLOUDFLARE_ROUTES_EXCLUDE` 定数に追加する。(ワイルドカードなどで追加される場合を除く)
