import * as Ord from "@effect-ts/system/Ord";
import type { Associative } from "./definition.js";
/**
 * Fold `Associative` through an `Array`
 */
export declare function fold<A>(S: Associative<A>): (a: A) => (as: ReadonlyArray<A>) => A;
/**
 * `Associative` that returns first element
 */
export declare function first<A = never>(): Associative<A>;
/**
 * `Associative` that returns last element
 */
export declare function last<A = never>(): Associative<A>;
/**
 * Given a tuple of `Associative` returns an `Associative` for the tuple
 */
export declare function tuple<T extends ReadonlyArray<Associative<any>>>(...associatives: T): Associative<{
    [K in keyof T]: T[K] extends Associative<infer A> ? A : never;
}>;
/**
 * The dual of a `Associative`, obtained by swapping the arguments of `combine`.
 */
export declare function inverted<A>(S: Associative<A>): Associative<A>;
/**
 * `Associative` for function combination
 */
export declare function func<S>(S: Associative<S>): <A = never>() => Associative<(a: A) => S>;
/**
 * `Associative` for a structure
 */
export declare function struct<O extends Record<string, any>>(associatives: {
    [K in keyof O]: Associative<O[K]>;
}): Associative<O>;
/**
 * `Associative` that returns last `Min` of elements
 */
export declare function min<A>(O: Ord.Ord<A>): Associative<A>;
/**
 * `Associative` that returns last `Max` of elements
 */
export declare function max<A>(O: Ord.Ord<A>): Associative<A>;
/**
 * Returns a `Associative` instance for objects preserving their type
 */
export declare function object<A extends object = never>(): Associative<A>;
/**
 * You can glue items between and stay associative
 */
export declare function intercalate<A>(a: A): (S: Associative<A>) => Associative<A>;
export * from "./definition.js";
//# sourceMappingURL=operations.d.ts.map