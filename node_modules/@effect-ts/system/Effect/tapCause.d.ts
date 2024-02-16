import type { Cause } from "../Cause/cause.js";
import type { Effect } from "./effect.js";
/**
 * Returns an effect that effectually "peeks" at the cause of the failure of
 * this effect.
 *
 * @ets_data_first tapCause_
 */
export declare function tapCause<R, E, E2, X>(f: (e: Cause<E2>) => Effect<R, E, X>, __trace?: string): <R2, A2>(effect: Effect<R2, E2, A2>) => Effect<R2 & R, E | E2, A2>;
/**
 * Returns an effect that effectually "peeks" at the cause of the failure of
 * this effect.
 */
export declare function tapCause_<R2, A2, R, E, E2, X>(effect: Effect<R2, E2, A2>, f: (e: Cause<E2>) => Effect<R, E, X>, __trace?: string): Effect<R2 & R, E | E2, A2>;
//# sourceMappingURL=tapCause.d.ts.map