// ets_tracing: off
import { chain_, succeed, yieldNow } from "./core.mjs";
import { zipRight_ } from "./zips.mjs";
/**
 * Repeats this effect the specified number of times.
 *
 * @ets_data_first repeatN_
 */

export function repeatN(n, __trace) {
  return self => repeatN_(self, n, __trace);
}
/**
 * Repeats this effect the specified number of times.
 */

export function repeatN_(self, n, __trace) {
  return chain_(self, a => n <= 0 ? succeed(a) : zipRight_(yieldNow, repeatN_(self, n - 1)), __trace);
}
//# sourceMappingURL=repeatN.mjs.map