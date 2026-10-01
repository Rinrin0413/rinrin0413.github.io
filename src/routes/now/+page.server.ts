import MarkdownIt from 'markdown-it';
import type { PageServerLoad } from './$types';
import { GIST_ID_FOR_NOW_PAGE, GIST_API_URL_FOR_NOW_PAGE } from '$lib/scripts/variables';

interface Gist {
	updated_at: string;
	files: Record<string, { content?: string; truncated?: boolean }>;
}

interface NowContent {
	html: string;
	updatedAt: string;
}

const markdown = new MarkdownIt({ html: false }).disable('image');

// Ignore HTML comments without enabling raw HTML or changing code examples.
markdown.block.ruler.before(
	'html_block',
	'html_comment',
	(state, startLine, endLine, silent) => {
		if (state.sCount[startLine] - state.blkIndent >= 4) return false;
		const start = state.bMarks[startLine] + state.tShift[startLine];
		if (state.src.startsWith('<!--', start) === false) return false;
		const end = state.src.indexOf('-->', start + 4);
		if (end === -1) return false;
		let nextLine = startLine;
		while (nextLine < endLine && state.eMarks[nextLine] < end + 3) nextLine++;
		if (nextLine === endLine) return false;
		if (state.src.slice(end + 3, state.eMarks[nextLine]).trim() !== '') return false;
		if (silent === false) state.line = nextLine + 1;
		return true;
	},
	{ alt: ['paragraph', 'reference', 'blockquote'] }
);
markdown.inline.ruler.before('html_inline', 'html_comment', (state) => {
	if (state.src.startsWith('<!--', state.pos) === false) return false;
	const end = state.src.indexOf('-->', state.pos + 4);
	if (end === -1) return false;
	state.pos = end + 3;
	return true;
});

// 1000 * 60 * 5 = 300000 = 5 minutes
const CACHE_MS = 300000;
let cache: { id: string; expiresAt: number; content: NowContent } | undefined;

export const load: PageServerLoad = async ({ fetch }) => {
	if (cache !== undefined && cache.id === GIST_ID_FOR_NOW_PAGE && Date.now() < cache.expiresAt) {
		return { now: cache.content };
	}

	try {
		const response = await fetch(GIST_API_URL_FOR_NOW_PAGE, {
			headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'Rinrin.rs' },
			signal: AbortSignal.timeout(5000)
		});
		if (response.ok === false) throw new Error(`Gist request failed: ${response.status}`);

		const gist: Gist = await response.json();
		const file = gist.files['now.md'];
		if (typeof file?.content !== 'string' || file.truncated === true) {
			throw new Error('The Gist must contain a complete now.md file.');
		}

		const content: NowContent = {
			html: markdown.render(file.content),
			updatedAt: new Date(gist.updated_at).toISOString()
		};
		cache = { id: GIST_ID_FOR_NOW_PAGE, expiresAt: Date.now() + CACHE_MS, content };
		return { now: content };
	} catch (error) {
		console.error('Failed to load the /now Gist:', error);
		return { now: cache !== undefined && cache.id === GIST_ID_FOR_NOW_PAGE ? cache.content : null };
	}
};
