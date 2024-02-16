"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const omit_1 = require("./omit");
(0, vitest_1.describe)('omit', () => {
    (0, vitest_1.it)('should omit keys from object', () => {
        (0, vitest_1.expect)((0, omit_1.omit)(['a', 'b'])({ a: 'a', b: 'b', c: 'c' })).toEqual({ c: 'c' });
    });
});
