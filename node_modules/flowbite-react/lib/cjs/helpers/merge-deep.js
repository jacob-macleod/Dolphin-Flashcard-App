"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDeep = void 0;
const clone_deep_1 = require("./clone-deep");
const is_object_1 = require("./is-object");
/**
 * Merge and deep copy the values of all of the enumerable own properties of target object from source object to a new object
 * @param target The target object to get properties from.
 * @param source The source object from which to copy properties.
 * @return A new merged and deep copied object.
 */
function mergeDeep(target, source) {
    if ((0, is_object_1.isObject)(source) && Object.keys(source).length === 0) {
        return (0, clone_deep_1.cloneDeep)({ ...target, ...source });
    }
    const output = { ...target, ...source };
    if ((0, is_object_1.isObject)(source) && (0, is_object_1.isObject)(target)) {
        for (const key in source) {
            if ((0, is_object_1.isObject)(source[key]) && key in target && (0, is_object_1.isObject)(target[key])) {
                output[key] = mergeDeep(target[key], source[key]);
            }
            else {
                output[key] = (0, is_object_1.isObject)(source[key]) ? (0, clone_deep_1.cloneDeep)(source[key]) : source[key];
            }
        }
    }
    return output;
}
exports.mergeDeep = mergeDeep;
