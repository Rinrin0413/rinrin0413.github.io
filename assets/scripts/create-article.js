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

const initContent = `---
published: true
indexed: true
title: "ここにタイトル"
desc: "ここに説明文"
tags: ["タグ", "タグ"]
hasThumbnail: false
imgFmt: null
---

ここに本文

日付を変えたかったら[記事のファイル名のルール(ファイル)](/docs/blog.md#記事のファイル名のルール)に従った上でファイル名を変更する

その他の詳細についてはテスト記事参照:

- Markdownファイル: [/articles/20230917_test.md](/articles/20230917_test.md)
- ページ: [/blog/articles/20230917_test](http://127.0.0.1:5173/blog/articles/20230917_test) (vite devサーバー起動中のみ)
`;

fs.writeFileSync(filePath, initContent);

console.log('Created: ' + filePath);
