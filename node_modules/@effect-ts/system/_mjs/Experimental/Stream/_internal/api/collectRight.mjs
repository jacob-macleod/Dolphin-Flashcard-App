// ets_tracing: off
import * as E from "../../../../Either/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as Collect from "./collect.mjs";
/**
 * Filters any `Left` values.
 */

export function collectRight(self) {
  return Collect.collect_(self, E.fold(_ => O.none, a => O.some(a)));
}
//# sourceMappingURL=collectRight.mjs.map