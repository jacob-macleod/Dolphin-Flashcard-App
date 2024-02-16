// ets_tracing: off
import { identity } from "../../../../Function/index.mjs";
import * as RefineOrDieWith from "./refineOrDieWith.mjs";
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 */

export function refineOrDie_(self, pf) {
  return RefineOrDieWith.refineOrDieWith_(self, pf, identity);
}
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 *
 *
 * @ets_data_first refineOrDie_
 */

export function refineOrDie(pf) {
  return self => refineOrDie_(self, pf);
}
//# sourceMappingURL=refineOrDie.mjs.map