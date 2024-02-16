// ets_tracing: off
import { identity } from "../../Function/index.mjs";
import { refineOrDieWith } from "./refineOrDieWith.mjs";
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 */

export function refineOrDie_(self, pf) {
  return refineOrDieWith(pf)(identity)(self);
}
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 */

export function refineOrDie(pf) {
  return self => refineOrDie_(self, pf);
}
//# sourceMappingURL=refineOrDie.mjs.map