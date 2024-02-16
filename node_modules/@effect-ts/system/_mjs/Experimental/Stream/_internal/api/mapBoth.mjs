import * as Map from "./map.mjs";
import * as MapError from "./mapError.mjs";
/**
 * Returns a stream whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */

export function mapBoth_(self, f, g) {
  return Map.map_(MapError.mapError_(self, f), g);
}
/**
 * Returns a stream whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @ets_data_first mapBoth_
 */

export function mapBoth(f, g) {
  return self => mapBoth_(self, f, g);
}
//# sourceMappingURL=mapBoth.mjs.map