import type { Effect } from "./effect.js";
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise fails with the specified error.
 *
 * @ets_data_first orElseFail_
 */
export declare function orElseFail<E2>(e: E2, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E2, A>;
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise fails with the specified error.
 */
export declare function orElseFail_<R, E, A, E2>(self: Effect<R, E, A>, e: E2, __trace?: string): Effect<R, E2, A>;
//# sourceMappingURL=orElseFail.d.ts.map