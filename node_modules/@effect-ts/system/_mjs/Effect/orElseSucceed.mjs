// ets_tracing: off
import { succeed } from "./core.mjs";
import { orElse_ } from "./orElse.mjs";
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise succeeds with the specified value.
 *
 * @ets_data_first orElseSucceed_
 */

export function orElseSucceed(a, __trace) {
  return self => orElseSucceed_(self, a, __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise succeeds with the specified value.
 */

export function orElseSucceed_(self, a, __trace) {
  return orElse_(self, () => succeed(a), __trace);
}
//# sourceMappingURL=orElseSucceed.mjs.map