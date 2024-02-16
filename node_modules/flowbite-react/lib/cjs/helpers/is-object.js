"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = void 0;
/**
 * Check if provided parameter is plain object
 * @param item
 * @returns boolean
 */
function isObject(item) {
    return item !== null && typeof item === 'object' && item.constructor === Object;
}
exports.isObject = isObject;
