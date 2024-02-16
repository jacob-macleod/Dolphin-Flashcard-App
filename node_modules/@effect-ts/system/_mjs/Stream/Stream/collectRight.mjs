// ets_tracing: off
import * as E from "../../Either/index.mjs";
import * as O from "../../Option/index.mjs";
import { collect_ } from "./collect.mjs";
/**
 * Filters any `Right` values.
 */

export function collectRight(self) {
  return collect_(self, E.fold(_ => O.none, r => O.some(r)));
}
//# sourceMappingURL=collectRight.mjs.map