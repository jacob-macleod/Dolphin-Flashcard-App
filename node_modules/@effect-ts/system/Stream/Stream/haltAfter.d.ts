import * as CL from "../../Clock/index.js";
import type * as H from "../../Has/index.js";
import type { Stream } from "./definitions.js";
/**
 * Specialized version of haltWhen which halts the evaluation of this stream
 * after the given duration.
 *
 * An element in the process of being pulled will not be interrupted when the
 * given duration completes. See `interruptAfter` for this behavior.
 */
export declare function haltAfter_<R, E, O>(self: Stream<R, E, O>, duration: number): Stream<H.Has<CL.Clock> & R, E, O>;
/**
 * Specialized version of haltWhen which halts the evaluation of this stream
 * after the given duration.
 *
 * An element in the process of being pulled will not be interrupted when the
 * given duration completes. See `interruptAfter` for this behavior.
 */
export declare function haltAfter(duration: number): <R, E, O>(self: Stream<R, E, O>) => Stream<H.Has<CL.Clock> & R, E, O>;
//# sourceMappingURL=haltAfter.d.ts.map