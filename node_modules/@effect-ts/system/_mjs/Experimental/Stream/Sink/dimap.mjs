// ets_tracing: off
import * as Contramap from "./contramap.mjs";
import * as Map from "./map.mjs";
/**
 * Transforms both inputs and result of this sink using the provided functions.
 */

export function dimap_(self, f, g) {
  return Map.map_(Contramap.contramap_(self, f), g);
}
/**
 * Transforms both inputs and result of this sink using the provided functions.
 *
 * @ets_data_first dimap_
 */

export function dimap(f, g) {
  return self => dimap_(self, f, g);
}
//# sourceMappingURL=dimap.mjs.map