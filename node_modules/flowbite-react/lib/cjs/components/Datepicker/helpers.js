"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDateRangeInDecade = exports.isDateInDecade = exports.startOfYearPeriod = exports.getFormattedDate = exports.addYears = exports.addMonths = exports.addDays = exports.getWeekDays = exports.getFirstDayOfTheMonth = exports.getFirstDateInRange = exports.isDateEqual = exports.isDateInRange = exports.WeekStart = exports.Views = void 0;
var Views;
(function (Views) {
    Views[Views["Days"] = 0] = "Days";
    Views[Views["Months"] = 1] = "Months";
    Views[Views["Years"] = 2] = "Years";
    Views[Views["Decades"] = 3] = "Decades";
})(Views || (exports.Views = Views = {}));
var WeekStart;
(function (WeekStart) {
    WeekStart[WeekStart["Sunday"] = 0] = "Sunday";
    WeekStart[WeekStart["Monday"] = 1] = "Monday";
    WeekStart[WeekStart["Tuesday"] = 2] = "Tuesday";
    WeekStart[WeekStart["Wednesday"] = 3] = "Wednesday";
    WeekStart[WeekStart["Thursday"] = 4] = "Thursday";
    WeekStart[WeekStart["Friday"] = 5] = "Friday";
    WeekStart[WeekStart["Saturday"] = 6] = "Saturday";
})(WeekStart || (exports.WeekStart = WeekStart = {}));
const isDateInRange = (date, minDate, maxDate) => {
    const dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    if (minDate && maxDate) {
        const minDateTime = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()).getTime();
        const maxDateTime = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()).getTime();
        return dateTime >= minDateTime && dateTime <= maxDateTime;
    }
    if (minDate) {
        const minDateTime = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()).getTime();
        return dateTime >= minDateTime;
    }
    if (maxDate) {
        const maxDateTime = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()).getTime();
        return dateTime <= maxDateTime;
    }
    return true;
};
exports.isDateInRange = isDateInRange;
const isDateEqual = (date, selectedDate) => {
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    return date.getTime() === selectedDate.getTime();
};
exports.isDateEqual = isDateEqual;
const getFirstDateInRange = (date, minDate, maxDate) => {
    if (!(0, exports.isDateInRange)(date, minDate, maxDate)) {
        if (minDate && date < minDate) {
            date = minDate;
        }
        else if (maxDate && date > maxDate) {
            date = maxDate;
        }
    }
    return date;
};
exports.getFirstDateInRange = getFirstDateInRange;
const getFirstDayOfTheMonth = (date, weekStart) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    let diff = dayOfWeek - weekStart;
    if (diff < 0) {
        diff += 7;
    }
    return (0, exports.addDays)(firstDayOfMonth, -diff);
};
exports.getFirstDayOfTheMonth = getFirstDayOfTheMonth;
const getWeekDays = (lang, weekStart) => {
    const weekdays = [];
    const date = new Date(0);
    date.setDate(date.getDate() - date.getDay() + weekStart);
    const formatter = new Intl.DateTimeFormat(lang, { weekday: 'short' });
    for (let i = 0; i < 7; i++) {
        weekdays.push(formatter.format((0, exports.addDays)(date, i)));
    }
    return weekdays;
};
exports.getWeekDays = getWeekDays;
const addDays = (date, amount) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + amount);
    return newDate;
};
exports.addDays = addDays;
const addMonths = (date, amount) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + amount);
    return newDate;
};
exports.addMonths = addMonths;
const addYears = (date, amount) => {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + amount);
    return newDate;
};
exports.addYears = addYears;
const getFormattedDate = (language, date, options) => {
    let defaultOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
    if (options) {
        defaultOptions = options;
    }
    return new Intl.DateTimeFormat(language, defaultOptions).format(date);
};
exports.getFormattedDate = getFormattedDate;
const startOfYearPeriod = (date, years) => {
    const year = date.getFullYear();
    return Math.floor(year / years) * years;
};
exports.startOfYearPeriod = startOfYearPeriod;
const isDateInDecade = (date, startYear) => {
    const year = date.getFullYear();
    const endYear = startYear + 9;
    return year >= startYear && year <= endYear;
};
exports.isDateInDecade = isDateInDecade;
const isDateRangeInDecade = (startDate, endDate, decadeStart, decadeEnd) => {
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    if (decadeStart && decadeEnd) {
        // Check if the start and end years of the date range are within the decade
        const isStartYearInRange = (0, exports.isDateInRange)(new Date(startYear, 0, 1), new Date(decadeStart, 0, 1), new Date(decadeEnd, 11, 31));
        const isEndYearInRange = (0, exports.isDateInRange)(new Date(endYear, 11, 31), new Date(decadeStart, 0, 1), new Date(decadeEnd, 11, 31));
        return isStartYearInRange && isEndYearInRange;
    }
    // If decadeStart or decadeEnd is not provided, treat it as an open-ended range
    return true;
};
exports.isDateRangeInDecade = isDateRangeInDecade;
