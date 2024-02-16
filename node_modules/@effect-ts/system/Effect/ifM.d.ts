import type { Effect } from "./effect.js";
/**
 * Run conditionally onTrue or onFalse
 *
 * @ets_data_first ifM_
 */
export declare function ifM<R1, E1, A1, R2, E2, A2>(onTrue: () => Effect<R1, E1, A1>, onFalse: () => Effect<R2, E2, A2>, __trace?: string): <R, E>(b: Effect<R, E, boolean>) => Effect<R & R1 & R2, E1 | E2 | E, A1 | A2>;
/**
 * Run conditionally onTrue or onFalse
 */
export declare function ifM_<R, E, R1, E1, A1, R2, E2, A2>(b: Effect<R, E, boolean>, onTrue: () => Effect<R1, E1, A1>, onFalse: () => Effect<R2, E2, A2>, __trace?: string): Effect<R & R1 & R2, E | E1 | E2, A1 | A2>;
/**
 * Run conditionally onTrue or onFalse
 *
 * @ets_data_first if_
 */
declare function _if<R1, E1, A1, R2, E2, A2>(onTrue: () => Effect<R1, E1, A1>, onFalse: () => Effect<R2, E2, A2>, __trace?: string): (b: boolean) => Effect<R1 & R2, E1 | E2, A1 | A2>;
/**
 * Run conditionally onTrue or onFalse
 */
export declare function if_<R1, E1, A1, R2, E2, A2>(b: boolean, onTrue: () => Effect<R1, E1, A1>, onFalse: () => Effect<R2, E2, A2>, __trace?: string): Effect<R1 & R2, E1 | E2, A1 | A2>;
export { _if as if };
//# sourceMappingURL=ifM.d.ts.map