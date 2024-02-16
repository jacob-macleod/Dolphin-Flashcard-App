// ets_tracing: off
import * as O from "../../Option/index.mjs";
import { map_ } from "./map.mjs";
/**
 * Extracts the optional value, or returns the given 'default'.
 */

export function someOrElse_(self, default_) {
  return map_(self, O.getOrElse(default_));
}
/**
 * Extracts the optional value, or returns the given 'default'.
 */

export function someOrElse(default_) {
  return self => someOrElse_(self, default_);
}
//# sourceMappingURL=someOrElse.mjs.map