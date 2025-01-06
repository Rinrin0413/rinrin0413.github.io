# Specifications

<details>
<summary>Z-Index</summary>
<div>

| Z-Index | Entity | Path |
| --: | --- | --- |
| 2048 | noscript | [`layout.scss>noscript`](/src/lib/stylesheets/layout.scss) |
| 1031 | nprogress { bar, spinner }  | [`/node_modules/nprogress/nprogress.css>#nprogress .bar`](/node_modules/nprogress/nprogress.css), [`/node_modules/nprogress/nprogress.css>#nprogress .spinner`](/node_modules/nprogress/nprogress.css) |
| 132 | header skip btn | [`header.scss>.skip-btn`](/src/lib/stylesheets/header/header.scss) |
| 129 | header logo | [`header.scss>.header-logo img`](/src/lib/stylesheets/header/header.scss) |
| 128 | header title | [`header.scss>.header-logo::after`](/src/lib/stylesheets/header/header.scss) |
| 127 | header, header bg | [`header.scss>header, .header-bg`](/src/lib/stylesheets/header/header.scss) |
| 126 | footer | [`footer.scss>footer`](/src/lib/stylesheets/footer.scss) |
| 42 | sharing dropdown menu | [`share_button.scss>ul &.menu`](/src/lib/btpc/stylesheets/share_button.scss) |
| -1 | bg wallpaper | [`style.scss>html &::before`](/src/lib/stylesheets/style.scss) |
| -1 | unconfirmed fixed element | [`layout.scss>#bg`](/src/lib/stylesheets/layout.scss) |

---

</div>
</details>

<details>
<summary>CSS Variables</summary>
<div>

| Name | Description | Usable area |
| --: | --- | --- |
| `--max-vh001` | viewport max height ever * 0.01 (realtime update) | all |
| `--rt-vh001` | viewport height ever * 0.01 (realtime update) | all |

---

</div>
</details>

<details>
<summary>Fonts</summary>
<div>

Default font weight is `500`.

**Use the Sass mixin `bold` to make the text bold.**

