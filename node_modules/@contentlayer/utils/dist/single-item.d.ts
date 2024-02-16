export declare class SingleItem<T> {
    item: T;
    constructor(item: T);
    map<U>(fn: (item: T) => U): SingleItem<U>;
    filter(fn: (item: T) => boolean): SingleItem<T | undefined>;
}
export declare const singleItem: <T>(item: T) => SingleItem<T>;
//# sourceMappingURL=single-item.d.ts.map