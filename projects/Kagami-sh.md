---
title: Kagami.sh
desc: 私のマシンで動作する私のバックアップツール。
tags: [ツール]
langs: [Shell]
repo: https://github.com/Rinrin0413/Kagami-sh
website: null
status: completed
date: 2025-12-09
initDate: 2025-12-05
license: MIT
thumbnailImg: null
---

🪞 My backup tool that works on my machine. 🪞  
（訳: 私のマシンで動作する私のバックアップツール）

**Kagami.sh** は Linux 向けのバックアップスクリプトです。
[rsync](https://github.com/RsyncProject/rsync) を使用して、指定したディレクトリのミラーを作成します。

## 機能

- **増分ミラーリング**: rsync で効率的に同期
- **簡単設定**: 設定や対象リスト、除外リストはシンプルなテキストファイルで管理
- **安全設計**: システムディレクトリ（`/` や `/usr` など）への誤った上書きを防止するフールプルーフ
- **Dry Run**: 実際の実行の前に変更内容をプレビューする Dry Run 機能
- **ログ機能**: 実行ごとのログをバックアップ先のフォルダーに記録
- **古い対象の保持**: バックアップ対象リストから削除されたものは、即座に削除されるのではなくバックアップ先のゴミ箱フォルダー `.kagami-trash/` へ移動

## 使い方

### 前提要件

- Linux 環境
- Bash
- [rsync](https://github.com/RsyncProject/rsync)
- 標準的な汎用コマンド: `tput`, `realpath`, `find`, `grep`
- Git（GitHub からクローンする場合）

### インストール

1. リポジトリをクローンし、`release` ブランチに切り替える。
   ```bash
   git clone https://github.com/Rinrin0413/Kagami-sh.git
   cd Kagami-sh
   git switch release
   ```

2. スクリプトに実行権限を付与する。
   ```bash
   chmod +x kagami.sh
   ```

### 設定

本スクリプトは、同じディレクトリ内にある3つの設定ファイルを使用します:

1. **`kagami.conf`**（必須）  
   バックアップ先のパスとゴミ箱の保持期間を設定。
   ```bash
   DEST="/run/media/USER/FOO-DRIVE/kagami-backups/"
   TRASH_RETENTION_DAYS=30
   ```

2. **`targets.conf`**（必須）  
   バックアップするファイルやディレクトリのリスト。（1行に1つずつ）
   ```bash
   /etc
   ~/Pictures
   ~/Videos/Screencasts
   ~/.bashrc
   ```

3. **`excludes.conf`**（任意）  
   除外するパターンのリスト。（`rsync --exclude-from` に渡される）  
   詳細については [rsync(1) マニュアル](https://linux.die.net/man/1/rsync) の "Include/Exclude Pattern Rules" セクションを参照。
   ```bash
   node_modules/
   .git/
   *.log
   /home/USER/Downloads/*.zip
   ```

## 使用方法

> 【注意事項】
> 
> 初回実行時は、バックアップ先ディレクトリの初期化について確認を求められます。
> 
> そのため、cron などの非対話形式のスクリプトで実行する予定がある場合は、
> あらかじめ一度手動（対話形式）で実行して初期化を済ませておいてください。

### Dry Run

ファイルを変更せずに、何が変更されるかを確認します。

```bash
./kagami.sh dry
```

> 【注意事項】
> 
> ドライランでは `.kagami-logs/` ディレクトリにログが記録されません。

### バックアップの実行

```bash
./kagami.sh

```

## バックアップ先のディレクトリ構造

バックアップ先ディレクトリには次のファイルやディレクトリが作成されます:

- **`path/to/source`**: ミラーリングされたファイル（例: `home/USER/Pictures`）。
- **`.kagami-manifest`**: バックアップ対象を追跡するための内部ファイル。
- **`.kagami-logs/`**: 各実行時の出力ログ。
- **`.kagami-trash/`**: `targets.conf` から削除された項目のデータを一時的に保存するゴミ箱。
  これらは `TRASH_RETENTION_DAYS` 期間後の実行時に自動的に削除されます。

```
/path/to/backup-destination/
├── .kagami-logs/
│   └── 20250413_080000_1234.log
├── .kagami-manifest
├── .kagami-trash/
│   └── 20250413_080000_1234/
├── etc/                      ┓
└── home/                     ┃
    └── USER/                 ┃
        ├── .bashrc           ┠ ミラーリングされたファイル
        ├── Pictures/         ┃
        └── Videos/           ┃
            └── Screencasts/  ┛
```

`.kagami-logs/` および `.kagami-trash/` ディレクトリの内容は、不要であれば手動で削除しても問題ありません。

## 重要な注意事項

- このスクリプトは**ミラー方式**のバックアップを行います。
  バックアップ元からファイルを削除した場合（かつそのファイルが有効なバックアップ対象である場合）、**バックアップ先からも削除されます**。
  要するに、過去の履歴（世代）を保持するものではないということです。
- ゴミ箱機能は、`targets.conf` から行を削除した際のみデータを保護します。
  有効なバックアップ対象内での誤操作等によるファイル削除については保護されません。
- Kagami.sh の開発者は、本バックアップツールの使用によって生じたいかなるデータの損失や損害について、一切の責任を負いません。
