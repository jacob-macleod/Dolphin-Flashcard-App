import type { Effect } from "./effect.js";
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0` and combining it automatically using spread.
 *
 * @ets_data_first provide_
 */
export declare function provide<R>(r: R, __trace?: string): <E, A, R0>(next: Effect<R & R0, E, A>) => Effect<R0, E, A>;
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0` and combining it automatically using spread.
 */
export declare function provide_<E, A, R0, R>(next: Effect<R & R0, E, A>, r: R, __trace?: string): Effect<R0, E, A>;
//# sourceMappingURL=provide.d.ts.map