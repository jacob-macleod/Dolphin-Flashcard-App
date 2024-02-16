// ets_tracing: off
import { map_ as mapCause } from "../Cause/index.mjs";
import * as O from "../Option/index.mjs";
import { foldCauseM_, halt, succeed } from "./core.mjs";
import { fail } from "./fail.mjs";
/**
 * Unwraps the optional success of this effect, but can fail with an None value.
 */

export function get(self, __trace) {
  return foldCauseM_(self, x => halt(mapCause(x, O.some)), O.fold(() => fail(O.none), succeed), __trace);
}
//# sourceMappingURL=get.mjs.map