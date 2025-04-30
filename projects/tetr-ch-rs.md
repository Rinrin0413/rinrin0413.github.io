---
title: tetr-ch-rs
desc: TETRA CHANNEL APIのためのRustラッパーライブラリ。
tags: [ライブラリ, ラッパー, TETR.IO]
langs: [Rust]
repo: https://github.com/Rinrin0413/tetr-ch-rs
website: https://docs.rs/tetr_ch
status: completed
date: 2024-12-26
initDate: 2022-08-23
license: MIT
thumbnailImg: null
---

![ ](https://img.shields.io/github/v/release/Rinrin0413/tetr-ch-rs?label=%E6%9C%80%E6%96%B0%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3&style=flat-square)

[TETRA CHANNEL API](https://tetr.io/about/api) のための Rust ラッパーライブラリです。

このライブラリを使用して以下のようなデータを取得することができます:

- 詳細なユーザー情報 (information)
- ユーザーの概要 (summaries)
	- 40 LINES
	- BLITZ
	- QUICK PLAY
	- EXPERT QUICK PLAY
	- TETRA LEAGUE
	- ZEN
	- 実績 (achievements)
- ユーザーのリーダーボード
- ユーザーの記録 (records)
- 記録のリーダーボード
- 各ランクのメタデータ
- 等...

また、以下のようなこともできます:

- ソーシャルコネクションを利用して TETR.IO アカウントを検索する。
- ユーザー ID とタイムスタンプで記録を検索する。

## 注意事項

本ライブラリは公式によって公式に提供されているラッパーではありません。

また、TETR.IO は現在開発中のプロジェクトであるため、TETRA CHANNEL API は予告なしに仕様が変更される可能性があります。
したがって、将来的にこのラッパーが古くなる可能性があります。

<details>
<summary>本ライブラリを使用する前に、TETRA CHANNEL API の規則をお読みください (英語原文) :</summary>
<div>

<br />

> Usage of the TETRA CHANNEL API does not require an account or bot account.
> Please do note that requests are logged. Some simple rules:
>
> - **Do not flood the API with requests.** This should be obvious, but just to be sure.
>   Please keep the amount of requests at a moderate rate - once a second should be fine for most cases, short bursts are OK.
>   Please consider other users!
> - **Honor caching data.** If a response indicates its cache will expire after 10 minutes,
>   please do not rerequest the data during that time, as the data should not change in that time,
>   assuming you are sending an `X-Session-ID` header.
> - **Send an `X-Session-ID` header** if you are often rerequesting the same datasets.
>   This not only assures the data you receive is consistent, it also helps reduce database calls on our side.
> - **Don't use a `X-Session-ID` header for requests that are not related.** That way, load balancing can function as expected.
> - **Do not use the API in ways that break the TETR.IO [Terms of Service](https://tetr.io/about/terms/).** Should be obvious.
>
> ― https://tetr.io/about/api

</div>
</details>

## インストール

プロジェクトのディレクトリで次の Cargo コマンドを実行してください:

```bash
cargo add tetr_ch
```

## 使用例

以下のコードは、ユーザーの詳細を取得するテンプレートです。

```rust
use tetr_ch::prelude::*;

#[tokio::main]
async fn main() {
    // 新しいクライアントを作成。
    let client = Client::new();

    // 情報を取得するユーザーのユーザー名またはユーザー ID を指定。
    let user = "rinrin-rs";

    // データを取得。
    let response = match client.get_user(user).await {
        Ok(res) => res,
        Err(err) => panic!("レスポンスエラー: {}\n", err),
    };

    // エラーがないかを確認。
	// 指定したユーザーが存在しない場合、ここでエラー "No such user!" が返されます。
    if let Some(err) = response.error {
        panic!("エラー: {}\n", err.msg.expect("エラーメッセージがありません。"));
    }

    let data = response.data.unwrap();
    println!("ユーザー名: {}", data.username);
    println!("ID: {}", data.id);
    println!("経験値: {}", data.xp);
    println!("レベル: {}", data.level());
    println!("アバターURL: {}", data.avatar_url());
}
```

他の使用例はリポジトリの [`examples`](https://github.com/Rinrin0413/tetr-ch-rs/blob/master/examples) にあります。

また、本ライブラリのその他詳細については[ドキュメンテーション](https://docs.rs/tetr_ch)を参照してください。
