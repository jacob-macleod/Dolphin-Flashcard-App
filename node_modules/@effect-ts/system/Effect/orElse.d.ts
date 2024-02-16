import type { Effect } from "./effect.js";
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise executes the specified effect.
 */
export declare function orElse_<R, E, A, R2, E2, A2>(self: Effect<R, E, A>, that: () => Effect<R2, E2, A2>, __trace?: string): Effect<R & R2, E2, A | A2>;
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise executes the specified effect.
 *
 * @ets_data_first orElse_
 */
export declare function orElse<R2, E2, A2>(that: () => Effect<R2, E2, A2>, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R & R2, E2, A2 | A>;
//# sourceMappingURL=orElse.d.ts.map