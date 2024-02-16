// ets_tracing: off
import { succeed } from "./core.mjs";
import { fail } from "./fail.mjs";
import { foldM_ } from "./foldM.mjs";
/**
 * Returns an effect that swaps the error/success cases. This allows you to
 * use all methods on the error channel, possibly before flipping back.
 */

export function flip(self, __trace) {
  return foldM_(self, succeed, fail, __trace);
}
//# sourceMappingURL=flip.mjs.map