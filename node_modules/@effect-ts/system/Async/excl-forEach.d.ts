import * as Chunk from "../Collections/Immutable/Chunk/core.js";
import type * as O from "../Option/index.js";
import type { Async } from "./core.js";
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns the results in a new `Chunk<B>`.
 *
 * For a parallel version of this method, see `forEachPar`.
 * If you do not need the results, see `forEachUnit` for a more efficient implementation.
 */
export declare function forEach_<A, R, E, B>(as: Iterable<A>, f: (a: A) => Async<R, E, B>): Async<R, E, Chunk.Chunk<B>>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns the results in a new `Chunk<B>`.
 *
 * For a parallel version of this method, see `forEachPar`.
 * If you do not need the results, see `forEachUnit` for a more efficient implementation.
 *
 * @ets_data_first forEach_
 */
export declare function forEach<A, R, E, B>(f: (a: A) => Async<R, E, B>): (as: Iterable<A>) => Async<R, E, Chunk.Chunk<B>>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced effects sequentially.
 *
 * Equivalent to `asUnit(forEach(as, f))`, but without the cost of building
 * the list of results.
 */
export declare function forEachUnit_<R, E, A, X>(as: Iterable<A>, f: (a: A) => Async<R, E, X>): Async<R, E, void>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced effects sequentially.
 *
 * Equivalent to `asUnit(forEach(as, f))`, but without the cost of building
 * the list of results.
 *
 * @ets_data_first forEachUnit_
 */
export declare function forEachUnit<R, E, A, X>(f: (a: A) => Async<R, E, X>): (as: Iterable<A>) => Async<R, E, void>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced effects in parallel, discarding the results.
 *
 * For a sequential version of this method, see `forEach_`.
 *
 * Optimized to avoid keeping full tree of effects, so that method could be
 * able to handle large input sequences.
 *
 * Additionally, interrupts all effects on any failure.
 */
export declare function forEachUnitPar_<R, E, A, X>(as: Iterable<A>, f: (a: A) => Async<R, E, X>): Async<R, E, void>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced effects in parallel, discarding the results.
 *
 * For a sequential version of this method, see `forEach_`.
 *
 * Optimized to avoid keeping full tree of effects, so that method could be
 * able to handle large input sequences.
 * Behaves almost like this code:
 *
 * Additionally, interrupts all effects on any failure.
 *
 * @ets_data_first forEachUnitPar_
 */
export declare function forEachUnitPar<R, E, A, X>(f: (a: A) => Async<R, E, X>): (as: Iterable<A>) => Async<R, E, void>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `Chunk<B>`.
 *
 * For a sequential version of this method, see `forEach`.
 */
export declare function forEachPar_<R, E, A, B>(as: Iterable<A>, f: (a: A) => Async<R, E, B>): Async<R, E, Chunk.Chunk<B>>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `Chunk<B>`.
 *
 * For a sequential version of this method, see `forEach`.
 *
 * @ets_data_first forEachPar_
 */
export declare function forEachPar<R, E, A, B>(f: (a: A) => Async<R, E, B>): (as: Iterable<A>) => Async<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure from left to right, and collect the
 * results. For a parallel version, see `collectAllPar`.
 */
export declare function collectAll<R, E, A>(as: Iterable<Async<R, E, A>>): Async<R, E, Chunk.Chunk<A>>;
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 */
export declare function collectAllPar<R, E, A>(as: Iterable<Async<R, E, A>>): Async<R, E, Chunk.Chunk<A>>;
/**
 * Evaluate each effect in the structure from left to right, and discard the
 * results. For a parallel version, see `collectAllUnitPar`.
 */
export declare function collectAllUnit<R, E, A>(as: Iterable<Async<R, E, A>>): Async<R, E, void>;
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 */
export declare function collectAllUnitPar<R, E, A>(as: Iterable<Async<R, E, A>>): Async<R, E, void>;
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 */
export declare function collectAllWith_<R, E, A, B>(as: Iterable<Async<R, E, A>>, pf: (a: A) => O.Option<B>): Async<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWith_
 */
export declare function collectAllWith<A, B>(pf: (a: A) => O.Option<B>): <R, E>(as: Iterable<Async<R, E, A>>) => Async<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 */
export declare function collectAllWithPar_<R, E, A, B>(as: Iterable<Async<R, E, A>>, pf: (a: A) => O.Option<B>): Async<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWithPar_
 */
export declare function collectAllWithPar<A, B>(pf: (a: A) => O.Option<B>): <R, E>(as: Iterable<Async<R, E, A>>) => Async<R, E, Chunk.Chunk<B>>;
//# sourceMappingURL=excl-forEach.d.ts.map