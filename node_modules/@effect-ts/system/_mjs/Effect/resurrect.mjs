// ets_tracing: off
import { identity } from "../Function/index.mjs";
import { some } from "../Option/index.mjs";
import { unrefineWith_ } from "./unrefine.mjs";
/**
 * Unearth the unchecked failure of the effect. (opposite of `orDie`)
 */

export function resurrect(self, __trace) {
  return unrefineWith_(self, some, identity, __trace);
}
//# sourceMappingURL=resurrect.mjs.map