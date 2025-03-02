/** Return the tags from the URL */
export function getTags(url: URL) {
	return url.searchParams.get('t')?.split(',') ?? [];
}

/** Add nine hours to the date */
export function add9h(date: Date): Date {
	const newDate = new Date(date);
	newDate.setHours(newDate.getHours() + 9);
	return newDate;
}
