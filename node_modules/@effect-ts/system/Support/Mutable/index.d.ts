export declare type MutableSet<A> = Set<A>;
export declare type MutableArray<A> = Array<A>;
export declare type MutableRecord<K extends string, T> = Record<K, T>;
export declare type MutableMap<K, T> = Map<K, T>;
export declare type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
//# sourceMappingURL=index.d.ts.map