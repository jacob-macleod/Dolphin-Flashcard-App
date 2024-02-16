// ets_tracing: off
import * as E from "../../Either/index.mjs";
import * as O from "../../Option/index.mjs";
import { collect_ } from "./collect.mjs";
/**
 * Filters any `Right` values.
 */

export function collectLeft(self) {
  return collect_(self, E.fold(l => O.some(l), _ => O.none));
}
//# sourceMappingURL=collectLeft.mjs.map