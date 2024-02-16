// ets_tracing: off
import { yieldNow } from "./core.mjs";
import { orElse_ } from "./orElse.mjs";
import { zipRight_ } from "./zips.mjs";
/**
 * Returns an effect that ignores errors and runs repeatedly until it eventually succeeds.
 */

export function eventually(fa, __trace) {
  return orElse_(fa, () => zipRight_(yieldNow, eventually(fa)), __trace);
}
//# sourceMappingURL=eventually.mjs.map