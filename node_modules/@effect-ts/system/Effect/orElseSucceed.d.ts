import type { Effect } from "./effect.js";
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise succeeds with the specified value.
 *
 * @ets_data_first orElseSucceed_
 */
export declare function orElseSucceed<A2>(a: A2, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A2 | A>;
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise succeeds with the specified value.
 */
export declare function orElseSucceed_<R, E, A, A2>(self: Effect<R, E, A>, a: A2, __trace?: string): Effect<R, E, A | A2>;
//# sourceMappingURL=orElseSucceed.d.ts.map