// ets_tracing: off
import { chain_, yieldNow } from "./core.mjs";
import { zipRight_ } from "./zips.mjs";
/**
 * Repeats this effect forever (until the first error).
 */

export function forever(effect, __trace) {
  return chain_(effect, () => zipRight_(yieldNow, forever(effect)), __trace);
}
//# sourceMappingURL=forever.mjs.map