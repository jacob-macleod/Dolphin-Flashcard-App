import * as ContramapChunks from "./contramapChunks.mjs";
import * as Map from "./map.mjs";
/**
 * Transforms both input chunks and result of this sink using the provided functions.
 */

export function dimapChunks_(self, f, g) {
  return Map.map_(ContramapChunks.contramapChunks_(self, f), g);
}
/**
 * Transforms both input chunks and result of this sink using the provided functions.
 *
 * @ets_data_first dimapChunks_
 */

export function dimapChunks(f, g) {
  return self => dimapChunks_(self, f, g);
}
//# sourceMappingURL=dimapChunks.mjs.map