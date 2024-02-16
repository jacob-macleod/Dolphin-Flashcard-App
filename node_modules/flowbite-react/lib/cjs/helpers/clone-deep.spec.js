"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const clone_deep_1 = require("./clone-deep");
(0, vitest_1.describe)('Helpers / cloneDeep', () => {
    (0, vitest_1.it)('should clone a simple object', () => {
        const source = { key: 'value' };
        const cloned = (0, clone_deep_1.cloneDeep)(source);
        (0, vitest_1.expect)(cloned).toEqual(source); // Check for deep equality
        (0, vitest_1.expect)(cloned).not.toBe(source); // Ensure it's a deep clone, not the same reference
    });
    (0, vitest_1.it)('should handle null gracefully', () => {
        const source = null;
        const cloned = (0, clone_deep_1.cloneDeep)(source);
        (0, vitest_1.expect)(cloned).toBeNull();
    });
    (0, vitest_1.it)('should handle undefined gracefully', () => {
        const source = undefined;
        const cloned = (0, clone_deep_1.cloneDeep)(source);
        (0, vitest_1.expect)(cloned).toBeUndefined();
    });
});
