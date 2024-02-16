"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneDeep = void 0;
const is_object_1 = require("./is-object");
function cloneDeep(source) {
    if (!(0, is_object_1.isObject)(source)) {
        return source;
    }
    const output = {};
    for (const key in source) {
        output[key] = cloneDeep(source[key]);
    }
    return output;
}
exports.cloneDeep = cloneDeep;
