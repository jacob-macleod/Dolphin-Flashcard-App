"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWeekend = exports.isCurrentDayOfWeek = exports.getDecadeLabel = exports.getCenturyLabel = exports.getValueRange = exports.getRange = exports.getEndPrevious2 = exports.getEndPrevious = exports.getEnd = exports.getBeginNext2 = exports.getBeginPrevious2 = exports.getBeginNext = exports.getBeginPrevious = exports.getBegin = exports.getWeekNumber = exports.getBeginOfWeek = exports.getBeginOfDecadeYear = exports.getBeginOfCenturyYear = exports.getDayOfWeek = void 0;
var date_utils_1 = require("@wojtekmaj/date-utils");
var const_js_1 = require("./const.js");
var dateFormatter_js_1 = require("./dateFormatter.js");
var SUNDAY = const_js_1.WEEKDAYS[0];
var FRIDAY = const_js_1.WEEKDAYS[5];
var SATURDAY = const_js_1.WEEKDAYS[6];
/* Simple getters - getting a property of a given point in time */
/**
 * Gets day of the week of a given date.
 * @param {Date} date Date.
 * @param {CalendarType} [calendarType="iso8601"] Calendar type.
 * @returns {number} Day of the week.
 */
function getDayOfWeek(date, calendarType) {
    if (calendarType === void 0) { calendarType = const_js_1.CALENDAR_TYPES.ISO_8601; }
    var weekday = date.getDay();
    switch (calendarType) {
        case const_js_1.CALENDAR_TYPES.ISO_8601:
            // Shifts days of the week so that Monday is 0, Sunday is 6
            return (weekday + 6) % 7;
        case const_js_1.CALENDAR_TYPES.ISLAMIC:
            return (weekday + 1) % 7;
        case const_js_1.CALENDAR_TYPES.HEBREW:
        case const_js_1.CALENDAR_TYPES.GREGORY:
            return weekday;
        default:
            throw new Error('Unsupported calendar type.');
    }
}
exports.getDayOfWeek = getDayOfWeek;
/**
 * Century
 */
/**
 * Gets the year of the beginning of a century of a given date.
 * @param {Date} date Date.
 * @returns {number} Year of the beginning of a century.
 */
function getBeginOfCenturyYear(date) {
    var beginOfCentury = (0, date_utils_1.getCenturyStart)(date);
    return (0, date_utils_1.getYear)(beginOfCentury);
}
exports.getBeginOfCenturyYear = getBeginOfCenturyYear;
/**
 * Decade
 */
/**
 * Gets the year of the beginning of a decade of a given date.
 * @param {Date} date Date.
 * @returns {number} Year of the beginning of a decade.
 */
function getBeginOfDecadeYear(date) {
    var beginOfDecade = (0, date_utils_1.getDecadeStart)(date);
    return (0, date_utils_1.getYear)(beginOfDecade);
}
exports.getBeginOfDecadeYear = getBeginOfDecadeYear;
/**
 * Week
 */
/**
 * Returns the beginning of a given week.
 *
 * @param {Date} date Date.
 * @param {CalendarType} [calendarType="iso8601"] Calendar type.
 * @returns {Date} Beginning of a given week.
 */
function getBeginOfWeek(date, calendarType) {
    if (calendarType === void 0) { calendarType = const_js_1.CALENDAR_TYPES.ISO_8601; }
    var year = (0, date_utils_1.getYear)(date);
    var monthIndex = (0, date_utils_1.getMonth)(date);
    var day = date.getDate() - getDayOfWeek(date, calendarType);
    return new Date(year, monthIndex, day);
}
exports.getBeginOfWeek = getBeginOfWeek;
/**
 * Gets week number according to ISO 8601 or US standard.
 * In ISO 8601, Arabic and Hebrew week 1 is the one with January 4.
 * In US calendar week 1 is the one with January 1.
 *
 * @param {Date} date Date.
 * @param {CalendarType} [calendarType="iso8601"] Calendar type.
 * @returns {number} Week number.
 */
function getWeekNumber(date, calendarType) {
    if (calendarType === void 0) { calendarType = const_js_1.CALENDAR_TYPES.ISO_8601; }
    var calendarTypeForWeekNumber = calendarType === const_js_1.CALENDAR_TYPES.GREGORY ? const_js_1.CALENDAR_TYPES.GREGORY : const_js_1.CALENDAR_TYPES.ISO_8601;
    var beginOfWeek = getBeginOfWeek(date, calendarType);
    var year = (0, date_utils_1.getYear)(date) + 1;
    var dayInWeekOne;
    var beginOfFirstWeek;
    // Look for the first week one that does not come after a given date
    do {
        dayInWeekOne = new Date(year, 0, calendarTypeForWeekNumber === const_js_1.CALENDAR_TYPES.ISO_8601 ? 4 : 1);
        beginOfFirstWeek = getBeginOfWeek(dayInWeekOne, calendarType);
        year -= 1;
    } while (date < beginOfFirstWeek);
    return Math.round((beginOfWeek.getTime() - beginOfFirstWeek.getTime()) / (8.64e7 * 7)) + 1;
}
exports.getWeekNumber = getWeekNumber;
/**
 * Others
 */
