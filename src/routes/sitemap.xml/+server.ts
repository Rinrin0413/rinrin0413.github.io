import type { RequestHandler } from './$types';
import { fetchArticles, fetchTools, fetchArtworks } from '$lib/btpc/scripts/fetchers';
import { SITE_URL } from '$lib/scripts/variables';

export const prerender = true;

export const GET: RequestHandler = async ({ setHeaders }) => {
	setHeaders({
		'Cache-Control': 'max-age=0, s-maxage=86400',
		'Content-Type': 'application/xml; charset=utf-8'
	});
	return new Response(await body());
};

async function body() {
	const articles = (await fetchArticles({ isOnlyIndexed: true }))
		.map(
			(article) => `<url>
        <loc>${SITE_URL}/blog/articles/${article.slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`
		)
		.join('\n    ');
	const tools = (await fetchTools())
		.map(
			(tool) => `<url>
        <loc>${SITE_URL}/tools/${tool.id}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`
		)
		.join('\n    ');
	const artworks = (await fetchArtworks())
		.map(
			(artwork) => `<url>
        <loc>${SITE_URL}/creations/works/${artwork.id}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`
		)
		.join('\n    ');

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${SITE_URL}</loc>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${SITE_URL}/profile</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>${SITE_URL}/blog</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
	${articles}
    <url>
        <loc>${SITE_URL}/tools</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    ${tools}
    <url>
        <loc>${SITE_URL}/projects</loc>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
    </url>
    <url>
        <loc>${SITE_URL}/creations</loc>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
    ${artworks}
    <url>
        <loc>${SITE_URL}/social</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${SITE_URL}/acknowledgments</loc>
        <changefreq>monthly</changefreq>
        <priority>0.4</priority>
    </url>
    <url>
        <loc>${SITE_URL}/privacy</loc>
        <changefreq>yearly</changefreq>
        <priority>0.2</priority>
    </url>
</urlset>`;
}
