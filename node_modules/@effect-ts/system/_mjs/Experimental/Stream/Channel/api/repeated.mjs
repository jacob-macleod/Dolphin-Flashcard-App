// ets_tracing: off
import * as C from "../core.mjs";
/**
 * Repeats this channel forever
 */

export function repeated(self) {
  return C.chain_(self, () => repeated(self));
}
//# sourceMappingURL=repeated.mjs.map