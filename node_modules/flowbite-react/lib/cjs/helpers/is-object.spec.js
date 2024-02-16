"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const is_object_1 = require("./is-object");
(0, vitest_1.describe)('isObject function', () => {
    (0, vitest_1.it)('should return true for an empty object', () => {
        (0, vitest_1.expect)((0, is_object_1.isObject)({})).toBe(true);
    });
    (0, vitest_1.it)('should return true for a non-empty object', () => {
        (0, vitest_1.expect)((0, is_object_1.isObject)({ key: 'value' })).toBe(true);
    });
    (0, vitest_1.it)('should return false for a string', () => {
        (0, vitest_1.expect)((0, is_object_1.isObject)('string')).toBe(false);
    });
    (0, vitest_1.it)('should return false for an array', () => {
        (0, vitest_1.expect)((0, is_object_1.isObject)([1, 2, 3])).toBe(false);
    });
    (0, vitest_1.it)('should return false for null', () => {
        (0, vitest_1.expect)((0, is_object_1.isObject)(null)).toBe(false);
    });
    (0, vitest_1.it)('should return false for undefined', () => {
        (0, vitest_1.expect)((0, is_object_1.isObject)(undefined)).toBe(false);
    });
});
