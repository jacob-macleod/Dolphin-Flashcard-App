import * as T from "../../../../Effect/index.mjs";
import * as CatchAllCause from "./catchAllCause.mjs";
import * as FromEffect from "./fromEffect.mjs";
/**
 * Runs the specified effect if this stream fails, providing the error to the effect if it exists.
 *
 * Note: Unlike `Effect.onError`, there is no guarantee that the provided effect will not be interrupted.
 */

export function onError_(self, cleanup) {
  return CatchAllCause.catchAllCause_(self, cause => FromEffect.fromEffect(T.zipRight_(cleanup(cause), T.halt(cause))));
}
/**
 * Runs the specified effect if this stream fails, providing the error to the effect if it exists.
 *
 * Note: Unlike `Effect.onError`, there is no guarantee that the provided effect will not be interrupted.
 *
 * @ets_data_first onError_
 */

export function onError(cleanup) {
  return self => onError_(self, cleanup);
}
//# sourceMappingURL=onError.mjs.map