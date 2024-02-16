import type { Show } from "./definitions.js";
export declare function struct<O extends Record<string, any>>(shows: {
    [K in keyof O]: Show<O[K]>;
}): Show<O>;
export declare function tuple<T extends ReadonlyArray<Show<any>>>(...shows: T): Show<{
    [K in keyof T]: T[K] extends Show<infer A> ? A : never;
}>;
export declare const boolean: Show<boolean>;
export declare const number: Show<number>;
export declare const string: Show<string>;
//# sourceMappingURL=operations.d.ts.map