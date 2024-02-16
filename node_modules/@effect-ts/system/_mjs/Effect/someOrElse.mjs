// ets_tracing: off
import * as O from "../Option/index.mjs";
import { map_ } from "./map.mjs";
/**
 * Extracts the optional value, or returns the given 'orElse'.
 */

export function someOrElse(orElse, __trace) {
  return self => someOrElse_(self, orElse, __trace);
}
/**
 * Extracts the optional value, or returns the given 'orElse'.
 */

export function someOrElse_(self, orElse, __trace) {
  return map_(self, O.getOrElse(orElse), __trace);
}
//# sourceMappingURL=someOrElse.mjs.map