/**
 * Returns the beginning of a given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date} Beginning of a given range.
 */
function getBegin(rangeType, date) {
    switch (rangeType) {
        case 'century':
            return (0, date_utils_1.getCenturyStart)(date);
        case 'decade':
            return (0, date_utils_1.getDecadeStart)(date);
        case 'year':
            return (0, date_utils_1.getYearStart)(date);
        case 'month':
            return (0, date_utils_1.getMonthStart)(date);
        case 'day':
            return (0, date_utils_1.getDayStart)(date);
        default:
            throw new Error("Invalid rangeType: ".concat(rangeType));
    }
}
exports.getBegin = getBegin;
/**
 * Returns the beginning of a previous given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date} Beginning of a previous given range.
 */
function getBeginPrevious(rangeType, date) {
    switch (rangeType) {
        case 'century':
            return (0, date_utils_1.getPreviousCenturyStart)(date);
        case 'decade':
            return (0, date_utils_1.getPreviousDecadeStart)(date);
        case 'year':
            return (0, date_utils_1.getPreviousYearStart)(date);
        case 'month':
            return (0, date_utils_1.getPreviousMonthStart)(date);
        default:
            throw new Error("Invalid rangeType: ".concat(rangeType));
    }
}
exports.getBeginPrevious = getBeginPrevious;
/**
 * Returns the beginning of a next given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date} Beginning of a next given range.
 */
function getBeginNext(rangeType, date) {
    switch (rangeType) {
        case 'century':
            return (0, date_utils_1.getNextCenturyStart)(date);
        case 'decade':
            return (0, date_utils_1.getNextDecadeStart)(date);
        case 'year':
            return (0, date_utils_1.getNextYearStart)(date);
        case 'month':
            return (0, date_utils_1.getNextMonthStart)(date);
        default:
            throw new Error("Invalid rangeType: ".concat(rangeType));
    }
}
exports.getBeginNext = getBeginNext;
function getBeginPrevious2(rangeType, date) {
    switch (rangeType) {
        case 'decade':
            return (0, date_utils_1.getPreviousDecadeStart)(date, -100);
        case 'year':
            return (0, date_utils_1.getPreviousYearStart)(date, -10);
        case 'month':
            return (0, date_utils_1.getPreviousMonthStart)(date, -12);
        default:
            throw new Error("Invalid rangeType: ".concat(rangeType));
    }
}
exports.getBeginPrevious2 = getBeginPrevious2;
function getBeginNext2(rangeType, date) {
    switch (rangeType) {
        case 'decade':
            return (0, date_utils_1.getNextDecadeStart)(date, 100);
        case 'year':
            return (0, date_utils_1.getNextYearStart)(date, 10);
        case 'month':
            return (0, date_utils_1.getNextMonthStart)(date, 12);
        default:
            throw new Error("Invalid rangeType: ".concat(rangeType));
    }
}
exports.getBeginNext2 = getBeginNext2;
/**
 * Returns the end of a given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date} End of a given range.
 */
function getEnd(rangeType, date) {
    switch (rangeType) {
        case 'century':
            return (0, date_utils_1.getCenturyEnd)(date);
        case 'decade':
            return (0, date_utils_1.getDecadeEnd)(date);
        case 'year':
            return (0, date_utils_1.getYearEnd)(date);
        case 'month':
            return (0, date_utils_1.getMonthEnd)(date);
        case 'day':
            return (0, date_utils_1.getDayEnd)(date);
        default:
            throw new Error("Invalid rangeType: ".concat(rangeType));
    }
}
exports.getEnd = getEnd;
/**
 * Returns the end of a previous given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date} End of a previous given range.
 */
