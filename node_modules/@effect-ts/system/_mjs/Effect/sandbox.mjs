import { foldCauseM_, succeed } from "./core.mjs";
import { fail } from "./fail.mjs";
/**
 * Exposes the full cause of failure of this effect.
 */

export function sandbox(fa, __trace) {
  return foldCauseM_(fa, fail, succeed, __trace);
}
//# sourceMappingURL=sandbox.mjs.map