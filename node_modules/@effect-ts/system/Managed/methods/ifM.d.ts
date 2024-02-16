import type { Managed } from "../managed.js";
/**
 * Conditional logic
 *
 * @ets_data_first ifM_
 */
export declare function ifM<R1, E1, A1, R2, E2, A2>(onTrue: () => Managed<R1, E1, A1>, onFalse: () => Managed<R2, E2, A2>, __trace?: string): <R, E>(b: Managed<R, E, boolean>) => Managed<R & R1 & R2, E1 | E2 | E, A1 | A2>;
/**
 * Conditional logic
 */
export declare function ifM_<R, E, R1, E1, A1, R2, E2, A2>(b: Managed<R, E, boolean>, onTrue: () => Managed<R1, E1, A1>, onFalse: () => Managed<R2, E2, A2>, __trace?: string): Managed<R & R1 & R2, E | E1 | E2, A1 | A2>;
/**
 * Conditional logic
 *
 * @ets_data_first if_
 */
declare function _if<R1, E1, A1, R2, E2, A2>(onTrue: () => Managed<R1, E1, A1>, onFalse: () => Managed<R2, E2, A2>): (b: boolean) => Managed<R1 & R2, E1 | E2, A1 | A2>;
/**
 * Conditional logic
 */
export declare function if_<R1, E1, A1, R2, E2, A2>(b: boolean, onTrue: () => Managed<R1, E1, A1>, onFalse: () => Managed<R2, E2, A2>, __trace?: string): Managed<R1 & R2, E1 | E2, A1 | A2>;
export { _if as if };
//# sourceMappingURL=ifM.d.ts.map