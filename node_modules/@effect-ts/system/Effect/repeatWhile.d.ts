import type { Effect } from "./effect.js";
/**
 * Repeats this effect while its error satisfies the specified effectful predicate.
 *
 * @ets_data_first repeatWhileM_
 */
export declare function repeatWhileM<A, R1, E1>(f: (a: A) => Effect<R1, E1, boolean>, __trace?: string): <R, E>(self: Effect<R, E, A>) => Effect<R & R1, E1 | E, A>;
/**
 * Repeats this effect while its error satisfies the specified effectful predicate.
 */
export declare function repeatWhileM_<R, E, A, R1, E1>(self: Effect<R, E, A>, f: (a: A) => Effect<R1, E1, boolean>, __trace?: string): Effect<R & R1, E | E1, A>;
/**
 * Repeats this effect while its error satisfies the specified predicate.
 *
 * @ets_data_first repeatWhile_
 */
export declare function repeatWhile<A>(f: (a: A) => boolean, __trace?: string): <R, E>(self: Effect<R, E, A>) => Effect<R, E, A>;
/**
 * Repeats this effect while its error satisfies the specified predicate.
 */
export declare function repeatWhile_<R, E, A>(self: Effect<R, E, A>, f: (a: A) => boolean, __trace?: string): Effect<R, E, A>;
//# sourceMappingURL=repeatWhile.d.ts.map