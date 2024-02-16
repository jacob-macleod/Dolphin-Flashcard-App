import type * as O from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * Recovers from some or all of the defects with provided partial function.
 *
 * '''WARNING''': There is no sensible way to recover from defects. This
 * method should be used only at the boundary between Effect and an external
 * system, to transmit information on a defect for diagnostic or explanatory
 * purposes.
 */
export declare function catchSomeDefect_<R2, E2, A2, R, E, A>(fa: Effect<R2, E2, A2>, f: (_: unknown) => O.Option<Effect<R, E, A>>, __trace?: string): Effect<R2 & R, E2 | E, A2 | A>;
/**
 * Recovers from some or all of the defects with provided partial function.
 *
 * '''WARNING''': There is no sensible way to recover from defects. This
 * method should be used only at the boundary between Effect and an external
 * system, to transmit information on a defect for diagnostic or explanatory
 * purposes.
 *
 * @dataFist catchSomeDefect_
 */
export declare function catchSomeDefect<R, E, A>(f: (_: unknown) => O.Option<Effect<R, E, A>>, __trace?: string): <R2, E2, A2>(effect: Effect<R2, E2, A2>) => Effect<R2 & R, E | E2, A | A2>;
//# sourceMappingURL=catchSomeDefect.d.ts.map