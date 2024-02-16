// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as MapEffect from "./mapEffect.mjs";
/**
 * Flattens `Exit` values. `Exit.Failure` values translate to stream failures
 * while `Exit.Success` values translate to stream elements.
 */

export function flattenExit(self) {
  return MapEffect.mapEffect_(self, a => T.done(a));
}
//# sourceMappingURL=flattenExit.mjs.map