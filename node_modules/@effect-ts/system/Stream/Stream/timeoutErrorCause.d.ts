import type * as C from "../../Cause/index.js";
import type * as CL from "../../Clock/index.js";
import { Stream } from "./definitions.js";
/**
 * Halts the stream with given cause if it does not produce a value after d duration.
 */
export declare function timeoutErrorCause<E1>(cause: C.Cause<E1>): (d: number) => <R, E, O>(self: Stream<R, E, O>) => Stream<R & CL.HasClock, E1 | E, O>;
//# sourceMappingURL=timeoutErrorCause.d.ts.map