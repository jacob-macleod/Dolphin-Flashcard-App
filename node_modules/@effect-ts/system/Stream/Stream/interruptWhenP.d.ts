import * as P from "../../Promise/index.js";
import { Stream } from "./definitions.js";
/**
 * Interrupts the evaluation of this stream when the provided promise resolves. This
 * combinator will also interrupt any in-progress element being pulled from upstream.
 *
 * If the promise completes with a failure, the stream will emit that failure.
 */
export declare function interruptWhenP_<R, E, E1, O>(self: Stream<R, E, O>, p: P.Promise<E1, never>): Stream<R, E | E1, O>;
/**
 * Interrupts the evaluation of this stream when the provided promise resolves. This
 * combinator will also interrupt any in-progress element being pulled from upstream.
 *
 * If the promise completes with a failure, the stream will emit that failure.
 */
export declare function interruptWhenP<E1>(p: P.Promise<E1, never>): <R, E, O>(self: Stream<R, E, O>) => Stream<R, E1 | E, O>;
//# sourceMappingURL=interruptWhenP.d.ts.map