/**
 * Returns the emoji for a given project status string.
 * An empty string is returned if the status is not recognized.
 */
export function getStatusEmoji(status: string) {
	switch (status) {
		case 'wip':
			return '🚧';
		case 'active':
			return '⚡';
		case 'completed':
			return '✅';
		case 'archived':
			return '🏛️';
		case 'abandoned':
			return '🏚️';
		default:
			return '';
	}
}

/** Returns a Japanese string indicating how long ago the given date was. */
function calcHowLongAgo(date: Date) {
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const daysAgo = Math.floor(diff / 86400000) + 1;

	const yearsAgo = Math.floor(daysAgo / 365);
	if (0 < yearsAgo) return yearsAgo + '年前';

	const monthsAgo = Math.floor(daysAgo / 30.4375);
	if (0 < monthsAgo) return monthsAgo + 'ヶ月前';

	const weeksAgo = Math.floor(daysAgo / 7);
	if (0 < weeksAgo) {
		return weeksAgo + '週間前';
	} else if (0 < daysAgo) {
		return daysAgo + '日前';
	} else {
		return '今日';
	}
}

/** Formats the given date as a full date Japanese string. */
export function fmtToFullDate(date: Date) {
	return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 (${calcHowLongAgo(
		date
	)})`;
}

/**
 * Omits the given date based on the given project status,
 * returns as the Japanese string.
 */
export function omitDateByStatus(
	date: Date,
	status: 'wip' | 'active' | 'completed' | 'archived' | 'abandoned'
) {
	switch (status) {
		case 'wip':
		case 'active':
			return `${date.getFullYear()}年`;
		case 'completed':
			return `${date.getFullYear()}年${date.getMonth() + 1}月`;
		case 'archived':
		case 'abandoned':
			return fmtToFullDate(date);
	}
}
