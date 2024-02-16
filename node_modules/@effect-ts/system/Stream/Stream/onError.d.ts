import type * as C from "../../Cause/index.js";
import * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Runs the specified effect if this stream fails, providing the error to the effect if it exists.
 *
 * Note: Unlike `Effect.onError`, there is no guarantee that the provided effect will not be interrupted.
 */
export declare function onError_<R, R1, E, O, X>(self: Stream<R, E, O>, cleanup: (cause: C.Cause<E>) => T.Effect<R1, never, X>): Stream<R & R1, E, O>;
/**
 * Runs the specified effect if this stream fails, providing the error to the effect if it exists.
 *
 * Note: Unlike `Effect.onError`, there is no guarantee that the provided effect will not be interrupted.
 */
export declare function onError<R, R1, E, O, X>(cleanup: (cause: C.Cause<E>) => T.Effect<R1, never, X>): (self: Stream<R, E, O>) => Stream<R & R1, E, O>;
//# sourceMappingURL=onError.d.ts.map