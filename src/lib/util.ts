/** Calculates the age of Rinrin. */
export function calc_age() {
	const birthday = { year: 2006, month: 4, date: 13 };
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const date = today.getDate();
	let age = year - birthday.year;
	age -= month < birthday.month || (month == birthday.month && date < birthday.date) ? 1 : 0;
	return age;
}

/** Formats the given month number to a string. */
export function fmt_month(month: number) {
	const months = [
		'Jan.',
		'Feb.',
		'Mar.',
		'Apr.',
		'May',
		'Jun.',
		'Jul.',
		'Aug.',
		'Sep.',
		'Oct.',
		'Nov.',
		'Dec.'
	];
	return months[month - 1];
}
