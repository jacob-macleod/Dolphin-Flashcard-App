import * as Map from "./map.mjs";
/**
 * Replaces this sink's result with the provided value.
 */

export function as_(self, z) {
  return Map.map_(self, _ => z);
}
/**
 * Replaces this sink's result with the provided value.
 *
 * @ets_data_first as_
 */

export function as(z) {
  return self => as_(self, z);
}
//# sourceMappingURL=as.mjs.map