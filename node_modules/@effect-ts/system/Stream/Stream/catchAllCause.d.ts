import * as C from "../../Cause/index.js";
import { Stream } from "./definitions.js";
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails. Allows recovery from all causes of failure, including interruption if the
 * stream is uninterruptible.
 */
export declare function catchAllCause_<R, E, R1, E2, O, O1>(self: Stream<R, E, O>, f: (e: C.Cause<E>) => Stream<R1, E2, O1>): Stream<R & R1, E2, O1 | O>;
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails. Allows recovery from all causes of failure, including interruption if the
 * stream is uninterruptible.
 */
export declare function catchAllCause<R, E, R1, E2, O, O1>(f: (e: C.Cause<E>) => Stream<R1, E2, O1>): (self: Stream<R, E, O>) => Stream<R & R1, E2, O | O1>;
//# sourceMappingURL=catchAllCause.d.ts.map