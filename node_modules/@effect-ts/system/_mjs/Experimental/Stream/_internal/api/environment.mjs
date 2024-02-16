// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as FromEffect from "./fromEffect.mjs";
/**
 * Accesses the whole environment of the stream.
 */

export function environment() {
  return FromEffect.fromEffect(T.environment());
}
//# sourceMappingURL=environment.mjs.map