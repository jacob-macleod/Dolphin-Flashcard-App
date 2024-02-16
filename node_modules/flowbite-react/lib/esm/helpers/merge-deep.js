import { cloneDeep } from './clone-deep';
import { isObject } from './is-object';
/**
 * Merge and deep copy the values of all of the enumerable own properties of target object from source object to a new object
 * @param target The target object to get properties from.
 * @param source The source object from which to copy properties.
 * @return A new merged and deep copied object.
 */
export function mergeDeep(target, source) {
    if (isObject(source) && Object.keys(source).length === 0) {
        return cloneDeep({ ...target, ...source });
    }
    const output = { ...target, ...source };
    if (isObject(source) && isObject(target)) {
        for (const key in source) {
            if (isObject(source[key]) && key in target && isObject(target[key])) {
                output[key] = mergeDeep(target[key], source[key]);
            }
            else {
                output[key] = isObject(source[key]) ? cloneDeep(source[key]) : source[key];
            }
        }
    }
    return output;
}
