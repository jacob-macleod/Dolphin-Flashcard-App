import * as Chunk from "../Collections/Immutable/Chunk/core.js";
import type { Effect } from "./effect.js";
import type { ExecutionStrategy } from "./ExecutionStrategy.js";
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 */
export declare function validate_<A, R, E, B>(as: Iterable<A>, f: (a: A) => Effect<R, E, B>, __trace?: string): Effect<R, Chunk.Chunk<E>, Chunk.Chunk<B>>;
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 */
export declare function validatePar_<A, R, E, B>(as: Iterable<A>, f: (a: A) => Effect<R, E, B>, __trace?: string): Effect<R, Chunk.Chunk<E>, Chunk.Chunk<B>>;
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 */
export declare function validateParN_<A, R, E, B>(as: Iterable<A>, n: number, f: (a: A) => Effect<R, E, B>, __trace?: string): Effect<R, Chunk.Chunk<E>, Chunk.Chunk<B>>;
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 */
export declare function validateExec_<A, R, E, B>(as: Iterable<A>, es: ExecutionStrategy, f: (a: A) => Effect<R, E, B>, __trace?: string): Effect<R, Chunk.Chunk<E>, Chunk.Chunk<B>>;
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 *
 * @ets_data_first validate_
 */
export declare function validate<A, R, E, B>(f: (a: A) => Effect<R, E, B>, __trace?: string): (as: Iterable<A>) => Effect<R, Chunk.Chunk<E>, Chunk.Chunk<B>>;
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 *
 * @ets_data_first validatePar_
 */
export declare function validatePar<A, R, E, B>(f: (a: A) => Effect<R, E, B>, __trace?: string): (as: Iterable<A>) => Effect<R, Chunk.Chunk<E>, Chunk.Chunk<B>>;
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 *
 * @ets_data_first validateParN_
 */
export declare function validateParN<A, R, E, B>(n: number, f: (a: A) => Effect<R, E, B>, __trace?: string): (as: Iterable<A>) => Effect<R, Chunk.Chunk<E>, Chunk.Chunk<B>>;
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 *
 * @ets_data_first validateExec_
 */
export declare function validateExec<R, E, A, B>(es: ExecutionStrategy, f: (a: A) => Effect<R, E, B>, __trace?: string): (as: Iterable<A>) => Effect<R, Chunk.Chunk<E>, Chunk.Chunk<B>>;
//# sourceMappingURL=validate.d.ts.map