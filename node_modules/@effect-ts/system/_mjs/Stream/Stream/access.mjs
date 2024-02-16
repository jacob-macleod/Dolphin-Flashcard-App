import { environment } from "./environment.mjs";
import { map_ } from "./map.mjs";
/**
 * Accesses the environment of the stream.
 */

export function access(f) {
  return map_(environment(), f);
}
//# sourceMappingURL=access.mjs.map