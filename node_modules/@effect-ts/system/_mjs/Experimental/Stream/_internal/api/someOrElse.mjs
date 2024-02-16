// ets_tracing: off
import * as O from "../../../../Option/index.mjs";
import * as Map from "./map.mjs";
/**
 * Extracts the optional value, or returns the given 'default'.
 */

export function someOrElse_(self, default_) {
  return Map.map_(self, O.getOrElseS(() => default_));
}
/**
 * Extracts the optional value, or returns the given 'default'.
 *
 * @ets_data_first someOrElse_
 */

export function someOrElse(default_) {
  return self => someOrElse_(self, default_);
}
//# sourceMappingURL=someOrElse.mjs.map