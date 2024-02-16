import type * as Tp from "../Collections/Immutable/Tuple/index.js";
import type { Effect, RIO } from "./effect.js";
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in a separated fashion.
 *
 * @ets_data_first partition_
 */
export declare function partition<A, R, E, B>(f: (a: A) => Effect<R, E, B>, __trace?: string): (as: Iterable<A>) => RIO<R, Tp.Tuple<[Iterable<E>, Iterable<B>]>>;
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in a separated fashion.
 */
export declare function partition_<A, R, E, B>(as: Iterable<A>, f: (a: A) => Effect<R, E, B>, __trace?: string): RIO<R, Tp.Tuple<[Iterable<E>, Iterable<B>]>>;
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in parallel and returns the result as
 * a tuple.
 *
 * @ets_data_first partitionPar_
 */
export declare function partitionPar<A, R, E, B>(f: (a: A) => Effect<R, E, B>, __trace?: string): (as: Iterable<A>) => Effect<R, never, Tp.Tuple<[Iterable<E>, Iterable<B>]>>;
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in parallel and returns the result as
 * a tuple.
 */
export declare function partitionPar_<A, R, E, B>(as: Iterable<A>, f: (a: A) => Effect<R, E, B>, __trace?: string): Effect<R, never, Tp.Tuple<[Iterable<E>, Iterable<B>]>>;
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in parallel and returns the result as
 * a tuple.
 *
 * Unlike `partitionPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first partitionParN_
 */
export declare function partitionParN<A, R, E, B>(n: number, f: (a: A) => Effect<R, E, B>, __trace?: string): (as: Iterable<A>) => Effect<R, never, Tp.Tuple<[Iterable<E>, Iterable<B>]>>;
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in parallel and returns the result as
 * a tuple.
 *
 * Unlike `partitionPar`, this method will use at most up to `n` fibers.
 */
export declare function partitionParN_<A, R, E, B>(as: Iterable<A>, n: number, f: (a: A) => Effect<R, E, B>, __trace?: string): Effect<R, never, Tp.Tuple<[Iterable<E>, Iterable<B>]>>;
//# sourceMappingURL=partition.d.ts.map