// ets_tracing: off
import * as T from "../_internal/effect.mjs";
import { fromEffect } from "./fromEffect.mjs";
/**
 * Accesses the whole environment of the stream.
 */

export function environment() {
  return fromEffect(T.environment());
}
//# sourceMappingURL=environment.mjs.map