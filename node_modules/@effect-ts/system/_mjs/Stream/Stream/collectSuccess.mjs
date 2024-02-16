// ets_tracing: off
import * as Ex from "../../Exit/index.mjs";
import * as O from "../../Option/index.mjs";
import { collect_ } from "./collect.mjs";
/**
 * Filters any `Exit.Failure` values.
 */

export function collectSuccess(self) {
  return collect_(self, Ex.fold(_ => O.none, a => O.some(a)));
}
//# sourceMappingURL=collectSuccess.mjs.map