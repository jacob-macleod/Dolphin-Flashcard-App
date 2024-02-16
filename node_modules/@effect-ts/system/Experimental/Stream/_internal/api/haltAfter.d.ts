import * as CL from "../../../../Clock/index.js";
import type * as C from "../core.js";
/**
 * Specialized version of haltWhen which halts the evaluation of this stream
 * after the given duration.
 *
 * An element in the process of being pulled will not be interrupted when the
 * given duration completes. See `interruptAfter` for this behavior.
 */
export declare function halfAfter_<R, E, A>(self: C.Stream<R, E, A>, duration: number): C.Stream<CL.HasClock & R, E, A>;
/**
 * Specialized version of haltWhen which halts the evaluation of this stream
 * after the given duration.
 *
 * An element in the process of being pulled will not be interrupted when the
 * given duration completes. See `interruptAfter` for this behavior.
 *
 * @ets_data_first haltAfter_
 */
export declare function halfAfter(duration: number): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<CL.HasClock & R, E, A>;
//# sourceMappingURL=haltAfter.d.ts.map