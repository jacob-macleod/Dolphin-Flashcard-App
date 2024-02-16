import type { Cause } from "../Cause/index.js";
import type { Effect, RIO } from "./effect.js";
/**
 * Runs the specified effect if this effect is terminated, either because of
 * a defect or because of interruption.
 */
export declare function onTermination_<R1, R, E, A, X>(self: Effect<R, E, A>, cleanup: (_: Cause<never>) => RIO<R1, X>, __trace?: string): Effect<R & R1, E, A>;
/**
 * Runs the specified effect if this effect is terminated, either because of
 * a defect or because of interruption.
 *
 * @ets_data_first onTermination_
 */
export declare function onTermination<R1, R, E, A, X>(cleanup: (_: Cause<never>) => RIO<R1, X>, __trace?: string): (self: Effect<R, E, A>) => Effect<R & R1, E, A>;
//# sourceMappingURL=onTermination.d.ts.map