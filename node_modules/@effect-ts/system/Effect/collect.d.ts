import type * as Chunk from "../Collections/Immutable/Chunk/core.js";
import type { Option } from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * Evaluate each effect in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 *
 * @ets_data_first collect_
 */
export declare function collect<A, R, E, B>(f: (a: A) => Effect<R, Option<E>, B>, __trace?: string): (self: Iterable<A>) => Effect<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 */
export declare function collect_<A, R, E, B>(self: Iterable<A>, f: (a: A) => Effect<R, Option<E>, B>, __trace?: string): Effect<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 *
 * @ets_data_first collectPar_
 */
export declare function collectPar<A, R, E, B>(f: (a: A) => Effect<R, Option<E>, B>, __trace?: string): (self: Iterable<A>) => Effect<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 */
export declare function collectPar_<A, R, E, B>(self: Iterable<A>, f: (a: A) => Effect<R, Option<E>, B>, __trace?: string): Effect<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 *
 * Unlike `collectPar`, this method will use at most up to `n` fibers.
 */
export declare function collectParN_<A, R, E, B>(self: Iterable<A>, n: number, f: (a: A) => Effect<R, Option<E>, B>, __trace?: string): Effect<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 *
 * Unlike `collectPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first collectParN_
 */
export declare function collectParN<A, R, E, B>(n: number, f: (a: A) => Effect<R, Option<E>, B>, __trace?: string): (self: Iterable<A>) => Effect<R, E, Chunk.Chunk<B>>;
//# sourceMappingURL=collect.d.ts.map