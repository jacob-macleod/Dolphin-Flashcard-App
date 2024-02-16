// ets_tracing: off
import { pipe } from "../Function/index.mjs";
import * as catchAll from "./catchAll.mjs";
import * as core from "./core.mjs";
import * as fail from "./fail.mjs";
/**
 * Retries this effect while its error satisfies the specified effectful predicate.
 *
 * @ets_data_first retryWhileM_
 */

export function retryWhileM(f, __trace) {
  return self => retryWhileM_(self, f);
}
/**
 * Retries this effect while its error satisfies the specified effectful predicate.
 */

export function retryWhileM_(self, f, __trace) {
  return core.suspend(() => catchAll.catchAll_(self, e => core.chain_(f(e), b => b ? retryWhileM_(self, f) : fail.fail(e))), __trace);
}
/**
 * Retries this effect while its error satisfies the specified predicate.
 *
 * @ets_data_first retryWhile_
 */

export function retryWhile(f, __trace) {
  return self => retryWhile_(self, f, __trace);
}
/**
 * Retries this effect while its error satisfies the specified predicate.
 */

export function retryWhile_(self, f, __trace) {
  return retryWhileM_(self, a => core.succeed(f(a)), __trace);
}
//# sourceMappingURL=retryWhile.mjs.map