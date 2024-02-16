import type { Effect } from "./effect.js";
/**
 * Swaps the error/value parameters, applies the function `f` and flips the parameters back
 *
 * @ets_data_first flipWith_
 */
export declare function flipWith<R, E, A, R2, E2, A2>(f: (self: Effect<R, A, E>) => Effect<R2, A2, E2>, __trace?: string): (self: Effect<R, E, A>) => Effect<R2, E2, A2>;
/**
 * Swaps the error/value parameters, applies the function `f` and flips the parameters back
 */
export declare function flipWith_<R, E, A, R2, E2, A2>(self: Effect<R, E, A>, f: (self: Effect<R, A, E>) => Effect<R2, A2, E2>, __trace?: string): Effect<R2, E2, A2>;
//# sourceMappingURL=flipWith.d.ts.map