---
title: cjp.rs
desc: 贵樣ばこゐRustﾗ亻㇇゛ﾗ刂て怪レい日本语に変換ずゑことが出來ゑ.
tags: [ライブラリ, 怪レい日本语]
langs: [Rust]
repo: https://github.com/Rinrin0413/cjp-rs
website: https://docs.rs/cjp
status: active
date: 2024-05-03
initDate: 2022-09-20
license: MIT
thumbnailImg: null
---

![ ](https://img.shields.io/github/v/release/Rinrin0413/cjp-rs?label=%E6%9C%80%E6%96%B0%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3&style=flat-square)

## ⚠ Important Caution - 注意事項 ⚠

<details>
<summary>詳細</summary>
<div>

### 日本語:

怪レい日本语（あやしいにほんご）とは、誤訳などによって通常の日本語から大きく逸脱したもの。または意図的にそのように改変した日本語。実用性は皆無であるが、怪レい日本语に含まれるユーモアからしか得られない栄養もある(ありません)。

### For non-native speakers of Japanese:

"怪レい日本語" (Ayashī Nihongo) refers to Japanese language that deviates significantly from standard grammar and vocabulary, often due to mistranslations or other errors. In other words, **"怪レい日本語" is NOT correct Japanese language**, so those unfamiliar with Japanese language may greatly misunderstand its meaning if they attempt to read it.

</div>
</details>

---

贵樣ばこゐ Rust ﾗ亻㇇゛ﾗ刂て怪レい日本语に変換ずゑことが出來ゑ.

## インストール

プロジェクトのディレクトリで次の Cargo コマンドを実行してください:


```bash
cargo add cjp
```

## 使用例

`cjp::AsCjp` トレイトをインポートして、文字列に `.cjp()` メソッドを呼び出すことで、怪レい日本语に変換できます。

```rust
use cjp::AsCjp;

fn main() {
    let s = "貴方は怪しい日本語を使うことが出来る。".to_string();
    println!("{}", s.cjp()); //< 贵樣は怪レい日本语を使ラこと力゛出來ゑ ⸰ 

    let s = "優秀の人材はタピオカに投資して西川口に豪邸を建てる。";
    println!("{}", s.cjp()); //< 优秀の人材は夕匕才力に投资レて酉川口にごラていを建てゑ ⸰ 
}
```

詳しくは、[ドキュメンテーション](https://docs.rs/cjp)を参照してください。
