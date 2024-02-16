import type { Cause } from "../Cause/cause.js";
import type { Effect } from "./effect.js";
/**
 * Recovers from all errors with provided cause.
 */
export declare function catchAllCause_<R2, E2, A2, R, E, A>(effect: Effect<R2, E2, A2>, f: (_: Cause<E2>) => Effect<R, E, A>, __trace?: string): Effect<R2 & R, E, A2 | A>;
/**
 * Recovers from all errors with provided cause.
 *
 * @ets_data_first catchAllCause_
 */
export declare function catchAllCause<R2, E2, A2, R, E, A>(f: (_: Cause<E2>) => Effect<R, E, A>, __trace?: string): (effect: Effect<R2, E2, A2>) => Effect<R2 & R, E, A2 | A>;
//# sourceMappingURL=catchAllCause.d.ts.map