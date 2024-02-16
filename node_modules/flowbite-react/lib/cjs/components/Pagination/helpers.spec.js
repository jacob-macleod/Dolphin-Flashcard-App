"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const helpers_1 = require("./helpers");
(0, vitest_1.describe)('Helpers / Range', () => {
    (0, vitest_1.it)('should return the empty list, given start >= end', () => {
        (0, vitest_1.expect)((0, helpers_1.range)(20, 10)).toEqual([]);
        (0, vitest_1.expect)((0, helpers_1.range)(10, 10)).toEqual([]);
    });
    (0, vitest_1.it)('should return every number from start to end, inclusive, given start < end', () => {
        (0, vitest_1.expect)((0, helpers_1.range)(10, 20)).toEqual([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    });
});
