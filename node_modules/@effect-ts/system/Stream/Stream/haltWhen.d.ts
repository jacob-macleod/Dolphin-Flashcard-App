import * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Halts the evaluation of this stream when the provided IO completes. The given IO
 * will be forked as part of the returned stream, and its success will be discarded.
 *
 * An element in the process of being pulled will not be interrupted when the IO
 * completes. See `interruptWhen` for this behavior.
 *
 * If the IO completes with a failure, the stream will emit that failure.
 */
export declare function haltWhen_<R, R1, E, E1, O, X>(self: Stream<R, E, O>, io: T.Effect<R1, E1, X>): Stream<R1 & R, E | E1, O>;
/**
 * Halts the evaluation of this stream when the provided IO completes. The given IO
 * will be forked as part of the returned stream, and its success will be discarded.
 *
 * An element in the process of being pulled will not be interrupted when the IO
 * completes. See `interruptWhen` for this behavior.
 *
 * If the IO completes with a failure, the stream will emit that failure.
 */
export declare function haltWhen<R1, E1, X>(io: T.Effect<R1, E1, X>): <R, E, O>(self: Stream<R, E, O>) => Stream<R1 & R, E1 | E, O>;
//# sourceMappingURL=haltWhen.d.ts.map