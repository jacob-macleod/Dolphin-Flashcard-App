// ets_tracing: off
import { constant, pipe } from "../Function/index.mjs";
import * as O from "../Option/index.mjs";
import { chain_, succeed } from "./core.mjs";
/**
 * Extracts the optional value, or executes the effect 'orElse'.
 *
 * @ets_data_first someOrElseM_
 */

export function someOrElseM(orElse, __trace) {
  return self => someOrElseM_(self, orElse, __trace);
}
/**
 * Extracts the optional value, or executes the effect 'orElse'.
 */

export function someOrElseM_(self, orElse, __trace) {
  return chain_(self, x => O.getOrElse_(O.map_(x, succeed), constant(orElse)), __trace);
}
//# sourceMappingURL=someOrElseM.mjs.map