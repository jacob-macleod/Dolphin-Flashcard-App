// ets_tracing: off
import { identity } from "../Function/index.mjs";
import { fold } from "../Option/index.mjs";
import { mapError_ } from "./mapError.mjs";
/**
 * Unwraps the optional error, defaulting to the provided value.
 *
 * @ets_data_first flattenErrorOption_
 */

export function flattenErrorOption(def, __trace) {
  return self => flattenErrorOption_(self, def, __trace);
}
/**
 * Unwraps the optional error, defaulting to the provided value.
 */

export function flattenErrorOption_(self, def, __trace) {
  return mapError_(self, fold(def, identity), __trace);
}
//# sourceMappingURL=flattenErrorOption.mjs.map