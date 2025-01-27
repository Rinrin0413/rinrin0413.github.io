import fs from 'fs';
import path from 'path';

const articlesDir = path.join(process.cwd(), 'articles');

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const date = `${year}${month}${day}`;

let i = 1;
while (
	fs.existsSync(path.join(articlesDir, date + (1 < i ? String(i).padStart(2, '0') : '') + '.md'))
)
	i++;
const fileName = date + (1 < i ? String(i).padStart(2, '0') : '') + '.md';

const filePath = path.join(articlesDir, fileName);

const INIT_CONTENT = `---
published: true
indexed: true
title: ここにタイトル
desc: ここに説明文
tags: [タグ, tag]
---

ここに本文

日付を変えたかったら[記事のファイル名のルール(ファイル)](/docs/blog.md#記事のファイル名のルール)に従った上でファイル名を変更する

画像を新しくアップロードする場合は [/static/images/blog/](/static/images/blog/) に配置する

その他の詳細についてはドキュメントやテスト記事参照:

## ドキュメント

- [blog.md](/docs/blog.md)

## テスト記事

- Markdownファイル: [/articles/20230917_test.md](/articles/20230917_test.md)
- ページ: [/blog/articles/20230917_test](http://localhost:5173/blog/articles/20230917_test) (vite devサーバー起動中のみ)
`;

fs.writeFileSync(filePath, INIT_CONTENT);

console.log('Created: ' + filePath);
