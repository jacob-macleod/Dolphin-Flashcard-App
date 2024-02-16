import * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Interrupts the evaluation of this stream when the provided IO completes. The given
 * IO will be forked as part of this stream, and its success will be discarded. This
 * combinator will also interrupt any in-progress element being pulled from upstream.
 *
 * If the IO completes with a failure before the stream completes, the returned stream
 * will emit that failure.
 */
export declare function interruptWhen_<R, R1, E, E1, O, X>(self: Stream<R, E, O>, io: T.Effect<R1, E1, X>): Stream<R1 & R, E | E1, O>;
/**
 * Interrupts the evaluation of this stream when the provided IO completes. The given
 * IO will be forked as part of this stream, and its success will be discarded. This
 * combinator will also interrupt any in-progress element being pulled from upstream.
 *
 * If the IO completes with a failure before the stream completes, the returned stream
 * will emit that failure.
 */
export declare function interruptWhen<R1, E1, X>(io: T.Effect<R1, E1, X>): <R, E, O>(self: Stream<R, E, O>) => Stream<R1 & R, E1 | E, O>;
//# sourceMappingURL=interruptWhen.d.ts.map