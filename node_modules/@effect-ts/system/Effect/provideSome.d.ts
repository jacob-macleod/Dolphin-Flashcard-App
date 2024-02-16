import type { Effect } from "./effect.js";
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0`.
 */
export declare function provideSome_<R0, R, E, A>(effect: Effect<R, E, A>, f: (r0: R0) => R, __trace?: string): Effect<R0, E, A>;
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0`.
 *
 * @ets_data_first provideSome_
 */
export declare function provideSome<R0, R>(f: (r0: R0) => R, __trace?: string): <E, A>(effect: Effect<R, E, A>) => Effect<R0, E, A>;
//# sourceMappingURL=provideSome.d.ts.map