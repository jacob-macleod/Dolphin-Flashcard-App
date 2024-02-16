"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatYear = exports.formatWeekday = exports.formatShortWeekday = exports.formatMonthYear = exports.formatMonth = exports.formatLongDate = exports.formatDay = exports.formatDate = void 0;
var get_user_locale_1 = __importDefault(require("get-user-locale"));
var formatterCache = new Map();
function getFormatter(options) {
    return function formatter(locale, date) {
        var localeWithDefault = locale || (0, get_user_locale_1.default)();
        if (!formatterCache.has(localeWithDefault)) {
            formatterCache.set(localeWithDefault, new Map());
        }
        var formatterCacheLocale = formatterCache.get(localeWithDefault);
        if (!formatterCacheLocale.has(options)) {
            formatterCacheLocale.set(options, new Intl.DateTimeFormat(localeWithDefault || undefined, options).format);
        }
        return formatterCacheLocale.get(options)(date);
    };
}
/**
 * Changes the hour in a Date to ensure right date formatting even if DST is messed up.
 * Workaround for bug in WebKit and Firefox with historical dates.
 * For more details, see:
 * https://bugs.chromium.org/p/chromium/issues/detail?id=750465
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1385643
 *
 * @param {Date} date Date.
 * @returns {Date} Date with hour set to 12.
 */
function toSafeHour(date) {
    var safeDate = new Date(date);
    return new Date(safeDate.setHours(12));
}
function getSafeFormatter(options) {
    return function (locale, date) { return getFormatter(options)(locale, toSafeHour(date)); };
}
var formatDateOptions = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
};
var formatDayOptions = { day: 'numeric' };
var formatLongDateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
};
var formatMonthOptions = { month: 'long' };
var formatMonthYearOptions = {
    month: 'long',
    year: 'numeric',
};
var formatShortWeekdayOptions = { weekday: 'short' };
var formatWeekdayOptions = { weekday: 'long' };
var formatYearOptions = { year: 'numeric' };
exports.formatDate = getSafeFormatter(formatDateOptions);
exports.formatDay = getSafeFormatter(formatDayOptions);
exports.formatLongDate = getSafeFormatter(formatLongDateOptions);
exports.formatMonth = getSafeFormatter(formatMonthOptions);
exports.formatMonthYear = getSafeFormatter(formatMonthYearOptions);
exports.formatShortWeekday = getSafeFormatter(formatShortWeekdayOptions);
exports.formatWeekday = getSafeFormatter(formatWeekdayOptions);
exports.formatYear = getSafeFormatter(formatYearOptions);
