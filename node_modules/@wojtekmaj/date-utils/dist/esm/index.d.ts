type DateLike = Date | number | string;
/**
 * Simple getters - getting a property of a given point in time
 */
/**
 * Gets year from a given date.
 *
 * @param {DateLike} date Date to get year from
 * @returns {number} Year
 */
export declare function getYear(date: DateLike): number;
/**
 * Gets month from a given date.
 *
 * @param {Date} date Date to get month from
 * @returns {number} Month
 */
export declare function getMonth(date: Date): number;
/**
 * Gets human-readable month from a given date.
 *
 * @param {Date} date Date to get human-readable month from
 * @returns {number} Human-readable month
 */
export declare function getMonthHuman(date: Date): number;
/**
 * Gets day of the month from a given date.
 *
 * @param {Date} date Date to get day of the month from
 * @returns {number} Day of the month
 */
export declare function getDate(date: Date): number;
/**
 * Gets hours from a given date.
 *
 * @param {Date | string} date Date to get hours from
 * @returns {number} Hours
 */
export declare function getHours(date: Date | string): number;
/**
 * Gets minutes from a given date.
 *
 * @param {Date | string} date Date to get minutes from
 * @returns {number} Minutes
 */
export declare function getMinutes(date: Date | string): number;
/**
 * Gets seconds from a given date.
 *
 * @param {Date | string} date Date to get seconds from
 * @returns {number} Seconds
 */
export declare function getSeconds(date: Date | string): number;
/**
 * Gets milliseconds from a given date.
 *
 * @param {Date | string} date Date to get milliseconds from
 * @returns {number} Milliseconds
 */
export declare function getMilliseconds(date: Date | string): number;
/**
 * Century
 */
/**
 * Gets century start date from a given date.
 *
 * @param {DateLike} date Date to get century start from
 * @returns {Date} Century start date
 */
export declare function getCenturyStart(date: DateLike): Date;
/**
 * Gets previous century start date from a given date.
 *
 * @param {DateLike} date Date to get previous century start from
 * @returns {Date} Previous century start date
 */
export declare const getPreviousCenturyStart: (date: DateLike, offset?: number) => Date;
/**
 * Gets next century start date from a given date.
 *
 * @param {DateLike} date Date to get next century start from
 * @returns {Date} Next century start date
 */
export declare const getNextCenturyStart: (date: DateLike, offset?: number) => Date;
/**
 * Gets century end date from a given date.
 *
 * @param {DateLike} date Date to get century end from
 * @returns {Date} Century end date
 */
export declare const getCenturyEnd: (date: DateLike) => Date;
/**
 * Gets previous century end date from a given date.
 *
 * @param {DateLike} date Date to get previous century end from
 * @returns {Date} Previous century end date
 */
export declare const getPreviousCenturyEnd: (date: DateLike, offset?: number) => Date;
/**
 * Gets next century end date from a given date.
 *
 * @param {DateLike} date Date to get next century end from
 * @returns {Date} Next century end date
 */
export declare const getNextCenturyEnd: (date: DateLike, offset?: number) => Date;
/**
 * Gets century start and end dates from a given date.
 *
 * @param {DateLike} date Date to get century start and end from
 * @returns {[Date, Date]} Century start and end dates
 */
export declare const getCenturyRange: (date: DateLike) => [Date, Date];
/**
 * Decade
 */
/**
 * Gets decade start date from a given date.
 *
 * @param {DateLike} date Date to get decade start from
 * @returns {Date} Decade start date
 */
export declare function getDecadeStart(date: DateLike): Date;
/**
 * Gets previous decade start date from a given date.
 *
 * @param {DateLike} date Date to get previous decade start from
 * @returns {Date} Previous decade start date
 */
export declare const getPreviousDecadeStart: (date: DateLike, offset?: number) => Date;
/**
 * Gets next decade start date from a given date.
 *
 * @param {DateLike} date Date to get next decade start from
 * @returns {Date} Next decade start date
 */
export declare const getNextDecadeStart: (date: DateLike, offset?: number) => Date;
/**
 * Gets decade end date from a given date.
 *
 * @param {DateLike} date Date to get decade end from
 * @returns {Date} Decade end date
 */
export declare const getDecadeEnd: (date: DateLike) => Date;
/**
 * Gets previous decade end date from a given date.
 *
 * @param {DateLike} date Date to get previous decade end from
 * @returns {Date} Previous decade end date
 */
export declare const getPreviousDecadeEnd: (date: DateLike, offset?: number) => Date;
/**
 * Gets next decade end date from a given date.
 *
 * @param {DateLike} date Date to get next decade end from
 * @returns {Date} Next decade end date
 */
export declare const getNextDecadeEnd: (date: DateLike, offset?: number) => Date;
/**
 * Gets decade start and end dates from a given date.
 *
 * @param {DateLike} date Date to get decade start and end from
 * @returns {[Date, Date]} Decade start and end dates
 */
export declare const getDecadeRange: (date: DateLike) => [Date, Date];
/**
 * Year
 */
/**
 * Gets year start date from a given date.
 *
 * @param {DateLike} date Date to get year start from
 * @returns {Date} Year start date
 */
export declare function getYearStart(date: DateLike): Date;
/**
 * Gets previous year start date from a given date.
 *
 * @param {DateLike} date Date to get previous year start from
 * @returns {Date} Previous year start date
 */
export declare const getPreviousYearStart: (date: DateLike, offset?: number) => Date;
/**
 * Gets next year start date from a given date.
 *
 * @param {DateLike} date Date to get next year start from
 * @returns {Date} Next year start date
 */
