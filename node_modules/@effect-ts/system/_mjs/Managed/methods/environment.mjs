// ets_tracing: off
import * as T from "../../Effect/environment.mjs";
import { fromEffect } from "../fromEffect.mjs";
/**
 * Accesses the whole environment of the effect.
 */

export function environment(__trace) {
  return fromEffect(T.environment(), __trace);
}
//# sourceMappingURL=environment.mjs.map