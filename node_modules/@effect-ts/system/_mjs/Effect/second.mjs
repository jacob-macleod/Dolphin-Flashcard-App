// ets_tracing: off
import { access } from "./core.mjs";
/**
 * Returns an effectful function that extracts out the second element of a
 * tuple.
 */

export function second(__trace) {
  return access(a => a, __trace);
}
//# sourceMappingURL=second.mjs.map