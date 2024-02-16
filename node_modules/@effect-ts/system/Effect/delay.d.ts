import type { HasClock } from "../Clock/index.js";
import type { Effect } from "./effect.js";
/**
 * Delay the effect of n milliseconds
 *
 * @ets_data_first delay_
 */
export declare function delay(ms: number, __trace?: string): <R, E, A>(effect: Effect<R, E, A>) => Effect<R & HasClock, E, A>;
/**
 * Delay the effect of ms milliseconds
 */
export declare function delay_<R, E, A>(effect: Effect<R, E, A>, ms: number, __trace?: string): Effect<R & HasClock, E, A>;
//# sourceMappingURL=delay.d.ts.map