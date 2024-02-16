import * as CS from "../../../../Cause/index.js";
import type * as CL from "../../../../Clock/index.js";
import type * as C from "../core.js";
/**
 * Fails the stream with given cause if it does not produce a value after d duration.
 */
export declare function timeoutFailCause_<R, E, E1, A>(self: C.Stream<R, E, A>, cause: CS.Cause<E1>, d: number): C.Stream<R & CL.HasClock, E | E1, A>;
/**
 * Fails the stream with given cause if it does not produce a value after d duration.
 *
 * @ets_data_first timeoutFailCause_
 */
export declare function timeoutFailCause<E1>(cause: CS.Cause<E1>, d: number): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R & CL.HasClock, E1 | E, A>;
//# sourceMappingURL=timeoutFailCause.d.ts.map