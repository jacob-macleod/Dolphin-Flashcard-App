import * as T from "../../../../Effect/index.js";
import * as C from "../core.js";
/**
 * Halts the evaluation of this stream when the provided IO completes. The given IO
 * will be forked as part of the returned stream, and its success will be discarded.
 *
 * An element in the process of being pulled will not be interrupted when the IO
 * completes. See `interruptWhen` for this behavior.
 *
 * If the IO completes with a failure, the stream will emit that failure.
 */
export declare function haltWhen_<R, R1, E, E1, A>(self: C.Stream<R, E, A>, io: T.Effect<R1, E1, any>): C.Stream<R1 & R, E | E1, A>;
/**
 * Halts the evaluation of this stream when the provided IO completes. The given IO
 * will be forked as part of the returned stream, and its success will be discarded.
 *
 * An element in the process of being pulled will not be interrupted when the IO
 * completes. See `interruptWhen` for this behavior.
 *
 * If the IO completes with a failure, the stream will emit that failure.
 *
 * @ets_data_first haltWhen_
 */
export declare function haltWhen<R1, E1>(io: T.Effect<R1, E1, any>): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R1 & R, E1 | E, A>;
//# sourceMappingURL=haltWhen.d.ts.map