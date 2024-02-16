import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import { catchAllCause_ } from "./catchAllCause.mjs";
import { fromEffect } from "./fromEffect.mjs";
/**
 * Runs the specified effect if this stream fails, providing the error to the effect if it exists.
 *
 * Note: Unlike `Effect.onError`, there is no guarantee that the provided effect will not be interrupted.
 */

export function onError_(self, cleanup) {
  return catchAllCause_(self, cause => fromEffect(T.zipRight_(cleanup(cause), T.halt(cause))));
}
/**
 * Runs the specified effect if this stream fails, providing the error to the effect if it exists.
 *
 * Note: Unlike `Effect.onError`, there is no guarantee that the provided effect will not be interrupted.
 */

export function onError(cleanup) {
  return self => onError_(self, cleanup);
}
//# sourceMappingURL=onError.mjs.map