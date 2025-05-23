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
- [Artworks](#artworks---get-apiartworks) (`/api/artworks`)
- [Artwork Categories](#artwork-categories---get-apiartworkscategories) (`/api/artworks/categories`)
- [Artwork Tags](#artwork-tags---get-apiartworkstags) (`/api/artworks/tags`)
- [Artwork Licenses](#artwork-licenses---get-apiartworkslicenses) (`/api/artworks/licenses`)
- [Projects](#projects) (`/api/projects`)
- [Project Tags](#project-tags---get-apiprojectstags) (`/api/projects/tags`)
- [Project Languages](#project-languages---get-apiprojectslangs) (`/api/projects/langs`)
- [Project Licenses](#project-licenses---get-apiprojectslicenses) (`/api/projects/licenses`)
- [Project Statuses](#project-statuses---get-apiprojectsstatuses) (`/api/projects/statuses`)

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
	- `tags` (`string[]`) - The list of tags of the article.
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

`ItemWithCount[]` ([`/src/lib/btpc/scripts/types.ts`](/src/lib/btpc/scripts/types.ts))

- `[]` (`object[]`) - The list of tags.
	- `item` (`string`) - The tag name.
	- `count` (`number`) - The number of articles that have the tag.

#### Example

```json
[
  {
    "item": "svelte",
    "count": 1
  },
  {
    "item": "web開発",
    "count": 1
  },
  {
    "item": "ブログ",
    "count": 1
  },
  {
    "item": "年の抱負",
    "count": 1
  },
  {
    "item": "年末年始",
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
	- `tags` (`string[]`) - The list of tags of the tool.
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

`ItemWithCount[]` ([`/src/lib/btpc/scripts/types.ts`](/src/lib/btpc/scripts/types.ts))

- `[]` (`object[]`) - The list of tags.
	- `item` (`string`) - The tag name.
	- `count` (`number`) - The number of tools that have the tag.


#### Example

```json
[
  {
    "item": "計算",
    "count": 1
  },
  {
    "item": "時間",
    "count": 1
  }
]
```

## Artworks - `GET /api/artworks`

Returns a list of artworks.

### Query Parameters

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| `c` | `string?` | Filter artworks by category. | - |
| `t` | `string[]?` | Filter artworks by tags. Example: `t=tag1,tag2` | - |
| `license` | `string?` | Filter artworks by license. | - |

### Response Body

`ArtworkMetadata[]` ([`/src/lib/btpc/scripts/types.ts`](/src/lib/btpc/scripts/types.ts))

- `[]` (`object[]`) - The list of artworks.
	- `category` (`string`) - The category of the artwork.
	- `title` (`string`) - The title of the artwork.
	- `desc` (`string | null`) - The description of the artwork.
	- `tags` (`string[]`) - The list of tags of the artwork.
	- `date` (`string | null`) - The date the artwork was created.
	- `usedTools` (`string[]`) - The list of used tools to create the artwork.
	- `license` (`string | null`) - The license of the artwork.
	- `thumbnailImg` (`string | null`) - The thumbnail image path of the artwork.
	- `id` (`string?`) - The ID of the artwork. Its type is an optional string but it always exists.

#### Example

```json
  {
    "category": "イラスト",
    "title": "404 Not like this",
    "desc": "本ウェブサイトの404エラーページ用に用意した画像。",
    "tags": [
      "^v^"
    ],
    "date": "2023-03-09T00:00:00.000Z",
    "usedTools": [
      "GIMP",
      "Squoosh"
    ],
    "license": "CC BY-SA 4.0",
    "thumbnailImg": "404-not-like-this.webp",
    "id": "404-not-like-this"
  },
  {
    "category": "イラスト",
    "title": "春巻き (16pxドット絵)",
    "desc": null,
    "tags": [
      "春巻き",
      "食べ物",
      "ドット絵",
      "16px"
    ],
    "date": "2020-04-30T00:00:00.000Z",
    "usedTools": [
      "paint.net"
    ],
    "license": "CC BY-SA 4.0",
    "thumbnailImg": "spring-roll_16px_upscaled.webp",
    "id": "spring-roll_16px"
  },
  {
    "category": "楽曲",
    "title": "練習曲第1番「福音」ニ短調 (第1稿)",
    "desc": "中学生の頃に初めて作った曲。",
    "tags": [
      "練習曲",
      "福音",
      "第1稿",
      "短調"
    ],
    "date": null,
    "usedTools": [
      "Noteflight"
    ],
    "license": "©2021 Rinrin All rights reserved",
    "thumbnailImg": "etude_1i.webp",
    "id": "etude_1i"
  }
]
```

## Artwork Categories - `GET /api/artworks/categories`

Returns a list of categories of artworks.

### Response Body

`ItemWithCount[]` ([`/src/lib/btpc/scripts/types.ts`](/src/lib/btpc/scripts/types.ts))

- `[]` (`object[]`) - The list of categories.
	- `item` (`string`) - The category name.
	- `count` (`number`) - The number of artworks that have the category.

#### Example

```json
[
  {
    "item": "イラスト",
    "count": 9
  },
  {
    "item": "楽曲",
    "count": 2
  }
]
```

## Artwork Tags - `GET /api/artworks/tags`

Returns a list of tags of artworks.

### Response Body

`ItemWithCount[]` ([`/src/lib/btpc/scripts/types.ts`](/src/lib/btpc/scripts/types.ts))

- `[]` (`object[]`) - The list of tags.
	- `item` (`string`) - The tag name.
	- `count` (`number`) - The number of artworks that have the tag.

#### Example

```json
[
  {
    "item": "16px",
    "count": 6
  },
  {
    "item": "ドット絵",
    "count": 6
  },
  {
    "item": "練習曲",
    "count": 2
  }
]
```

## Artwork Licenses - `GET /api/artworks/licenses`

Returns a list of licenses of artworks.

### Response Body

`ItemWithCount[]` ([`/src/lib/btpc/scripts/types.ts`](/src/lib/btpc/scripts/types.ts))

- `[]` (`object[]`) - The list of licenses.
	- `item` (`string`) - The license name.
	- `count` (`number`) - The number of artworks that have the license.

#### Example

```json
[
  {
    "item": "CC BY-SA 4.0",
    "count": 6
  },
  {
	  "item": "CC BY 4.0",
	  "count": 1
  }
]
```

## Projects

Returns a list of projects.

### Query Parameters

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| `t` | `string[]?` | Filter projects by tags. Example: `t=tag1,tag2` | - |
| `langs` | `string[]?` | Filter projects by programming languages. Example: `langs=lang1,lang2` | - |
| `license` | `string?` | Filter projects by license. | - |
| `status` | `string?` | Filter projects by status. | - |

### Response Body

`ProjectMetadata[]` ([`/src/lib/btpc/scripts/types.ts`](/src/lib/btpc/scripts/types.ts))

- `[]` (`object[]`) - The list of projects.
  - `title` (`string`) - The title of the project.
  - `desc` (`string | null`) - The description of the project.
  - `tags` (`string[]`) - The list of tags of the project.
  - `langs` (`string[]`) - The list of programming languages used in the project.
  - `repo` (`string | null`) - The repository URL of the project.
  - `website` (`string | null`) - The website URL of the project.
  - `status` (`string`) - The status of the project.
  - `date` (`string | null`) - The last updated date of the project.
  - `initDate` (`string | null`) - The initial release date of the project.
  - `license` (`string | null`) - The license of the project.
  - `thumbnailImg` (`string | null`) - The thumbnail image path of the project.
  - `id` (`string?`) - The ID of the project. Its type is an optional string but it always exists.

#### Example

```json
[
  {
    "title": "ホームページ (website)",
    "desc": "Rinrin.rsのホームページ。",
    "tags": [
      "ウェブサイト",
      "SvelteKit"
    ],
    "langs": [
      "Svelte",
      "TypeScript",
      "SCSS"
    ],
    "repo": "https://github.com/Rinrin0413/rinrin0413.github.io",
    "website": "https://rinrin.pages.dev",
    "status": "active",
    "date": "2025-04-25T00:00:00.000Z",
    "initDate": "2021-06-26T00:00:00.000Z",
    "license": "GPL-3.0",
    "thumbnailImg": "website.webp",
    "id": "website"
  },
  {
    "title": "tetr-ch-rs",
    "desc": "TETRA CHANNEL APIのためのRustラッパーライブラリ。",
    "tags": [
      "ライブラリ",
      "ラッパー",
      "TETR.IO"
    ],
    "langs": [
      "Rust"
    ],
    "repo": "https://github.com/Rinrin0413/tetr-ch-rs",
    "website": "https://docs.rs/tetr_ch",
    "status": "completed",
    "date": "2024-12-26T00:00:00.000Z",
    "initDate": "2022-08-23T00:00:00.000Z",
    "license": "MIT",
    "thumbnailImg": null,
    "id": "tetr-ch-rs"
  },
  {
    "title": "Tempest Shaders for BE",
    "desc": "Rinrinの狂気から生まれた、マインクラフト統合版向けのシェーダーパック。",
    "tags": [
      "シェーダーパック",
      "マインクラフト統合版",
      "グラフィックス"
    ],
    "langs": [
      "HLSL"
    ],
    "repo": "https://github.com/Rinrin0413/Tempest-Shaders",
    "website": null,
    "status": "archived",
    "date": "2022-03-12T00:00:00.000Z",
    "initDate": "2022-01-06T00:00:00.000Z",
    "license": "CC BY 4.0",
    "thumbnailImg": "tempest-shaders_be.png",
    "id": "Tempest-Shaders_BE"
  }
]
```

## Project Tags - `GET /api/projects/tags`

Returns a list of tags of projects.

### Response Body

`ItemWithCount[]` ([`/src/lib/btpc/scripts/types.ts`](/src/lib/btpc/scripts/types.ts))

- `[]` (`object[]`) - The list of tags.
  - `item` (`string`) - The tag name.
  - `count` (`number`) - The number of projects that have the tag.

#### Example

```json
[
  {
    "item": "シェーダーパック",
    "count": 3
  },
  {
    "item": "ライブラリ",
    "count": 3
  },
  {
    "item": "マインクラフト統合版",
    "count": 2
  },
  {
    "item": "怪レい日本语",
    "count": 2
  },
  {
    "item": "Discordアプリ",
    "count": 1
  }
]
```

## Project Languages - `GET /api/projects/langs`

Returns a list of programming languages of projects.

### Response Body

`ItemWithCount[]` ([`/src/lib/btpc/scripts/types.ts`](/src/lib/btpc/scripts/types.ts))

- `[]` (`object[]`) - The list of programming languages.
  - `item` (`string`) - The programming language name.
  - `count` (`number`) - The number of projects that use the programming language.

#### Example

```json
[
  {
    "item": "Rust",
    "count": 5
  },
  {
    "item": "HLSL",
    "count": 2
  },
  {
    "item": "Svelte",
    "count": 1
  },
  {
    "item": "TypeScript",
    "count": 1
  }
]
```

## Project Licenses - `GET /api/projects/licenses`

Returns a list of licenses of projects.

### Response Body

`ItemWithCount[]` ([`/src/lib/btpc/scripts/types.ts`](/src/lib/btpc/scripts/types.ts))

- `[]` (`object[]`) - The list of licenses.
  - `item` (`string`) - The license name.
  - `count` (`number`) - The number of projects that have the license.

#### Example

```json
[
  {
    "item": "MIT",
    "count": 4
  },
  {
    "item": "CC BY 4.0",
    "count": 3
  },
  {
    "item": "GPL-3.0",
    "count": 3
  }
]
```

## Project Statuses - `GET /api/projects/statuses`

Returns a list of statuses of projects.

### Response Body

`ItemWithCount[]` ([`/src/lib/btpc/scripts/types.ts`](/src/lib/btpc/scripts/types.ts))

### Example

```json
[
  {
    "item": "active",
    "count": 4
  },
  {
    "item": "wip",
    "count": 2
  },
  {
    "item": "archived",
    "count": 2
  },
  {
    "item": "completed",
    "count": 2
  }
]
```

---

</div>
</details>
