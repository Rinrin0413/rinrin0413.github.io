# Specifications

<details>
<summary>Z-Index</summary>
<div>

| Z-Index | Entity |
| --: | --- |
| 129 | header logo (`header.scss/#header-logo`) |
| 128 | header title (`header.scss/#header-logo::after`) |
| 127 | header bg (`header.scss/#header-bg`) |
| 126 | drawer menu bg (`header.scss/#drawer-menu-bg`) |
| 42 | sharing dropdown menu (`share-button.scss/ul.menu`) |
| -1 | fixed bg (`global.css/html::before`) |

</div>
</details>

<details>
<summary>CSS Variables</summary>
<div>

| Name | Description | Usable area |
| --: | --- | --- |
| `--max-vh001` | viewport max height ever * 0.01 (realtime update) | all |

</div>
</details>

<details>
<summary>Font weights</summary>
<div>

**Use the Sass mixin `bold` to make the text bold.**

## `'Kiwi Maru'`

<!-- - Light: `300`
- Regular: `400` -->
- Medium: `500`

**Do not use**: `100`, `200`, `300`, `400`, `600`, `700`, `800`, `900`, `normal`, `bold`, `lighter`, `bolder`

## `'Source Code Pro'`

<!-- - ExtraLight: `200`
- Light: `300`
- Regular: `400` -->
- Medium: `500`
<!-- - SemiBold: `600`
- Bold: `700`
- ExtraBold: `800`
- Black: `900` -->

**Do not use**: `100`, `200`, `300`, `400`, `600`, `700`, `800`, `900`, `normal`, `bold`, `lighter`, `bolder`

</div>
</details>
