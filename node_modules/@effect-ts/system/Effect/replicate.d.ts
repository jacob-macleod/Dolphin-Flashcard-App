import type { Effect } from "./effect.js";
/**
 * Replicates the given effect `n` times.
 *
 * @ets_data_first replicate_
 */
export declare function replicate(n: number, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>[];
/**
 * Replicates the given effect `n` times.
 */
export declare function replicate_<R, E, A>(self: Effect<R, E, A>, n: number): Effect<R, E, A>[];
/**
 * Performs this effect the specified number of times, discarding the
 * results.
 */
export declare function replicateMUnit_<R, E, A>(self: Effect<R, E, A>, n: number): Effect<R, E, void>;
/**
 * Performs this effect the specified number of times, discarding the
 * results.
 */
export declare function replicateMUnit(n: number): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, void>;
//# sourceMappingURL=replicate.d.ts.map