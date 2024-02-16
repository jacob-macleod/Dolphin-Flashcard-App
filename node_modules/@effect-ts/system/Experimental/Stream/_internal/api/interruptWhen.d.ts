import type * as T from "../../../../Effect/index.js";
import * as C from "../core.js";
/**
 * Interrupts the evaluation of this stream when the provided IO completes. The given
 * IO will be forked as part of this stream, and its success will be discarded. This
 * combinator will also interrupt any in-progress element being pulled from upstream.
 *
 * If the IO completes with a failure before the stream completes, the returned stream
 * will emit that failure.
 */
export declare function interruptWhen_<R, R1, E, E1, A, Z>(self: C.Stream<R, E, A>, io: T.Effect<R1, E1, Z>): C.Stream<R1 & R, E | E1, A>;
/**
 * Interrupts the evaluation of this stream when the provided IO completes. The given
 * IO will be forked as part of this stream, and its success will be discarded. This
 * combinator will also interrupt any in-progress element being pulled from upstream.
 *
 * If the IO completes with a failure before the stream completes, the returned stream
 * will emit that failure.
 *
 * @ets_data_first interruptWhen_
 */
export declare function interruptWhen<R1, E1, Z>(io: T.Effect<R1, E1, Z>): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R1 & R, E1 | E, A>;
//# sourceMappingURL=interruptWhen.d.ts.map