// ets_tracing: off
import * as E from "../../../../Either/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as Collect from "./collect.mjs";
/**
 * Filters any `Right` values.
 */

export function collectLeft(self) {
  return Collect.collect_(self, E.fold(a => O.some(a), _ => O.none));
}
//# sourceMappingURL=collectLeft.mjs.map