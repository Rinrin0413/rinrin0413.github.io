import fs from 'fs';
import path from 'path';

const projectsDir = path.join(process.cwd(), 'projects');

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const date = `${year}${month}${day}`;

let i = 1;
while (
	fs.existsSync(path.join(projectsDir, date + (1 < i ? String(i).padStart(2, '0') : '') + '.md'))
)
	i++;
const fileName = date + (1 < i ? String(i).padStart(2, '0') : '') + '.md';

const filePath = path.join(projectsDir, fileName);

const INIT_CONTENT = `---
title: ここにタイトル
desc: ここに説明文(任意)
tags: [タグ, Tag, tag]
langs: [プログラム言語, Language, lang]
repo: ここにリポジトリのURL(任意)
website: ここにウェブサイトのURL(任意)
status: wip または active または completed または archived または abandoned
date: 最終更新日時
initDate: 初版日時
license: ここにライセンス(任意)
thumbnailImg: ここにサムネイル画像のファイル名(任意)
---

ここに本文

サムネイル画像は [/static/images/projects/thumbnails/](/static/images/projects/thumbnails/) に配置する。
画像を新しくアップロードする場合は [/static/images/projects/](/static/images/projects/) に配置する。
`;

fs.writeFileSync(filePath, INIT_CONTENT);

console.log('Created: ' + filePath);
