// ets_tracing: off
import { chain_, succeed, yieldNow } from "./core.mjs";
import { zipRight_ } from "./zips.mjs";
/**
 * Repeats this effect until its error satisfies the specified effectful predicate.
 *
 * @ets_data_first repeatUntilM_
 */

export function repeatUntilM(f, __trace) {
  return self => repeatUntilM_(self, f);
}
/**
 * Repeats this effect until its error satisfies the specified effectful predicate.
 */

export function repeatUntilM_(self, f, __trace) {
  return chain_(self, a => chain_(f(a), b => b ? succeed(a) : zipRight_(yieldNow, repeatUntilM_(self, f))), __trace);
}
/**
 * Repeats this effect until its error satisfies the specified predicate.
 *
 * @ets_data_first repeatUntil_
 */

export function repeatUntil(f, __trace) {
  return self => repeatUntil_(self, f, __trace);
}
/**
 * Repeats this effect until its error satisfies the specified predicate.
 */

export function repeatUntil_(self, f, __trace) {
  return repeatUntilM_(self, a => succeed(f(a)), __trace);
}
//# sourceMappingURL=repeatUntil.mjs.map