- [Kiwi Maru](#kiwi-maru)
- [Source Code Pro](#source-code-pro)
- [Kaisei Decol](#kaisei-decol)

---

## `'Kiwi Maru'`

<!-- - Light: `300`
- Regular: `400` -->
- Medium: `500`

**Do not use**: `100`, `200`, `300`, `400`, `600`, `700`, `800`, `900`, `normal`, `bold`, `lighter`, `bolder`

## `'Source Code Pro'`

Use the Sass mixin `source-code-pro` to apply the font.

<!-- - ExtraLight: `200`
- Light: `300`
- Regular: `400` -->
- Medium: `500`
<!-- - SemiBold: `600`
- Bold: `700`
- ExtraBold: `800`
- Black: `900` -->

**Do not use**: `100`, `200`, `300`, `400`, `600`, `700`, `800`, `900`, `normal`, `bold`, `lighter`, `bolder`

## `'Kaisei Decol'`

Use the Sass mixin `kaisei-decol` to apply the font.

<!-- - Regular: `400`
- Medium: `500` -->
- Bold: `700`

**Must specify the `font-weight` to `700`**

---

</div>
</details>

<details>
<summary>API Endpoints</summary>
<div>

- [Articles](#articles---get-apiarticles) (`/api/articles`)
- [Article Tags](#article-tags---get-apiarticlestags) (`/api/articles/tags`)
- [Article Thumbnail Image Formats](#article-thumbnail-image-formats---get-apiarticlesthumbnail-imgs) (`/api/articles/thumbnail-imgs`)
- [Tools](#tools---get-apitools) (`/api/tools`)
- [Tool Tags](#tool-tags---get-apitoolstags) (`/api/tools/tags`)

## Articles - `GET /api/articles`

Returns a list of blog articles.

### Query Parameters

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| `l` | `number?` | Limit the number of articles to return. `0` means no limit. | `0` |
| `t` | `string[]?` | Filter articles by tags. Example: `t=tag1,tag2` | - |
| `indexed` | `boolean?` | Whether to return indexed articles only. | `false` |

### Response Body

`ArticleMetadata[]` ([`/src/lib/btpc/scripts/types.ts`](/src/lib/btpc/scripts/types.ts))

- `[]` (`object[]`) - The list of articles.
	- `published` (`boolean`) - Whether the article is published.
	- `indexed` (`boolean`) - Whether the article is indexed.
	- `title` (`string`) - The title of the article.
	- `desc` (`string | null`) - The description of the article.
	- `tags` (`string[] | null`) - The list of tags of the article.
	- `slug` (`string?`) - The slug of the article. Its type is an optional string but it always exists.

#### Example

```json
[
  {
    "published": true,
    "indexed": true,
    "title": "2024年の抱負",
    "desc": "気づいたらもう今年で高3です。今年のうちに決断しなければならないことが山ほどありそうで狂う。",
    "tags": [
      "年の抱負",
      "年末年始"
    ],
    "slug": "20240101"
  },
  {
    "published": true,
    "indexed": true,
    "title": "ブログ的なものを作った",
    "desc": "3ヶ月くらい開発してたブログがやっと形になったはなし。とりあえずの最初の記事。",
    "tags": [
      "ブログ",
      "web開発",
      "svelte"
    ],
    "slug": "20231215"
  },
  {
    "published": true,
    "indexed": false,
    "title": "記事の書式(?)について",
    "desc": "この記事はテスト記事です。",
    "tags": [
      "first",
      "test"
    ],
    "slug": "20230917_test"
  }
]
```

## Article Tags - `GET /api/articles/tags`

Returns a list of tags of valid(published and indexed) blog articles.

### Response Body

`TagWithCount[]` ([`/src/lib/btpc/scripts/types.ts`](/src/lib/btpc/scripts/types.ts))

- `[]` (`object[]`) - The list of tags.
	- `tag` (`string`) - The tag name.
	- `count` (`number`) - The number of articles that have the tag.


#### Example

```json
[
  {
    "tag": "svelte",
    "count": 1
  },
  {
    "tag": "web開発",
    "count": 1
  },
  {
    "tag": "ブログ",
    "count": 1
  },
  {
    "tag": "年の抱負",
    "count": 1
  },
  {
    "tag": "年末年始",
    "count": 1
  }
]
```

## Article Thumbnail Image Formats - `GET /api/articles/thumbnail-imgs`

Returns a list of articles that have a thumbnail image with the image file format.

### Response Body

`ArticleThumbnailImgFmts` ([`/src/lib/btpc/scripts/types.ts`](/src/lib/btpc/scripts/types.ts))

- `{}` (`object`) - The list of articles that have a thumbnail image with the image file format.
	- `[slug]` (`string`) - The thumbnail image file format of the article of this field name.

#### Example

```json
{
  "20231215": "webp",
  "20240101": "webp",
  "20230917_test": "webp"
}
```

## Tools - `GET /api/tools`

Returns a list of web tools.

### Query Parameters

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| `t` | `string[]?` | Filter tools by tags. Example: `t=tag1,tag2` | - |

### Response Body

`ToolMetadata[]` ([`/src/lib/btpc/scripts/types.ts`](/src/lib/btpc/scripts/types.ts))

- `[]` (`object[]`) - The list of web tools.
	- `title` (`string`) - The title of the tool.
	- `desc` (`string | null`) - The description of the tool.
	- `tags` (`string[] | null`) - The list of tags of the tool.
	- `id` (`string?`) - The ID of the tool. Its type is an optional string but it always exists.

#### Example

```json
[
  {
    "title": "時間差計算機",
    "desc": "2つの時刻間の経過時間を計算します。",
    "tags": [
      "計算",
      "時間"
    ],
    "slug": "time-diff"
  }
]
```

## Tool Tags - `GET /api/tools/tags`

Returns a list of tags of web tools.

### Response Body

`TagWithCount[]` ([`/src/lib/btpc/scripts/types.ts`](/src/lib/btpc/scripts/types.ts))

- `[]` (`object[]`) - The list of tags.
	- `tag` (`string`) - The tag name.
	- `count` (`number`) - The number of tools that have the tag.


#### Example

```json
[
  {
    "tag": "計算",
    "count": 1
  },
  {
    "tag": "時間",
    "count": 1
  }
]
```

---

</div>
</details>
