import type { Managed } from "../managed.js";
/**
 * Recovers from errors by accepting one effect to execute for the case of an
 * error, and one effect to execute for the case of success.
 *
 * @ets_data_first foldM_
 */
export declare function foldM<R, E, A, R1, E1, B, R2, E2, C>(failure: (e: E) => Managed<R1, E1, B>, success: (a: A) => Managed<R2, E2, C>, __trace?: string): (self: Managed<R, E, A>) => Managed<R & R1 & R2, E1 | E2, B | C>;
/**
 * Recovers from errors by accepting one effect to execute for the case of an
 * error, and one effect to execute for the case of success.
 */
export declare function foldM_<R, E, A, R1, E1, B, R2, E2, C>(self: Managed<R, E, A>, failure: (e: E) => Managed<R1, E1, B>, success: (a: A) => Managed<R2, E2, C>, __trace?: string): Managed<R & R1 & R2, E1 | E2, B | C>;
//# sourceMappingURL=foldM.d.ts.map