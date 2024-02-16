// ets_tracing: off
import { constVoid } from "../Function/index.mjs";
import { fold_ } from "./fold.mjs";
/**
 * Returns a new effect that ignores the success or failure of this effect.
 */

export function ignore(self, __trace) {
  return fold_(self, constVoid, constVoid, __trace);
}
//# sourceMappingURL=ignore.mjs.map