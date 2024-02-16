import type { Effect } from "./effect.js";
/**
 * Recovers from all defects with provided function.
 *
 * '''WARNING''': There is no sensible way to recover from defects. This
 * method should be used only at the boundary between Effect and an external
 * system, to transmit information on a defect for diagnostic or explanatory
 * purposes.
 */
export declare function catchAllDefect_<R2, E2, A2, R, E, A>(fa: Effect<R2, E2, A2>, f: (_: unknown) => Effect<R, E, A>, __trace?: string): Effect<R2 & R, E2 | E, A2 | A>;
/**
 * Recovers from all defects with provided function.
 *
 * '''WARNING''': There is no sensible way to recover from defects. This
 * method should be used only at the boundary between Effect and an external
 * system, to transmit information on a defect for diagnostic or explanatory
 * purposes.
 *
 * @ets_data_first catchAllDefect_
 */
export declare function catchAllDefect<R, E, A>(f: (_: unknown) => Effect<R, E, A>, __trace?: string): <R2, E2, A2>(effect: Effect<R2, E2, A2>) => Effect<R2 & R, E | E2, A | A2>;
//# sourceMappingURL=catchAllDefect.d.ts.map