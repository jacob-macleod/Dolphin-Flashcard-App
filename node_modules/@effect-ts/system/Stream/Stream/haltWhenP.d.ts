import * as P from "../../Promise/index.js";
import { Stream } from "./definitions.js";
/**
 * Halts the evaluation of this stream when the provided promise resolves.
 *
 * If the promise completes with a failure, the stream will emit that failure.
 */
export declare function haltWhenP_<R, E, E1, O>(self: Stream<R, E, O>, p: P.Promise<E1, never>): Stream<R, E | E1, O>;
/**
 * Halts the evaluation of this stream when the provided promise resolves.
 *
 * If the promise completes with a failure, the stream will emit that failure.
 */
export declare function haltWhenP<E1>(p: P.Promise<E1, never>): <R, E, O>(self: Stream<R, E, O>) => Stream<R, E1 | E, O>;
//# sourceMappingURL=haltWhenP.d.ts.map