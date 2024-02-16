import type * as P from "../../../../Promise/index.js";
import * as C from "../core.js";
/**
 * Interrupts the evaluation of this stream when the provided promise resolves. This
 * combinator will also interrupt any in-progress element being pulled from upstream.
 *
 * If the promise completes with a failure, the stream will emit that failure.
 */
export declare function interruptWhenP_<R, E, A, E1>(self: C.Stream<R, E, A>, p: P.Promise<E1, never>): C.Stream<R, E | E1, A>;
/**
 * Interrupts the evaluation of this stream when the provided promise resolves. This
 * combinator will also interrupt any in-progress element being pulled from upstream.
 *
 * If the promise completes with a failure, the stream will emit that failure.
 *
 * @ets_data_first interruptWhenP_
 */
export declare function interruptWhenP<E1>(p: P.Promise<E1, never>): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R, E1 | E, A>;
//# sourceMappingURL=interruptWhenP.d.ts.map