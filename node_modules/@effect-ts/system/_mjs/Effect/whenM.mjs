// ets_tracing: off
import { asUnit } from "./asUnit.mjs";
import { chain_, unit } from "./core.mjs";
/**
 * The moral equivalent of `if (p) exp` when `p` has side-effects
 */

export function whenM_(self, predicate, __trace) {
  return chain_(predicate, a => a ? asUnit(self, __trace) : unit);
}
/**
 * The moral equivalent of `if (p) exp` when `p` has side-effects
 *
 * @ets_data_first whenM_
 */

export function whenM(predicate, __trace) {
  return self => whenM_(self, predicate, __trace);
}
//# sourceMappingURL=whenM.mjs.map