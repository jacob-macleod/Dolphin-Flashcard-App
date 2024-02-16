import * as P from "../../../../Promise/index.js";
import * as C from "../core.js";
/**
 * Halts the evaluation of this stream when the provided promise resolves.
 *
 * If the promise completes with a failure, the stream will emit that failure.
 */
export declare function haltWhenP_<R, E, E1, A>(self: C.Stream<R, E, A>, p: P.Promise<E1, any>): C.Stream<R, E | E1, A>;
/**
 * Halts the evaluation of this stream when the provided promise resolves.
 *
 * If the promise completes with a failure, the stream will emit that failure.
 *
 * @ets_data_first haltWhenP_
 */
export declare function haltWhenP<E1>(p: P.Promise<E1, any>): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R, E1 | E, A>;
//# sourceMappingURL=haltWhenP.d.ts.map