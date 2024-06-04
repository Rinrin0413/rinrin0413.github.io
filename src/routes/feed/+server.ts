import type { RequestHandler } from './$types';
import { fetchArticles, fetchTags } from '$lib/scripts/fetchers';
import { SITE_URL, COPYRIGHT, BLOG_NAME, CONTACT_EMAIL_ADDRESS } from '$lib/scripts/variables';
import { v5 as uuidv5 } from 'uuid';
import { idToDate } from '$lib/scripts/util';

export const prerender = true;

export const GET: RequestHandler = async ({ setHeaders }) => {
	setHeaders({
		'Cache-Control': 'max-age=0, s-maxage=86400',
		'Content-Type': 'application/atom+xml; charset=utf-8'
	});
	return new Response(await body());
};

async function body() {
	const FEED_UUID = 'abe93c08-c6e2-2d92-a181-9a1c2816fb3d';

	const categories = renderCategories(
		(await fetchTags()).map((t) => t.tag),
		4
	);

	let prevDate: {
		date: Date;
		index: number;
	};
	const articles = (await fetchArticles({ isOnlyIndexed: true }))
		.reverse()
		.map((article) => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const slug = article.slug!;

			let date = idToDate(slug);
			const isFirstArticleOfTheDay =
				// current article IS FIRST OF ALL
				prevDate === undefined ||
				// OR previous article date AND current article date ARE NOT EQUAL
				// ＊ Hour, Minute, Second, Millisecond are guaranteed to be 0
				!(
					prevDate.date.getFullYear() === date.getFullYear() &&
					prevDate.date.getMonth() === date.getMonth() &&
					prevDate.date.getDate() === date.getDate()
				);
			if (isFirstArticleOfTheDay) {
				prevDate = { date, index: 0 };
			} else {
				prevDate.index++;
				prevDate.date.setSeconds(prevDate.index);
				date = prevDate.date;
			}
			return `<entry>
        <id>urn:uuid:${uuidv5(slug, FEED_UUID)}</id>
        <title>${article.title}</title>
        <updated>${date.toISOString()}</updated>
        <link rel="alternate" href="${SITE_URL}/blog/articles/${article.slug}" />
        <summary>${article.desc}</summary>${renderCategories(article.tags ?? [], 8)}
    </entry>`;
		})
		.join('\n    ');

	return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="ja">
    <id>urn:uuid:${FEED_UUID}</id>
    <title>${BLOG_NAME}</title>
    <updated>${new Date().toISOString()}</updated>
    <author>
        <name>Rinrin.rs</name>
        <email>${CONTACT_EMAIL_ADDRESS}</email>
        <uri>${SITE_URL}</uri>
    </author>
    <link rel="self" href="${SITE_URL}/feed" />
    <link rel="alternate" href="${SITE_URL}" />${categories}
    <icon>${SITE_URL}/favicon.ico</icon>
    <rights>${COPYRIGHT}</rights>
    ${articles}
</feed>
`;
}

function renderCategories(tags: string[], indent = 0) {
	return tags
		.map((t) => {
			const tag = t.toUpperCase();
			const url = `${SITE_URL}/blog?t=${encodeURIComponent(tag)}`;
			return `\n${' '.repeat(indent)}<category term="${tag}" scheme="${url}" />`;
		})
		.join('');
}
