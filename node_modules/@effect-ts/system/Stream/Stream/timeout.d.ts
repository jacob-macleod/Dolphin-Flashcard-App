import type * as CL from "../../Clock/index.js";
import { Stream } from "./definitions.js";
/**
 * Ends the stream if it does not produce a value after d duration.
 */
export declare function timeout_<R, E, O>(self: Stream<R, E, O>, d: number): Stream<R & CL.HasClock, E, O>;
/**
 * Ends the stream if it does not produce a value after d duration.
 */
export declare function timeout(d: number): <R, E, O>(self: Stream<R, E, O>) => Stream<R & CL.HasClock, E, O>;
//# sourceMappingURL=timeout.d.ts.map