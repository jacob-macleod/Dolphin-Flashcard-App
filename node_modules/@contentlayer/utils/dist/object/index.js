export * from './pick.js';
export * from './omit.js';
export const mapObjectValues = (obj, mapValue) => {
    const mappedEntries = Object.entries(obj).map(([key, val]) => [key, mapValue(key, val)]);
    return Object.fromEntries(mappedEntries);
};
export const mergeDeep = (...objs) => {
    const result = {};
    for (const obj of objs) {
        for (const [key, val] of Object.entries(obj)) {
            if (val && typeof val === 'object' && !Array.isArray(val)) {
                // @ts-expect-error TODO
                result[key] = mergeDeep(result[key] || {}, val);
            }
            else {
                // @ts-expect-error TODO
                result[key] = val;
            }
        }
    }
    return result;
};
//# sourceMappingURL=index.js.map