import type { Effect } from "./effect.js";
/**
 * Retries this effect while its error satisfies the specified effectful predicate.
 *
 * @ets_data_first retryWhileM_
 */
export declare function retryWhileM<E, R1, E1>(f: (a: E) => Effect<R1, E1, boolean>, __trace?: string): <R, A>(self: Effect<R, E, A>) => Effect<R & R1, E | E1, A>;
/**
 * Retries this effect while its error satisfies the specified effectful predicate.
 */
export declare function retryWhileM_<R, E, A, R1, E1>(self: Effect<R, E, A>, f: (a: E) => Effect<R1, E1, boolean>, __trace?: string): Effect<R & R1, E | E1, A>;
/**
 * Retries this effect while its error satisfies the specified predicate.
 *
 * @ets_data_first retryWhile_
 */
export declare function retryWhile<E>(f: (a: E) => boolean, __trace?: string): <R, A>(self: Effect<R, E, A>) => Effect<R, E, A>;
/**
 * Retries this effect while its error satisfies the specified predicate.
 */
export declare function retryWhile_<R, E, A>(self: Effect<R, E, A>, f: (a: E) => boolean, __trace?: string): Effect<R, E, A>;
//# sourceMappingURL=retryWhile.d.ts.map