function getEndPrevious(rangeType, date) {
    switch (rangeType) {
        case 'century':
            return (0, date_utils_1.getPreviousCenturyEnd)(date);
        case 'decade':
            return (0, date_utils_1.getPreviousDecadeEnd)(date);
        case 'year':
            return (0, date_utils_1.getPreviousYearEnd)(date);
        case 'month':
            return (0, date_utils_1.getPreviousMonthEnd)(date);
        default:
            throw new Error("Invalid rangeType: ".concat(rangeType));
    }
}
exports.getEndPrevious = getEndPrevious;
function getEndPrevious2(rangeType, date) {
    switch (rangeType) {
        case 'decade':
            return (0, date_utils_1.getPreviousDecadeEnd)(date, -100);
        case 'year':
            return (0, date_utils_1.getPreviousYearEnd)(date, -10);
        case 'month':
            return (0, date_utils_1.getPreviousMonthEnd)(date, -12);
        default:
            throw new Error("Invalid rangeType: ".concat(rangeType));
    }
}
exports.getEndPrevious2 = getEndPrevious2;
/**
 * Returns an array with the beginning and the end of a given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date[]} Beginning and end of a given range.
 */
function getRange(rangeType, date) {
    switch (rangeType) {
        case 'century':
            return (0, date_utils_1.getCenturyRange)(date);
        case 'decade':
            return (0, date_utils_1.getDecadeRange)(date);
        case 'year':
            return (0, date_utils_1.getYearRange)(date);
        case 'month':
            return (0, date_utils_1.getMonthRange)(date);
        case 'day':
            return (0, date_utils_1.getDayRange)(date);
        default:
            throw new Error("Invalid rangeType: ".concat(rangeType));
    }
}
exports.getRange = getRange;
/**
 * Creates a range out of two values, ensuring they are in order and covering entire period ranges.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date1 First date.
 * @param {Date} date2 Second date.
 * @returns {Date[]} Beginning and end of a given range.
 */
function getValueRange(rangeType, date1, date2) {
    var rawNextValue = [date1, date2].sort(function (a, b) { return a.getTime() - b.getTime(); });
    return [getBegin(rangeType, rawNextValue[0]), getEnd(rangeType, rawNextValue[1])];
}
exports.getValueRange = getValueRange;
function toYearLabel(locale, formatYear, dates) {
    if (formatYear === void 0) { formatYear = dateFormatter_js_1.formatYear; }
    return dates.map(function (date) { return formatYear(locale, date); }).join(' – ');
}
/**
 * @callback FormatYear
 * @param {string} locale Locale.
 * @param {Date} date Date.
 * @returns {string} Formatted year.
 */
/**
 * Returns a string labelling a century of a given date.
 * For example, for 2017 it will return 2001-2100.
 *
 * @param {string} locale Locale.
 * @param {FormatYear} formatYear Function to format a year.
 * @param {Date|string|number} date Date or a year as a string or as a number.
 * @returns {string} String labelling a century of a given date.
 */
function getCenturyLabel(locale, formatYear, date) {
    return toYearLabel(locale, formatYear, (0, date_utils_1.getCenturyRange)(date));
}
exports.getCenturyLabel = getCenturyLabel;
/**
 * Returns a string labelling a decade of a given date.
 * For example, for 2017 it will return 2011-2020.
 *
 * @param {string} locale Locale.
 * @param {FormatYear} formatYear Function to format a year.
 * @param {Date|string|number} date Date or a year as a string or as a number.
 * @returns {string} String labelling a decade of a given date.
 */
function getDecadeLabel(locale, formatYear, date) {
    return toYearLabel(locale, formatYear, (0, date_utils_1.getDecadeRange)(date));
}
exports.getDecadeLabel = getDecadeLabel;
/**
 * Returns a boolean determining whether a given date is the current day of the week.
 *
 * @param {Date} date Date.
 * @returns {boolean} Whether a given date is the current day of the week.
 */
function isCurrentDayOfWeek(date) {
    return date.getDay() === new Date().getDay();
}
exports.isCurrentDayOfWeek = isCurrentDayOfWeek;
/**
 * Returns a boolean determining whether a given date is a weekend day.
 *
 * @param {Date} date Date.
 * @param {CalendarType} [calendarType="iso8601"] Calendar type.
 * @returns {boolean} Whether a given date is a weekend day.
 */
function isWeekend(date, calendarType) {
    if (calendarType === void 0) { calendarType = const_js_1.CALENDAR_TYPES.ISO_8601; }
    var weekday = date.getDay();
    switch (calendarType) {
        case const_js_1.CALENDAR_TYPES.ISLAMIC:
        case const_js_1.CALENDAR_TYPES.HEBREW:
            return weekday === FRIDAY || weekday === SATURDAY;
        case const_js_1.CALENDAR_TYPES.ISO_8601:
        case const_js_1.CALENDAR_TYPES.GREGORY:
            return weekday === SATURDAY || weekday === SUNDAY;
        default:
            throw new Error('Unsupported calendar type.');
    }
}
exports.isWeekend = isWeekend;
