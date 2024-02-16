import * as Environment from "./environment.mjs";
import * as Map from "./map.mjs";
/**
 * Accesses the environment of the stream.
 */

export function access(f) {
  return Map.map_(Environment.environment(), f);
}
//# sourceMappingURL=access.mjs.map