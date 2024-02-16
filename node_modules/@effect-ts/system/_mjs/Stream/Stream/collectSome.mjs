// ets_tracing: off
import { identity } from "../../Function/index.mjs";
import { collect_ } from "./collect.mjs";
/**
 * Filters any 'None' values.
 */

export function collectSome(self) {
  return collect_(self, identity);
}
//# sourceMappingURL=collectSome.mjs.map