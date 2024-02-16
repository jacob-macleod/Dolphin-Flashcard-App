// ets_tracing: off
import { chain_, unit } from "./core.mjs";
/**
 * Ignores the result of the effect replacing it with a void
 */

export function asUnit(self, __trace) {
  return chain_(self, () => unit, __trace);
}
//# sourceMappingURL=asUnit.mjs.map