export declare const getNextYearStart: (date: DateLike, offset?: number) => Date;
/**
 * Gets year end date from a given date.
 *
 * @param {DateLike} date Date to get year end from
 * @returns {Date} Year end date
 */
export declare const getYearEnd: (date: DateLike) => Date;
/**
 * Gets previous year end date from a given date.
 *
 * @param {DateLike} date Date to get previous year end from
 * @returns {Date} Previous year end date
 */
export declare const getPreviousYearEnd: (date: DateLike, offset?: number) => Date;
/**
 * Gets next year end date from a given date.
 *
 * @param {DateLike} date Date to get next year end from
 * @returns {Date} Next year end date
 */
export declare const getNextYearEnd: (date: DateLike, offset?: number) => Date;
/**
 * Gets year start and end dates from a given date.
 *
 * @param {DateLike} date Date to get year start and end from
 * @returns {[Date, Date]} Year start and end dates
 */
export declare const getYearRange: (date: DateLike) => [Date, Date];
/**
 * Gets month start date from a given date.
 *
 * @param {DateLike} date Date to get month start from
 * @returns {Date} Month start date
 */
export declare function getMonthStart(date: Date): Date;
/**
 * Gets previous month start date from a given date.
 *
 * @param {DateLike} date Date to get previous month start from
 * @returns {Date} Previous month start date
 */
export declare const getPreviousMonthStart: (date: Date, offset?: number) => Date;
/**
 * Gets next month start date from a given date.
 *
 * @param {DateLike} date Date to get next month start from
 * @returns {Date} Next month start date
 */
export declare const getNextMonthStart: (date: Date, offset?: number) => Date;
/**
 * Gets month end date from a given date.
 *
 * @param {DateLike} date Date to get month end from
 * @returns {Date} Month end date
 */
export declare const getMonthEnd: (date: Date) => Date;
/**
 * Gets previous month end date from a given date.
 *
 * @param {DateLike} date Date to get previous month end from
 * @returns {Date} Previous month end date
 */
export declare const getPreviousMonthEnd: (date: Date, offset?: number) => Date;
/**
 * Gets next month end date from a given date.
 *
 * @param {DateLike} date Date to get next month end from
 * @returns {Date} Next month end date
 */
export declare const getNextMonthEnd: (date: Date, offset?: number) => Date;
/**
 * Gets month start and end dates from a given date.
 *
 * @param {DateLike} date Date to get month start and end from
 * @returns {[Date, Date]} Month start and end dates
 */
export declare const getMonthRange: (date: Date) => [Date, Date];
/**
 * Gets day start date from a given date.
 *
 * @param {DateLike} date Date to get day start from
 * @returns {Date} Day start date
 */
export declare function getDayStart(date: Date): Date;
/**
 * Gets previous day start date from a given date.
 *
 * @param {DateLike} date Date to get previous day start from
 * @returns {Date} Previous day start date
 */
export declare const getPreviousDayStart: (date: Date, offset?: number) => Date;
/**
 * Gets next day start date from a given date.
 *
 * @param {DateLike} date Date to get next day start from
 * @returns {Date} Next day start date
 */
export declare const getNextDayStart: (date: Date, offset?: number) => Date;
/**
 * Gets day end date from a given date.
 *
 * @param {DateLike} date Date to get day end from
 * @returns {Date} Day end date
 */
export declare const getDayEnd: (date: Date) => Date;
/**
 * Gets previous day end date from a given date.
 *
 * @param {DateLike} date Date to get previous day end from
 * @returns {Date} Previous day end date
 */
export declare const getPreviousDayEnd: (date: Date, offset?: number) => Date;
/**
 * Gets next day end date from a given date.
 *
 * @param {DateLike} date Date to get next day end from
 * @returns {Date} Next day end date
 */
export declare const getNextDayEnd: (date: Date, offset?: number) => Date;
/**
 * Gets day start and end dates from a given date.
 *
 * @param {DateLike} date Date to get day start and end from
 * @returns {[Date, Date]} Day start and end dates
 */
export declare const getDayRange: (date: Date) => [Date, Date];
/**
 * Other
 */
/**
 * Returns a number of days in a month of a given date.
 *
 * @param {Date} date Date
 * @returns {number} Number of days in a month
 */
export declare function getDaysInMonth(date: Date): number;
/**
 * Returns local hours and minutes (hh:mm).
 *
 * @param {Date | string} date Date to get hours and minutes from
 * @returns {string} Local hours and minutes
 */
export declare function getHoursMinutes(date: Date | string): string;
/**
 * Returns local hours, minutes and seconds (hh:mm:ss).
 *
 * @param {Date | string} date Date to get hours, minutes and seconds from
 * @returns {string} Local hours, minutes and seconds
 */
export declare function getHoursMinutesSeconds(date: Date | string): string;
/**
 * Returns local month in ISO-like format (YYYY-MM).
 *
 * @param {Date} date Date to get month in ISO-like format from
 * @returns {string} Local month in ISO-like format
 */
export declare function getISOLocalMonth(date: Date): string;
/**
 * Returns local date in ISO-like format (YYYY-MM-DD).
 *
 * @param {Date} date Date to get date in ISO-like format from
 * @returns {string} Local date in ISO-like format
 */
export declare function getISOLocalDate(date: Date): string;
/**
 * Returns local date & time in ISO-like format (YYYY-MM-DDThh:mm:ss).
 *
 * @param {Date} date Date to get date & time in ISO-like format from
 * @returns {string} Local date & time in ISO-like format
 */
export declare function getISOLocalDateTime(date: Date): string;
export {};
