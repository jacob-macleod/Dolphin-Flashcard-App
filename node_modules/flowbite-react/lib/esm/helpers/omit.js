export const omit = (keys) => (obj) => {
    const result = {};
    for (const key in obj) {
        // @ts-expect-error - bypass
        if (keys.includes(key)) {
            continue;
        }
        // @ts-expect-error - bypass
        result[key] = obj[key];
    }
    return result;
};
