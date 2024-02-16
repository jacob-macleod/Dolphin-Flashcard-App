import type { Effect } from "./effect.js";
/**
 * The moral equivalent of `if (p) exp` when `p` has side-effects
 */
export declare function whenM_<R1, E1, A, R, E>(self: Effect<R1, E1, A>, predicate: Effect<R, E, boolean>, __trace?: string): Effect<R & R1, E1 | E, void>;
/**
 * The moral equivalent of `if (p) exp` when `p` has side-effects
 *
 * @ets_data_first whenM_
 */
export declare function whenM<R, E>(predicate: Effect<R, E, boolean>, __trace?: string): <R1, E1, A>(self: Effect<R1, E1, A>) => Effect<R & R1, E | E1, void>;
//# sourceMappingURL=whenM.d.ts.map