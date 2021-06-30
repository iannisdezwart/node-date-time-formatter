export const getMinutes = (
	date: Date
) => date.getMinutes().toString().padStart(2, '0')

export const isSameYear = (
	date1: Date,
	date2: Date
) => date1.getFullYear() == date2.getFullYear()

export const isSameDate = (
	date1: Date,
	date2: Date
) => (
	isSameYear(date1, date2)
	&& date1.getMonth() == date2.getMonth()
	&& date1.getDate() == date2.getDate()
)

export const getYesterday = () => new Date(Date.now() - 1000 * 60 * 60 * 24)

export const isFromFuture = (
	date: Date
) => Date.now() < date.getTime()

export const isLessThenXDaysAgo = (
	date: Date,
	x: number
) => Date.now() - 1000 * 60 * 60 * 24 * x < date.getTime()

export const getDayName = (
	date: Date
) => [
	'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
][ date.getDay() ]

export const getMonthName = (
	date: Date
) => [
	'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
][ date.getMonth() ]

export const getMonthNameShort = (
	date: Date
) => [
	'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
][ date.getMonth() ]

export const getOrdinalDate = (
	date: Date
) => {
	const num = date.getDate()
	let ordinal = 'th'

	if (num == 1 || num == 21 || num == 31) {
		ordinal = 'st'
	} else if (num == 2 || num == 22) {
		ordinal = 'nd'
	} else if (num == 3 || num == 23) {
		ordinal = 'rd'
	}

	return num + ordinal
}
export const formatDate = (
	date: Date,
	includeTime = true
) => {
	if (isFromFuture(date)) {
		return `${ getMonthName(date) } ${ getOrdinalDate(date) }, ${ date.getFullYear() }`
	}

	if (isSameDate(date, new Date())) {
		if (includeTime) {
			return `Today at ${ date.getHours() }:${ getMinutes(date) }`
		} else {
			return 'Today'
		}
	}

	if (isSameDate(date, getYesterday())) {
		if (includeTime) {
			return `Yesterday at ${ date.getHours() }:${ getMinutes(date) }`
		} else {
			return 'Yesterday'
		}
	}

	if (isLessThenXDaysAgo(date, 7)) {
		if (includeTime) {
			return `${ getDayName(date) } at ${ date.getHours() }:${ getMinutes(date) }`
		} else {
			return getDayName(date)
		}
	}

	if (isSameYear(date, new Date())) {
		return `${ getMonthName(date) } ${ getOrdinalDate(date) }`
	}

	return `${ getMonthName(date) } ${ getOrdinalDate(date) }, ${ date.getFullYear() }`
}

export const formatDateShort = (
	date: Date
) => {
	if (isFromFuture(date)) {
		return `Future`
	}

	if (isSameDate(date, new Date())) {
		return 'Today'
	}

	if (isSameYear(date, new Date())) {
		return `${ date.getDate() } ${ getMonthNameShort(date) }`
	}

	return `${ getMonthNameShort(date) } ${ date.getFullYear() }`
}