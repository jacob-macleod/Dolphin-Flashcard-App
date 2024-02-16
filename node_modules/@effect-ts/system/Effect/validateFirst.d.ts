import type { Chunk } from "../Collections/Immutable/Chunk/index.js";
import type { Effect } from "./effect.js";
/**
 * Feeds elements of type `A` to `f` until it succeeds. Returns first success
 * or the accumulation of all errors.
 */
export declare function validateFirst_<A, R, E, B>(i: Iterable<A>, f: (a: A) => Effect<R, E, B>, __trace?: string): Effect<R, Chunk<E>, B>;
/**
 * Feeds elements of type `A` to `f` until it succeeds. Returns first success
 * or the accumulation of all errors.
 *
 * @ets_data_first validateFirst_
 */
export declare function validateFirst<A, R, E, B>(f: (a: A) => Effect<R, E, B>, __trace?: string): (i: Iterable<A>) => Effect<R, Chunk<E>, B>;
/**
 * Feeds elements of type `A` to `f`, in parallel, until it succeeds. Returns
 * first success or the accumulation of all errors.
 *
 * In case of success all other running fibers are terminated.
 */
export declare function validateFirstPar_<A, R, E, B>(i: Iterable<A>, f: (a: A) => Effect<R, E, B>, __trace?: string): Effect<R, Chunk<E>, B>;
/**
 * Feeds elements of type `A` to `f`, in parallel, until it succeeds. Returns
 * first success or the accumulation of all errors.
 *
 * In case of success all other running fibers are terminated.
 *
 * @ets_data_first validateFirstPar_
 */
export declare function validateFirstPar<A, R, E, B>(f: (a: A) => Effect<R, E, B>, __trace?: string): (i: Iterable<A>) => Effect<R, Chunk<E>, B>;
/**
 * Feeds elements of type `A` to `f`, in parallel, until it succeeds. Returns
 * first success or the accumulation of all errors.
 *
 * In case of success all other running fibers are terminated.
 *
 * Uses up to N fibers.
 */
export declare function validateFirstParN_<A, R, E, B>(i: Iterable<A>, n: number, f: (a: A) => Effect<R, E, B>, __trace?: string): Effect<R, Chunk<E>, B>;
/**
 * Feeds elements of type `A` to `f`, in parallel, until it succeeds. Returns
 * first success or the accumulation of all errors.
 *
 * In case of success all other running fibers are terminated.
 *
 * Uses up to N fibers.
 *
 * @ets_data_first validateFirstParN_
 */
export declare function validateFirstParN<A, R, E, B>(n: number, f: (a: A) => Effect<R, E, B>, __trace?: string): (i: Iterable<A>) => Effect<R, Chunk<E>, B>;
//# sourceMappingURL=validateFirst.d.ts.map