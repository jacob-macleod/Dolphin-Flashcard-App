/** Promise.all + Array.map */
export const promiseMap = (arr, map) => Promise.all(arr.map(map));
export const promiseMapDict = async (dict, map) => {
    const mappedEntries = await Promise.all(Object.entries(dict).map(async ([key, val]) => [key, await map(val)]));
    return Object.fromEntries(mappedEntries);
};
export const promiseMapToDict = async (arr, mapValue, mapKey) => {
    const mappedEntries = await Promise.all(arr.map(async (el, index) => [mapKey(el, index), await mapValue(el, index)]));
    return Object.fromEntries(mappedEntries);
};
export const promiseMapPool = async (arr, map, poolLimit) => {
    const ret = [];
    const executing = [];
    for (const [index, item] of arr.entries()) {
        const p = Promise.resolve().then(() => map(item, index));
        ret.push(p);
        if (poolLimit <= arr.length) {
            const e = p.then(() => executing.splice(executing.indexOf(e), 1));
            executing.push(e);
            if (executing.length >= poolLimit) {
                await Promise.race(executing);
            }
        }
    }
    return Promise.all(ret);
};
//# sourceMappingURL=promise.js.map