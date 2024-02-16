// ets_tracing: off
import * as O from "../Option/index.mjs";
import { chain_, succeed, succeedWith } from "./core.mjs";
import { fail } from "./fail.mjs";
/**
 * Extracts the optional value, or fails with the given error 'e'.
 *
 * @ets_data_first someOrFail_
 */

export function someOrFail(orFail, __trace) {
  return self => someOrFail_(self, orFail);
}
/**
 * Extracts the optional value, or fails with the given error 'e'.
 */

export function someOrFail_(self, orFail, __trace) {
  return chain_(self, O.fold(() => chain_(succeedWith(orFail), fail), succeed), __trace);
}
//# sourceMappingURL=someOrFail.mjs.map