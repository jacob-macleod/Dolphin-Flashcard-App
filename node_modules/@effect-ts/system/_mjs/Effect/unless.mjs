// ets_tracing: off
import { asUnit } from "./asUnit.mjs";
import { chain_, suspend, unit } from "./core.mjs";
/**
 * The moral equivalent of `if (!p) exp`
 *
 * @ets_data_first unless_
 */

export function unless(b, __trace) {
  return self => suspend(() => b() ? unit : asUnit(self), __trace);
}
/**
 * The moral equivalent of `if (!p) exp`
 */

export function unless_(self, b, __trace) {
  return suspend(() => b() ? unit : asUnit(self), __trace);
}
/**
 * The moral equivalent of `if (!p) exp` when `p` has side-effects
 *
 * @ets_data_first unlessM_
 */

export function unlessM(b, __trace) {
  return self => unlessM_(self, b, __trace);
}
/**
 * The moral equivalent of `if (!p) exp` when `p` has side-effects
 */

export function unlessM_(self, b, __trace) {
  return chain_(b, _ => _ ? unit : asUnit(self), __trace);
}
//# sourceMappingURL=unless.mjs.map