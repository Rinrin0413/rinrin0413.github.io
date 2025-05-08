import { goto } from '$app/navigation';

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

/**
 * Updates the URL query parameter based on the value change of a `<select>` element.
 *
 * - If the selected value is `'all'`, the specified parameter is removed from the URL.
 * - Otherwise, the parameter is set to the selected value.
 * - The page is then navigated to the updated URL without scrolling.
 */
export function updateParamOnElmValueChange(event: Event, paramName: string) {
	const params = new URLSearchParams(location.search);

	const value = (event.target as HTMLSelectElement).value;
	if (value === 'all') params.delete(paramName);
	else params.set(paramName, value);

	goto(`${location.pathname}?${params.toString()}`, { noScroll: true });
}
