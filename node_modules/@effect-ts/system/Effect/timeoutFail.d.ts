import type { Clock } from "../Clock/index.js";
import type { Has } from "../Has/index.js";
import type { Effect } from "./effect.js";
/**
 * The same as `timeout`, but instead of producing a `None` in the event
 * of timeout, it will produce the specified error.
 *
 * @ets_data_first timeoutFail_
 */
export declare function timeoutFail<E2>(d: number, e: () => E2, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R & Has<Clock>, E2 | E, A>;
/**
 * The same as `timeout`, but instead of producing a `None` in the event
 * of timeout, it will produce the specified error.
 */
export declare function timeoutFail_<R, E, E2, A>(self: Effect<R, E, A>, d: number, e: () => E2, __trace?: string): Effect<R & Has<Clock>, E | E2, A>;
//# sourceMappingURL=timeoutFail.d.ts.map