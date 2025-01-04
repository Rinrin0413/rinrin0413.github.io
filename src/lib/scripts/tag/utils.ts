/** Return the tags from the URL */
export function getTags(url: URL) {
	return url.searchParams.get('t')?.split(',') ?? [];
}
