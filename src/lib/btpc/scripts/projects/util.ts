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
