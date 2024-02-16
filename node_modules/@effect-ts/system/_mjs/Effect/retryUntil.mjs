// ets_tracing: off
import { pipe } from "../Function/index.mjs";
import * as catchAll from "./catchAll.mjs";
import * as core from "./core.mjs";
import * as fail from "./fail.mjs";
import { zipRight_ } from "./zips.mjs";
/**
 * Retries this effect until its error satisfies the specified effectful predicate.
 *
 * @ets_data_first retryUtilM_
 */

export function retryUntilM(f, __trace) {
  return self => retryUntilM_(self, f);
}
/**
 * Retries this effect until its error satisfies the specified effectful predicate.
 */

export function retryUntilM_(self, f, __trace) {
  return core.suspend(() => catchAll.catchAll_(self, e => core.chain_(f(e), b => b ? fail.fail(e) : zipRight_(core.yieldNow, retryUntilM_(self, f)))), __trace);
}
/**
 * Retries this effect until its error satisfies the specified predicate.
 *
 * @ets_data_first retryUntil_
 */

export function retryUntil(f, __trace) {
  return self => retryUntil_(self, f, __trace);
}
/**
 * Retries this effect until its error satisfies the specified predicate.
 */

export function retryUntil_(self, f, __trace) {
  return retryUntilM_(self, a => core.succeed(f(a)), __trace);
}
//# sourceMappingURL=retryUntil.mjs.map