import type { Effect } from "./effect.js";
/**
 * Filters the collection using the specified effectual predicate.
 *
 * @ets_data_first filter_
 */
export declare function filter<A, R, E>(f: (a: A) => Effect<R, E, boolean>, __trace?: string): (as: Iterable<A>) => Effect<R, E, readonly A[]>;
/**
 * Filters the collection using the specified effectual predicate.
 */
export declare function filter_<A, R, E>(as: Iterable<A>, f: (a: A) => Effect<R, E, boolean>, __trace?: string): Effect<R, E, readonly A[]>;
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filter` for a sequential version of it.
 */
export declare function filterPar_<A, R, E>(as: Iterable<A>, f: (a: A) => Effect<R, E, boolean>, __trace?: string): Effect<R, E, import("../Collections/Immutable/Chunk/definition.js").Chunk<A>>;
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filter` for a sequential version of it.
 *
 * @ets_data_first filterPar_
 */
export declare function filterPar<A, R, E>(f: (a: A) => Effect<R, E, boolean>, __trace?: string): (as: Iterable<A>) => Effect<R, E, import("../Collections/Immutable/Chunk/definition.js").Chunk<A>>;
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filter` for a sequential version of it.
 *
 * This method will use up to `n` fibers.
 */
export declare function filterParN_<A, R, E>(as: Iterable<A>, n: number, f: (a: A) => Effect<R, E, boolean>, __trace?: string): Effect<R, E, import("../Collections/Immutable/Chunk/definition.js").Chunk<A>>;
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filter` for a sequential version of it.
 *
 * This method will use up to `n` fibers.
 *
 * @ets_data_first filterParN_
 */
export declare function filterParN<A, R, E>(n: number, f: (a: A) => Effect<R, E, boolean>, __trace?: string): (as: Iterable<A>) => Effect<R, E, import("../Collections/Immutable/Chunk/definition.js").Chunk<A>>;
/**
 * Filters the collection using the specified effectual predicate, removing
 * all elements that satisfy the predicate.
 *
 * @ets_data_first filterNot_
 */
export declare function filterNot<A, R, E>(f: (a: A) => Effect<R, E, boolean>, __trace?: string): (as: Iterable<A>) => Effect<R, E, readonly A[]>;
/**
 * Filters the collection using the specified effectual predicate, removing
 * all elements that satisfy the predicate.
 */
export declare function filterNot_<A, R, E>(as: Iterable<A>, f: (a: A) => Effect<R, E, boolean>, __trace?: string): Effect<R, E, readonly A[]>;
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filterNot` for a sequential version of it.
 */
export declare function filterNotPar_<A, R, E>(as: Iterable<A>, f: (a: A) => Effect<R, E, boolean>, __trace?: string): Effect<R, E, import("../Collections/Immutable/Chunk/definition.js").Chunk<A>>;
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filterNot` for a sequential version of it.
 *
 * @ets_data_first filterNotPar_
 */
export declare function filterNotPar<A, R, E>(f: (a: A) => Effect<R, E, boolean>, __trace?: string): (as: Iterable<A>) => Effect<R, E, import("../Collections/Immutable/Chunk/definition.js").Chunk<A>>;
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filterNot` for a sequential version of it.
 */
export declare function filterNotParN_<A, R, E>(as: Iterable<A>, n: number, f: (a: A) => Effect<R, E, boolean>, __trace?: string): Effect<R, E, import("../Collections/Immutable/Chunk/definition.js").Chunk<A>>;
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filterNot` for a sequential version of it.
 *
 * @ets_data_first filterNotParN_
 */
export declare function filterNotParN<R, E, A>(n: number, f: (a: A) => Effect<R, E, boolean>, __trace?: string): (as: Iterable<A>) => Effect<R, E, import("../Collections/Immutable/Chunk/definition.js").Chunk<A>>;
//# sourceMappingURL=filter.d.ts.map