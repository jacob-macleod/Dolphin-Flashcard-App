"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = void 0;
const range = (start, end) => {
    if (start >= end) {
        return [];
    }
    return [...Array(end - start + 1).keys()].map((key) => key + start);
};
exports.range = range;
