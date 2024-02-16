import type * as C from "../../Cause/index.js";
import * as O from "../../Option/index.js";
import type { Stream } from "./definitions.js";
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with some errors. Allows recovery from all causes of failure, including interruption if the
 * stream is uninterruptible.
 */
export declare function catchSomeCause_<R, R1, E, E1, O, O1>(self: Stream<R, E, O>, f: (c: C.Cause<E>) => O.Option<Stream<R1, E1, O1>>): Stream<R & R1, E | E1, O | O1>;
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with some errors. Allows recovery from all causes of failure, including interruption if the
 * stream is uninterruptible.
 */
export declare function catchSomeCause<R1, E, E1, O, O1>(f: (c: C.Cause<E>) => O.Option<Stream<R1, E1, O1>>): <R>(self: Stream<R, E, O>) => Stream<R & R1, E | E1, O | O1>;
//# sourceMappingURL=catchSomeCause.d.ts.map