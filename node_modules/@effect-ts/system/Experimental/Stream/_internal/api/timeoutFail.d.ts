import type * as CL from "../../../../Clock/index.js";
import type * as C from "../core.js";
/**
 * Fails the stream with given error if it does not produce a value after d duration.
 */
export declare function timeoutFail_<R, E, E1, A>(self: C.Stream<R, E, A>, e: E1, d: number): C.Stream<R & CL.HasClock, E | E1, A>;
/**
 * Fails the stream with given error if it does not produce a value after d duration.
 *
 * @ets_data_first timeoutFail_
 */
export declare function timeoutFail<E1>(e: E1, d: number): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R & CL.HasClock, E1 | E, A>;
//# sourceMappingURL=timeoutFail.d.ts.map