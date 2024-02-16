import type { Effect } from "./effect.js";
/**
 * Retries this effect until its error satisfies the specified effectful predicate.
 *
 * @ets_data_first retryUtilM_
 */
export declare function retryUntilM<E, R1, E1>(f: (a: E) => Effect<R1, E1, boolean>, __trace?: string): <R, A>(self: Effect<R, E, A>) => Effect<R & R1, E | E1, A>;
/**
 * Retries this effect until its error satisfies the specified effectful predicate.
 */
export declare function retryUntilM_<R, E, A, R1, E1>(self: Effect<R, E, A>, f: (a: E) => Effect<R1, E1, boolean>, __trace?: string): Effect<R & R1, E | E1, A>;
/**
 * Retries this effect until its error satisfies the specified predicate.
 *
 * @ets_data_first retryUntil_
 */
export declare function retryUntil<E>(f: (a: E) => boolean, __trace?: string): <R, A>(self: Effect<R, E, A>) => Effect<R, E, A>;
/**
 * Retries this effect until its error satisfies the specified predicate.
 */
export declare function retryUntil_<R, E, A>(self: Effect<R, E, A>, f: (a: E) => boolean, __trace?: string): Effect<R, E, A>;
//# sourceMappingURL=retryUntil.d.ts.map