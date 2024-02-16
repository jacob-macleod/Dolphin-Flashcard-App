import * as CL from "../../../../Clock/index.js";
import type * as C from "../core.js";
/**
 * Specialized version of interruptWhen which interrupts the evaluation of this stream
 * after the given duration.
 */
export declare function interruptAfter_<R, E, A>(self: C.Stream<R, E, A>, duration: number): C.Stream<CL.HasClock & R, E, A>;
/**
 * Specialized version of interruptWhen which interrupts the evaluation of this stream
 * after the given duration.
 *
 * @ets_data_first interruptAfter_
 */
export declare function interruptAfter(duration: number): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<CL.HasClock & R, E, A>;
//# sourceMappingURL=interruptAfter.d.ts.map