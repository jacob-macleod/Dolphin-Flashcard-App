import * as Chunk from "../Collections/Immutable/Chunk/core.js";
import type { ExecutionStrategy } from "../Effect/ExecutionStrategy.js";
import type { Managed } from "./managed.js";
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns the results in a new `B[]`.
 *
 * For a parallel version of this method, see `forEachPar`.
 * If you do not need the results, see `forEachUnit` for a more efficient implementation.
 *
 * @ets_data_first forEach_
 */
export declare function forEach<R, E, A, B>(f: (a: A) => Managed<R, E, B>, __trace?: string): (as: Iterable<A>) => Managed<R, E, Chunk.Chunk<B>>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns the results in a new `B[]`.
 *
 * For a parallel version of this method, see `forEachPar_`.
 * If you do not need the results, see `forEachUnit_` for a more efficient implementation.
 */
export declare function forEach_<R, E, A, B>(as: Iterable<A>, f: (a: A) => Managed<R, E, B>, __trace?: string): Managed<R, E, Chunk.Chunk<B>>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `readonly B[]`.
 *
 * For a sequential version of this method, see `forEach`.
 */
export declare function forEachExec_<R, E, A, B>(as: Iterable<A>, es: ExecutionStrategy, f: (a: A) => Managed<R, E, B>, __trace?: string): Managed<R, E, Chunk.Chunk<B>>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `readonly B[]`.
 *
 * For a sequential version of this method, see `forEach`.
 *
 * @ets_data_first forEachExec_
 */
export declare function forEachExec<R, E, A, B>(es: ExecutionStrategy, f: (a: A) => Managed<R, E, B>, __trace?: string): (as: Iterable<A>) => Managed<R, E, Chunk.Chunk<B>>;
/**
 * Applies the function `f` to each element of the `Iterable[A]` and runs
 * produced effects sequentially.
 *
 * Equivalent to `forEach(as)(f).unit`, but without the cost of building
 * the list of results.
 */
export declare function forEachUnit_<R, E, A, B>(as: Iterable<A>, f: (a: A) => Managed<R, E, B>, __trace?: string): Managed<R, E, void>;
/**
 * Applies the function `f` to each element of the `Iterable[A]` and runs
 * produced effects sequentially.
 *
 * Equivalent to `forEach(as)(f).unit`, but without the cost of building
 * the list of results.
 *
 * @ets_data_first forEachUnit_
 */
export declare function forEachUnit<R, E, A, B>(f: (a: A) => Managed<R, E, B>, __trace?: string): (as: Iterable<A>) => Managed<R, E, void>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `B[]`.
 *
 * For a sequential version of this method, see `forEach`.
 *
 * @ets_data_first forEachPar_
 */
export declare function forEachPar<R, E, A, B>(f: (a: A) => Managed<R, E, B>, __trace?: string): (as: Iterable<A>) => Managed<R, E, Chunk.Chunk<B>>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `B[]`.
 *
 * For a sequential version of this method, see `forEach_`.
 */
export declare function forEachPar_<R, E, A, B>(as: Iterable<A>, f: (a: A) => Managed<R, E, B>, __trace?: string): Managed<R, E, Chunk.Chunk<B>>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `B[]`.
 *
 * Unlike `forEachPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first forEachParN_
 */
export declare function forEachParN<R, E, A, B>(n: number, f: (a: A) => Managed<R, E, B>, __trace?: string): (as: Iterable<A>) => Managed<R, E, Chunk.Chunk<B>>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `B[]`.
 *
 * Unlike `forEachPar_`, this method will use at most up to `n` fibers.
 */
export declare function forEachParN_<R, E, A, B>(as: Iterable<A>, n: number, f: (a: A) => Managed<R, E, B>, __trace?: string): Managed<R, E, Chunk.Chunk<B>>;
//# sourceMappingURL=forEach.d.ts.map