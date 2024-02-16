import type { Effect } from "./effect.js";
/**
 * The moral equivalent of `if (!p) exp`
 *
 * @ets_data_first unless_
 */
export declare function unless(b: () => boolean, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, void>;
/**
 * The moral equivalent of `if (!p) exp`
 */
export declare function unless_<R, E, A>(self: Effect<R, E, A>, b: () => boolean, __trace?: string): Effect<R, E, void>;
/**
 * The moral equivalent of `if (!p) exp` when `p` has side-effects
 *
 * @ets_data_first unlessM_
 */
export declare function unlessM<R2, E2>(b: Effect<R2, E2, boolean>, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R2 & R, E2 | E, void>;
/**
 * The moral equivalent of `if (!p) exp` when `p` has side-effects
 */
export declare function unlessM_<R2, E2, R, E, A>(self: Effect<R, E, A>, b: Effect<R2, E2, boolean>, __trace?: string): Effect<R2 & R, E2 | E, void>;
//# sourceMappingURL=unless.d.ts.map