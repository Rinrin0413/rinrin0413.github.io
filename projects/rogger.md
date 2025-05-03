---
title: Rogger
desc: ログ出力のためのRinrin.rs用Rustライブラリ。
tags: [ライブラリ]
langs: [Rust]
repo: https://github.com/Rinrin0413/rogger
website: https://docs.rs/rogger
status: completed
date: 2022-12-24
initDate: 2022-12-18
license: MIT
thumbnailImg: rogger.webp
---

![ ](https://img.shields.io/github/v/release/Rinrin0413/rogger?label=%E6%9C%80%E6%96%B0%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3&style=flat-square)

非常に簡単にログを出力できる、Rinrin.rs 用の Rust ライブラリです。

このライブラリは、Rinrin.rs 向けに極度に最適化されているため、その他のプロジェクトでの使用を推奨しません。

## インストール

`Cargo.toml` に以下を追加してください:

```toml
[dependencies]
rogger = "*"
chrono = "0.4"
colored = "2"
```

各依存関係のバージョンは上記の通りを推奨します。

## 使い方

```rust
use rogger::*;
use colored::Colorize;

fn main() {
    let ver = "0.1.0";
    info!("Version: {}", ver);

    let dev = "Foo PC";
    warn!("Your device \"{}\" is deprecated", dev);

    let err = "Operating System is not found";
    error!("Fatal: {}", err);

    let buf = 0x12345678;
    debug!("Buffer: 0x{:x}", buf);

    let age = 17;
    trace!("Age: {}", age);

    flag!();
    flag!("i wake up!");
}
```

## フィーチャ (Features)

- `jst`: タイムスタンプに JST（日本標準時）を使用します。
- `utc_jst`: `jst` モジュールに、追加のマクロを `*_jst!()` として提供します。
