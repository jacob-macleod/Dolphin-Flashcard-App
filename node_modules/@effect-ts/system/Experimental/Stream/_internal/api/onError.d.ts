import type * as CS from "../../../../Cause/index.js";
import * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Runs the specified effect if this stream fails, providing the error to the effect if it exists.
 *
 * Note: Unlike `Effect.onError`, there is no guarantee that the provided effect will not be interrupted.
 */
export declare function onError_<R, R1, E, A>(self: C.Stream<R, E, A>, cleanup: (c: CS.Cause<E>) => T.Effect<R1, never, any>): C.Stream<R & R1, E, A>;
/**
 * Runs the specified effect if this stream fails, providing the error to the effect if it exists.
 *
 * Note: Unlike `Effect.onError`, there is no guarantee that the provided effect will not be interrupted.
 *
 * @ets_data_first onError_
 */
export declare function onError<R1, E>(cleanup: (c: CS.Cause<E>) => T.Effect<R1, never, any>): <R, A>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E, A>;
//# sourceMappingURL=onError.d.ts.map