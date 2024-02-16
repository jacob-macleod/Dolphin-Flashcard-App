import * as T from "../_internal/effect.mjs";
import { mapM_ } from "./mapM.mjs";
/**
 * Flattens `Exit` values. `Exit.Failure` values translate to stream failures
 * while `Exit.Success` values translate to stream elements.
 */

export function flattenExit(self) {
  return mapM_(self, o => T.done(o));
}
//# sourceMappingURL=flattenExit.mjs.map