import type * as CS from "../Cause/index.js";
import type * as CL from "../Clock/index.js";
import type { Effect } from "./effect.js";
/**
 * The same as `timeout`, but instead of producing a `None` in the event
 * of timeout, it will produce the specified failure.
 */
export declare function timeoutFailCause_<R, E, E1, A>(self: Effect<R, E, A>, cause: () => CS.Cause<E1>, d: number, __trace?: string): Effect<R & CL.HasClock, E | E1, A>;
/**
 * The same as `timeout`, but instead of producing a `None` in the event
 * of timeout, it will produce the specified failure.
 *
 * @ets_data_first timeoutFailCause_
 */
export declare function timeoutFailCause<E1>(cause: () => CS.Cause<E1>, d: number, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R & CL.HasClock, E1 | E, A>;
//# sourceMappingURL=timeoutFailCause.d.ts.map