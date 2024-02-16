import type { Effect } from "./effect.js";
/**
 * Repeats this effect the specified number of times.
 *
 * @ets_data_first repeatN_
 */
export declare function repeatN(n: number, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>;
/**
 * Repeats this effect the specified number of times.
 */
export declare function repeatN_<R, E, A>(self: Effect<R, E, A>, n: number, __trace?: string): Effect<R, E, A>;
//# sourceMappingURL=repeatN.d.ts.map