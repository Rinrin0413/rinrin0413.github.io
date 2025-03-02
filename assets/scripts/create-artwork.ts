import fs from 'fs';
import path from 'path';

const artworksDir = path.join(process.cwd(), 'artworks');

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const date = `${year}${month}${day}`;

let i = 1;
while (
	fs.existsSync(path.join(artworksDir, date + (1 < i ? String(i).padStart(2, '0') : '') + '.md'))
)
	i++;
const fileName = date + (1 < i ? String(i).padStart(2, '0') : '') + '.md';

const filePath = path.join(artworksDir, fileName);

const INIT_CONTENT = `---
category: ここにカテゴリ
title: ここにタイトル
desc: ここに説明文(任意)
tags: [タグ, Tag, tag]
date: ${year}-${month}-${day}
usedTools: [使用したツール, Tool, tool]
license: ここにライセンス(任意)
thumbnailImg: ここにサムネイル画像のファイル名(任意)
---

ここに本文

サムネイル画像は [/static/images/creations/thumbnails/](/static/images/creations/thumbnails/) に配置する。
画像を新しくアップロードする場合は [/static/images/creations/](/static/images/creations/) に配置する。
`;

fs.writeFileSync(filePath, INIT_CONTENT);

console.log('Created: ' + filePath);
