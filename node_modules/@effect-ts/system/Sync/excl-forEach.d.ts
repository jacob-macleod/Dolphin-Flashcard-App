import * as Chunk from "../Collections/Immutable/Chunk/core.js";
import type * as O from "../Option/index.js";
import type { Sync } from "./core.js";
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns the results in a new `readonly B[]`.
 *
 * For a parallel version of this method, see `forEachPar`.
 * If you do not need the results, see `forEachUnit` for a more efficient implementation.
 */
export declare function forEach_<A, R, E, B>(as: Iterable<A>, f: (a: A) => Sync<R, E, B>): Sync<R, E, Chunk.Chunk<B>>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns the results in a new `readonly B[]`.
 *
 * For a parallel version of this method, see `forEachPar`.
 * If you do not need the results, see `forEachUnit` for a more efficient implementation.
 *
 * @ets_data_first forEach_
 */
export declare function forEach<A, R, E, B>(f: (a: A) => Sync<R, E, B>): (as: Iterable<A>) => Sync<R, E, Chunk.Chunk<B>>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced Syncs sequentially.
 *
 * Equivalent to `asUnit(forEach(as, f))`, but without the cost of building
 * the list of results.
 */
export declare function forEachUnit_<R, E, A, X>(as: Iterable<A>, f: (a: A) => Sync<R, E, X>, __trace?: string): Sync<R, E, void>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced Syncs sequentially.
 *
 * Equivalent to `asUnit(forEach(as, f))`, but without the cost of building
 * the list of results.
 *
 * @ets_data_first forEachUnit_
 */
export declare function forEachUnit<R, E, A, X>(f: (a: A) => Sync<R, E, X>, __trace?: string): (as: Iterable<A>) => Sync<R, E, void>;
/**
 * Evaluate each Sync in the structure from left to right, and collect the
 * results. For a parallel version, see `collectAllPar`.
 */
export declare function collectAll<R, E, A>(as: Iterable<Sync<R, E, A>>): Sync<R, E, Chunk.Chunk<A>>;
/**
 * Evaluate each Sync in the structure from left to right, and discard the
 * results. For a parallel version, see `collectAllUnitPar`.
 */
export declare function collectAllUnit<R, E, A>(as: Iterable<Sync<R, E, A>>, __trace?: string): Sync<R, E, void>;
/**
 * Evaluate each Sync in the structure with `collectAll`, and collect
 * the results with given partial function.
 */
export declare function collectAllWith_<R, E, A, B>(as: Iterable<Sync<R, E, A>>, pf: (a: A) => O.Option<B>, __trace?: string): Sync<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each Sync in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWith_
 */
export declare function collectAllWith<A, B>(pf: (a: A) => O.Option<B>): <R, E>(as: Iterable<Sync<R, E, A>>) => Sync<R, E, Chunk.Chunk<B>>;
//# sourceMappingURL=excl-forEach.d.ts.map