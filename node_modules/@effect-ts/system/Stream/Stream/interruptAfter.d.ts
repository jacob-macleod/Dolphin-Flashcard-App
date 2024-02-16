import * as CL from "../../Clock/index.js";
import type * as H from "../../Has/index.js";
import type { Stream } from "./definitions.js";
/**
 * Specialized version of interruptWhen which interrupts the evaluation of this stream
 * after the given duration.
 */
export declare function interruptAfter_<R, E, O>(self: Stream<R, E, O>, duration: number): Stream<R & H.Has<CL.Clock>, E, O>;
/**
 * Specialized version of interruptWhen which interrupts the evaluation of this stream
 * after the given duration.
 */
export declare function interruptAfter(duration: number): <R, E, O>(self: Stream<R, E, O>) => Stream<R & H.Has<CL.Clock>, E, O>;
//# sourceMappingURL=interruptAfter.d.ts.map