import type { Effect } from "./effect.js";
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 */
export declare function reduce_<A, Z, R, E>(i: Iterable<A>, zero: Z, f: (z: Z, a: A) => Effect<R, E, Z>, __trace?: string): Effect<R, E, Z>;
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 *
 * @ets_data_first reduce_
 */
export declare function reduce<Z, R, E, A>(zero: Z, f: (z: Z, a: A) => Effect<R, E, Z>, __trace?: string): (i: Iterable<A>) => Effect<R, E, Z>;
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 */
export declare function reduceRight_<A, Z, R, E>(i: Iterable<A>, zero: Z, f: (a: A, z: Z) => Effect<R, E, Z>, __trace?: string): Effect<R, E, Z>;
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 *
 * @ets_data_first reduceRight_
 */
export declare function reduceRight<R, E, A, Z>(zero: Z, f: (a: A, z: Z) => Effect<R, E, Z>, __trace?: string): (i: Iterable<A>) => Effect<R, E, Z>;
//# sourceMappingURL=reduce.d.ts.map