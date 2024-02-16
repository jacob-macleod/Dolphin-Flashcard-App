// ets_tracing: off
import { succeed } from "./core.mjs";
import { foldM_ } from "./foldM.mjs";
/**
 * Returns a new effect where the error channel has been merged into the
 * success channel to their common combined type.
 */

export function merge(self, __trace) {
  return foldM_(self, succeed, succeed, __trace);
}
//# sourceMappingURL=merge.mjs.map